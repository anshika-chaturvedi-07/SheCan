"use client";

import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full border-2">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center">
            <FileQuestion className="w-8 h-8 text-violet-600" />
          </div>
          <CardTitle className="text-2xl font-heading">
            Page Not Found
          </CardTitle>
          <CardDescription className="text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-6 text-center border-2">
            <p className="text-6xl font-bold text-violet-600">404</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 gap-2" size="lg">
              <Link href="/">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            <Button
              variant="neutral"
              className="flex-1 gap-2 border-2"
              size="lg"
              onClick={handleGoBack}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Need help? Visit our help center or contact support
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
