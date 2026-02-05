"use client";

import React from "react";
import Container from "@/components/common/Container";
import { MoreHorizontal, Package, Users, Settings, HeadphonesIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OthersPage = () => {
  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <MoreHorizontal className="h-16 w-16 text-babyshopSky" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Additional Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our extended services and features designed to enhance your
          shopping experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-babyshopSky" />
              <CardTitle>Bulk Orders</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Need to order in large quantities? Contact us for special pricing
              and bulk order arrangements.
            </p>
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-babyshopPurple" />
              <CardTitle>Business Accounts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Special accounts for businesses, daycare centers, and organizations
              with exclusive benefits and pricing.
            </p>
            <Button variant="outline" size="sm">
              Apply Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-green-600" />
              <CardTitle>Custom Solutions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Tailored solutions for your specific needs. Let us help you find
              the perfect products and services.
            </p>
            <Button variant="outline" size="sm">
              Contact Us
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <HeadphonesIcon className="h-8 w-8 text-blue-600" />
              <CardTitle>Priority Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get priority customer support with faster response times and
              dedicated assistance for your account.
            </p>
            <Button variant="outline" size="sm">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-babyshopSky/10 border-babyshopSky">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Need Something Specific?
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Our team is here to help you find exactly what you need. Contact us
            for personalized assistance.
          </p>
          <div className="text-center">
            <Button asChild>
              <a href="mailto:services@babyshop.com">Contact Our Team</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OthersPage;
