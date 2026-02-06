import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

// Lazy-initialize to avoid build errors when env vars are not available
function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-06-30.basil" });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
    const body = await request.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    if (!sig) {
      console.error("No Stripe signature found");
      return NextResponse.json(
        { error: "No Stripe signature found" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(`Webhook signature verification failed: ${error.message}`);
      return NextResponse.json(
        { error: `Webhook error: ${error.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        // Get the order ID from metadata
        const orderId = session.metadata?.orderId;

        if (orderId) {
          try {
            console.log(`Webhook: Updating order ${orderId} to paid status`);
            // Update the order status to "paid" in your backend
            const response = await fetch(
              `${
                process.env.NEXT_PUBLIC_API_ENDPOINT ||
                "http://localhost:8000/api"
              }/orders/${orderId}/webhook-status`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  status: "paid",
                  paymentIntentId: session.payment_intent,
                  stripeSessionId: session.id,
                }),
              }
            );

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(
                `Failed to update order status: ${response.status} ${response.statusText} - ${errorText}`
              );
            }

            const result = await response.json();
            console.log(
              `Webhook: Order ${orderId} marked as paid successfully:`,
              result
            );
          } catch (error) {
            console.error(`Webhook: Error updating order ${orderId}:`, error);
            // Don't return an error to Stripe, as the payment was successful
            // We can handle this in a different way (retry mechanism, admin notification, etc.)
          }
        } else {
          console.error("Webhook: No orderId found in Stripe session metadata");
        }
        break;

      case "payment_intent.succeeded":
        // Handle successful payment if needed
        console.log("Payment succeeded:", event.data.object.id);
        break;

      case "payment_intent.payment_failed":
        // Handle failed payment if needed
        console.log("Payment failed:", event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
