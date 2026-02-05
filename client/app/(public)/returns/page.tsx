"use client";

import React from "react";
import Container from "@/components/common/Container";
import { PackageOpen, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ReturnsExchangePage = () => {
  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <PackageOpen className="h-16 w-16 text-babyshopSky" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Returns & Exchange</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We want you to be completely satisfied with your purchase. Learn
          about our return and exchange policy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle>Return Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">30-Day Return Window</h3>
              <p className="text-sm text-muted-foreground">
                You have 30 days from the date of delivery to return items in
                their original condition.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Eligible Items</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Unused and unopened products</li>
                <li>Items in original packaging</li>
                <li>Products with all tags attached</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-blue-600" />
              <CardTitle>Exchange Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Easy Exchanges</h3>
              <p className="text-sm text-muted-foreground">
                Exchange items within 30 days for a different size, color, or
                product of equal or greater value.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Exchange Process</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Contact our support team</li>
                <li>Receive return authorization</li>
                <li>Ship item back to us</li>
                <li>Receive your exchange</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
            <CardTitle>Important Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Non-Returnable Items</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Personalized or customized items</li>
              <li>Items damaged by misuse</li>
              <li>Products without original packaging</li>
              <li>Items purchased more than 30 days ago</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Refund Processing</h3>
            <p className="text-sm text-muted-foreground">
              Refunds will be processed to your original payment method within
              5-10 business days after we receive and inspect the returned item.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Card className="bg-babyshopSky/10 border-babyshopSky">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Our customer service team is here to assist you with returns and
              exchanges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/user/orders">View My Orders</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:support@babyshop.com">Contact Support</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default ReturnsExchangePage;
