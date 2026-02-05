"use client";

import React from "react";
import Container from "@/components/common/Container";
import { Handshake, Users, TrendingUp, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProgramsPage = () => {
  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Handshake className="h-16 w-16 text-babyshopSky" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Partnership Programs</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our partnership programs and grow your business with us. Choose
          the program that best fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="border-2 hover:border-babyshopSky transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-babyshopSky" />
              <CardTitle className="text-2xl">Affiliate Program</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Earn commissions by promoting our products. Perfect for bloggers,
              influencers, and content creators.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Up to 20% commission on sales</span>
              </li>
              <li className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Marketing materials provided</span>
              </li>
              <li className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Real-time tracking dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Monthly payout system</span>
              </li>
            </ul>
            <Button className="w-full mt-4">Join Affiliate Program</Button>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-babyshopSky transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-babyshopPurple" />
              <CardTitle className="text-2xl">Wholesale Program</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Buy in bulk at discounted prices. Ideal for retailers, daycare
              centers, and businesses.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Volume discounts up to 40%</span>
              </li>
              <li className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Flexible payment terms</span>
              </li>
              <li className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span>Priority customer support</span>
              </li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              Apply for Wholesale
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Program Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Easy Application</h3>
              <p className="text-sm text-muted-foreground">
                Simple online application process with quick approval.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support & Resources</h3>
              <p className="text-sm text-muted-foreground">
                Access to marketing materials, product catalogs, and training.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-sm text-muted-foreground">
                Scale your business with our proven partnership model.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Card className="bg-babyshopSky/10 border-babyshopSky">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Ready to Partner?</h2>
            <p className="text-muted-foreground mb-6">
              Contact our partnership team to learn more about our programs and
              how we can work together.
            </p>
            <Button asChild>
              <a href="mailto:partnerships@babyshop.com">
                Contact Partnership Team
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default ProgramsPage;
