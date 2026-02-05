"use client";

import React from "react";
import Container from "@/components/common/Container";
import { MessageSquareQuote, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "Amazing quality products! My baby loves everything we've purchased. Fast shipping and excellent customer service.",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    text: "The best baby shop online! Great prices and the products are exactly as described. Highly recommend!",
    location: "California, USA",
  },
  {
    id: 3,
    name: "Emma Williams",
    rating: 5,
    text: "I've been shopping here for months now. The quality is outstanding and the customer support team is always helpful.",
    location: "Texas, USA",
  },
  {
    id: 4,
    name: "David Brown",
    rating: 5,
    text: "Fast delivery and premium quality products. My go-to shop for all baby essentials. Thank you!",
    location: "Florida, USA",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    rating: 5,
    text: "Excellent shopping experience! The website is easy to navigate and the products are top-notch quality.",
    location: "Illinois, USA",
  },
  {
    id: 6,
    name: "James Taylor",
    rating: 5,
    text: "Outstanding service and products. My baby is happy, and so am I! Will definitely shop here again.",
    location: "Washington, USA",
  },
];

const TestimonialsPage = () => {
  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <MessageSquareQuote className="h-16 w-16 text-babyshopSky" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Customer Testimonials</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Read what our satisfied customers have to say about their shopping
          experience with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {testimonial.location}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-babyshopSky/10 border-babyshopSky">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">
              Share Your Experience
            </h2>
            <p className="text-muted-foreground mb-6">
              We'd love to hear about your shopping experience with us!
            </p>
            <p className="text-sm text-muted-foreground">
              Contact us at{" "}
              <a
                href="mailto:feedback@babyshop.com"
                className="text-babyshopSky hover:underline"
              >
                feedback@babyshop.com
              </a>{" "}
              to share your testimonial.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default TestimonialsPage;
