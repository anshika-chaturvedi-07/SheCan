"use client";

import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  AlertCircle,
  Sparkles,
  Calculator,
  Package,
  ShoppingCart,
  Users,
  Zap,
  CheckCircle2,
  Info,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";

interface PricingData {
  productName: string;
  category: string;
  costPrice: number;
  location: string;
  targetMarket: string;
  quantity: number;
}

interface PricingResult {
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  profitMargin: number;
  competitorAvg: number;
  demandLevel: "high" | "medium" | "low";
  priceRange: string;
  insights: string[];
}

const categories = [
  "Food & Beverages",
  "Handicrafts",
  "Beauty & Cosmetics",
  "Textiles & Clothing",
  "Home Decor",
  "Jewelry & Accessories",
  "Organic Products",
  "Baked Goods",
];

const targetMarkets = [
  "Local Community",
  "Online Marketplace",
  "Wholesale Buyers",
  "Corporate Clients",
  "Retail Stores",
  "Direct Customers",
];

const sampleResult: PricingResult = {
  suggestedPrice: 450,
  minPrice: 380,
  maxPrice: 520,
  profitMargin: 35,
  competitorAvg: 425,
  demandLevel: "high",
  priceRange: "₹380 - ₹520",
  insights: [
    "Your product is competitively priced for the local market",
    "High demand detected - consider premium pricing",
    "Competitor average is ₹425, you can price higher",
    "Seasonal demand peaks in next 2 months",
    "Bulk discounts recommended for wholesale",
  ],
};

export default function PricingPredictorPage() {
  const [step, setStep] = React.useState<"input" | "result">("input");
  const [pricingData, setPricingData] = React.useState<PricingData>({
    productName: "",
    category: "",
    costPrice: 0,
    location: "",
    targetMarket: "",
    quantity: 1,
  });
  const [result, setResult] = React.useState<PricingResult | null>(null);
  const [profitMargin, setProfitMargin] = React.useState([35]);

  const handleCalculate = () => {
    // Simulate calculation
    setResult(sampleResult);
    setStep("result");
  };

  const handleReset = () => {
    setStep("input");
    setPricingData({
      productName: "",
      category: "",
      costPrice: 0,
      location: "",
      targetMarket: "",
      quantity: 1,
    });
    setResult(null);
  };

  const calculatePrice = (margin: number) => {
    if (pricingData.costPrice > 0) {
      return Math.round(pricingData.costPrice * (1 + margin / 100));
    }
    return 0;
  };

  if (step === "result" && result) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-1">
              Pricing Analysis Complete 💰
            </h1>
            <p className="text-muted-foreground">
              AI-powered pricing recommendation for {pricingData.productName}
            </p>
          </div>
          <Button onClick={handleReset} variant="neutral">
            Calculate Again
          </Button>
        </div>

        {/* Main Results */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-2 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-green-100 p-2.5 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <Badge className="bg-green-600">Recommended</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Suggested Price</p>
                <p className="text-3xl font-bold text-green-700">
                  ₹{result.suggestedPrice}
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.profitMargin}% profit margin
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-blue-100 p-2.5 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <Badge variant="neutral">Market Avg</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Competitor Average
                </p>
                <p className="text-3xl font-bold">₹{result.competitorAvg}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  You&apos;re{" "}
                  {result.suggestedPrice - result.competitorAvg > 0
                    ? "above"
                    : "below"}{" "}
                  market
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-orange-100 p-2.5 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <Badge
                  className={
                    result.demandLevel === "high"
                      ? "bg-green-600"
                      : result.demandLevel === "medium"
                      ? "bg-orange-600"
                      : "bg-red-600"
                  }
                >
                  {result.demandLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Demand Level</p>
                <p className="text-3xl font-bold capitalize">
                  {result.demandLevel}
                </p>
                <p className="text-xs text-muted-foreground">
                  Market demand score
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left - Price Range & Insights */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Range */}
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Recommended Price Range
                </CardTitle>
                <CardDescription>
                  Based on market analysis and demand forecasting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative pt-8 pb-4">
                  <div className="flex justify-between mb-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">
                        Minimum
                      </p>
                      <Badge variant="neutral" className="text-sm">
                        ₹{result.minPrice}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">
                        Optimal
                      </p>
                      <Badge className="bg-violet-600 text-sm">
                        ₹{result.suggestedPrice}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">
                        Maximum
                      </p>
                      <Badge variant="neutral" className="text-sm">
                        ₹{result.maxPrice}
                      </Badge>
                    </div>
                  </div>
                  <div className="relative h-2 bg-gradient-to-r from-red-200 via-green-200 to-orange-200 rounded-full">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-violet-600 rounded-full border-2 border-white shadow-lg"
                      style={{
                        left: `${
                          ((result.suggestedPrice - result.minPrice) /
                            (result.maxPrice - result.minPrice)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Pricing Strategy</AlertTitle>
                  <AlertDescription>
                    Start at ₹{result.suggestedPrice} and adjust based on
                    customer response. Premium pricing justified due to high
                    demand.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-violet-600" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profit Breakdown */}
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Profit Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      label: "Cost Price",
                      value: pricingData.costPrice,
                      color: "text-red-600",
                    },
                    {
                      label: "Profit Margin",
                      value: result.suggestedPrice - pricingData.costPrice,
                      color: "text-green-600",
                    },
                    {
                      label: "Selling Price",
                      value: result.suggestedPrice,
                      color: "text-violet-600",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className={`text-lg font-bold ${item.color}`}>
                        ₹{item.value}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Profit Percentage</span>
                      <Badge className="bg-green-600 text-base px-3 py-1">
                        {result.profitMargin}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Quick Stats */}
          <div className="space-y-4">
            <Card className="border-2 bg-gradient-to-br from-violet-50 to-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Product
                  </Label>
                  <p className="font-medium">{pricingData.productName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Category
                  </Label>
                  <p className="font-medium">{pricingData.category}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Target Market
                  </Label>
                  <p className="font-medium">{pricingData.targetMarket}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Location
                  </Label>
                  <p className="font-medium">{pricingData.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Volume Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { qty: "1-10 units", price: result.suggestedPrice },
                  {
                    qty: "11-50 units",
                    price: Math.round(result.suggestedPrice * 0.9),
                  },
                  {
                    qty: "51+ units",
                    price: Math.round(result.suggestedPrice * 0.85),
                  },
                ].map((tier, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <span className="text-sm font-medium">{tier.qty}</span>
                    <Badge variant="neutral">₹{tier.price}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Test pricing with small batch",
                  "Monitor competitor prices",
                  "Collect customer feedback",
                  "Adjust based on demand",
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div className="bg-violet-100 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-1">
          Smart Pricing Calculator 💰
        </h1>
        <p className="text-muted-foreground">
          Get AI-powered pricing recommendations for your products
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-violet-600" />
                Product Information
              </CardTitle>
              <CardDescription>
                Enter your product details to get optimal pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="product">Product Name</Label>
                <Input
                  id="product"
                  placeholder="e.g., Handmade Cotton Saree"
                  value={pricingData.productName}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      productName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Category & Location */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={pricingData.category}
                    onValueChange={(value) =>
                      setPricingData({ ...pricingData, category: value })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai"
                    value={pricingData.location}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Cost Price & Quantity */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cost">Your Cost Price (₹)</Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="300"
                    value={pricingData.costPrice || ""}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        costPrice: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="100"
                    value={pricingData.quantity}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* Target Market */}
              <div className="space-y-2">
                <Label htmlFor="market">Target Market</Label>
                <Select
                  value={pricingData.targetMarket}
                  onValueChange={(value) =>
                    setPricingData({ ...pricingData, targetMarket: value })
                  }
                >
                  <SelectTrigger id="market">
                    <SelectValue placeholder="Who are you selling to?" />
                  </SelectTrigger>
                  <SelectContent>
                    {targetMarkets.map((market) => (
                      <SelectItem key={market} value={market}>
                        {market}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Desired Profit Margin */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Desired Profit Margin</Label>
                  <Badge variant="neutral" className="text-sm">
                    {profitMargin[0]}%
                  </Badge>
                </div>
                <Slider
                  value={profitMargin}
                  onValueChange={setProfitMargin}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low (0%)</span>
                  <span>Medium (50%)</span>
                  <span>High (100%)</span>
                </div>
                {pricingData.costPrice > 0 && (
                  <Alert>
                    <DollarSign className="h-4 w-4" />
                    <AlertDescription>
                      With {profitMargin[0]}% margin, your selling price would
                      be <strong>₹{calculatePrice(profitMargin[0])}</strong>
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleCalculate}
                disabled={
                  !pricingData.productName ||
                  !pricingData.category ||
                  !pricingData.location ||
                  !pricingData.targetMarket ||
                  pricingData.costPrice <= 0
                }
              >
                <Sparkles className="h-4 w-4" />
                Calculate Optimal Price
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <Card className="border-2 bg-gradient-to-br from-violet-50 to-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: BarChart3, text: "Analyzes market trends" },
                { icon: Users, text: "Studies competitor pricing" },
                { icon: TrendingUp, text: "Predicts demand patterns" },
                { icon: Zap, text: "Suggests optimal price" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-violet-100 p-2 rounded-lg">
                      <Icon className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Pricing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>✓ Consider your production costs carefully</p>
              <p>✓ Research competitor prices in your area</p>
              <p>✓ Factor in seasonal demand variations</p>
              <p>✓ Start slightly higher, adjust based on sales</p>
              <p>✓ Offer volume discounts for bulk orders</p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-sm text-orange-900">Pro Tip</p>
                  <p className="text-xs text-orange-700">
                    Price 10-15% higher for premium markets and 5-10% lower for
                    price-sensitive customers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
