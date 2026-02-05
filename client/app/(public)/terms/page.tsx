"use client";

import React from "react";
import Container from "@/components/common/Container";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsConditionsPage = () => {
  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <FileText className="h-16 w-16 text-babyshopSky" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Please read these terms carefully before using our website and
          services.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to these terms, please do not use our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use of Website</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              You agree to use our website only for lawful purposes and in a way
              that does not infringe the rights of others or restrict their use
              of the website.
            </p>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <span>
                You may not use our website to transmit any harmful or malicious
                code
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <span>
                You may not attempt to gain unauthorized access to our systems
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <span>
                You may not use automated systems to scrape or collect data
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              We strive to provide accurate product descriptions and images.
              However, we do not warrant that product descriptions or other
              content on this site is accurate, complete, or error-free.
            </p>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
              <span>
                Product colors may vary slightly due to monitor display
                settings
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing and Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  All prices are displayed in USD and are subject to change
                  without notice
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  We accept major credit cards and PayPal for payment
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  Payment is processed securely through our payment gateway
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping and Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              We ship to addresses within the United States. Delivery times vary
              based on your location and the shipping method selected.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Standard shipping: 5-7 business days</li>
              <li>• Express shipping: 2-3 business days</li>
              <li>• Free shipping on orders over $100</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Returns and Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please refer to our Returns & Exchange page for detailed
              information about our return policy. Items must be returned within
              30 days of delivery in their original condition.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All content on this website, including text, graphics, logos, and
              images, is the property of BabyShop and is protected by copyright
              and trademark laws. You may not reproduce or distribute any
              content without our written permission.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              BabyShop shall not be liable for any indirect, incidental, special,
              or consequential damages arising out of or in connection with the
              use of our website or products.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you have any questions about these Terms and Conditions, please
              contact us at:{" "}
              <a
                href="mailto:legal@babyshop.com"
                className="text-babyshopSky hover:underline"
              >
                legal@babyshop.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default TermsConditionsPage;
