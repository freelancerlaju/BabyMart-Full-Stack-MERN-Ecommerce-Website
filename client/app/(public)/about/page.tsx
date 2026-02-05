"use client";

import React from "react";
import Container from "@/components/common/Container";
import { Info, Heart, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Info className="h-16 w-16 text-babyshopSky" />
        </div>
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your trusted partner for all baby essentials. We're committed to
          providing quality products and exceptional service.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              BabyShop was founded with a simple mission: to provide parents
              with high-quality, safe, and affordable baby products. What started
              as a small family business has grown into a trusted online
              destination for families across the country.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We understand that choosing the right products for your baby is
              one of the most important decisions you'll make. That's why we
              carefully curate every item in our collection, ensuring it meets
              our strict standards for quality, safety, and value.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-500" />
                <CardTitle>Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                To support families by providing safe, high-quality baby
                products at affordable prices, making parenting easier and more
                enjoyable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-yellow-500" />
                <CardTitle>Quality Promise</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every product in our store undergoes rigorous quality checks to
                ensure it meets the highest safety and quality standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-500" />
                <CardTitle>Customer First</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your satisfaction is our priority. We're here to help you find
                the perfect products for your little ones.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose Us?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Wide Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Thousands of products from trusted brands, all in one place.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Competitive Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Best prices guaranteed with regular sales and discounts.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Fast Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and reliable delivery to get your orders to you fast.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our team is here to help with any questions or concerns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Card className="bg-babyshopSky/10 border-babyshopSky">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@babyshop.com"
                className="text-babyshopSky hover:underline"
              >
                info@babyshop.com
              </a>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a
                href="tel:+1234567890"
                className="text-babyshopSky hover:underline"
              >
                (123) 456-7890
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default AboutPage;
