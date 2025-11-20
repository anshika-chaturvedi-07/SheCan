"use client";

import * as React from "react";
import {
  Wand2,
  Palette,
  Download,
  Image as ImageIcon,
  FileImage,
  Sparkles,
  Loader2,
  CheckCircle2,
  Copy,
  Share2,
  AlertCircle,
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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { generateDesign } from "@/app/actions/design-actions";
import { motion } from "framer-motion";

interface DesignTemplate {
  id: string;
  type: string;
  title: string;
  size: string;
  preview: string;
}

interface GeneratedDesign {
  id: string;
  type: string;
  prompt: string;
  imageUrl: string;
  downloadUrl: string;
  aiGenerated?: boolean;
  designElements?: string[];
  colorPalette?: string[];
  typography?: string;
  layout?: string;
}

const designTypes = [
  { value: "product-label", label: "Product Label", icon: "🏷️" },
  { value: "social-post", label: "Social Media Post", icon: "📱" },
  { value: "business-card", label: "Business Card", icon: "💳" },
  { value: "flyer", label: "Promotional Flyer", icon: "📄" },
  { value: "banner", label: "Website Banner", icon: "🖼️" },
  { value: "logo", label: "Logo Design", icon: "✨" },
  { value: "packaging", label: "Product Packaging", icon: "📦" },
  { value: "menu", label: "Menu Card", icon: "📋" },
];

const colorSchemes = [
  {
    value: "vibrant",
    label: "Vibrant & Bold",
    colors: ["#FF6B6B", "#4ECDC4", "#FFE66D"],
  },
  {
    value: "pastel",
    label: "Soft Pastel",
    colors: ["#FFD6E8", "#C3AED6", "#8EC5FC"],
  },
  {
    value: "elegant",
    label: "Elegant & Professional",
    colors: ["#2C3E50", "#ECF0F1", "#E74C3C"],
  },
  {
    value: "earthy",
    label: "Earthy & Natural",
    colors: ["#8B7355", "#D4A574", "#A0826D"],
  },
  {
    value: "modern",
    label: "Modern Minimal",
    colors: ["#000000", "#FFFFFF", "#6366F1"],
  },
];

const templates: DesignTemplate[] = [
  {
    id: "1",
    type: "product-label",
    title: "Organic Honey Label",
    size: "500x300px",
    preview: "🍯",
  },
  {
    id: "2",
    type: "social-post",
    title: "Instagram Sale Post",
    size: "1080x1080px",
    preview: "📱",
  },
  {
    id: "3",
    type: "business-card",
    title: "Modern Business Card",
    size: "900x500px",
    preview: "💳",
  },
  {
    id: "4",
    type: "flyer",
    title: "Workshop Flyer",
    size: "800x1200px",
    preview: "📄",
  },
];

// FALLBACK DESIGNS
const fallbackDesigns: Record<string, GeneratedDesign> = {
  "product-label": {
    id: "fallback-1",
    type: "product-label",
    prompt: "Professional product label design",
    imageUrl:
      "https://placehold.co/800x600/FF6B6B/ffffff?text=Product+Label+Design&font=raleway",
    downloadUrl: "#",
    aiGenerated: false,
  },
  "social-post": {
    id: "fallback-2",
    type: "social-post",
    prompt: "Eye-catching social media post",
    imageUrl:
      "https://placehold.co/1080x1080/4ECDC4/ffffff?text=Social+Media+Post&font=raleway",
    downloadUrl: "#",
    aiGenerated: false,
  },
  "business-card": {
    id: "fallback-3",
    type: "business-card",
    prompt: "Professional business card",
    imageUrl:
      "https://placehold.co/900x500/6366F1/ffffff?text=Business+Card&font=raleway",
    downloadUrl: "#",
    aiGenerated: false,
  },
  flyer: {
    id: "fallback-4",
    type: "flyer",
    prompt: "Promotional flyer design",
    imageUrl:
      "https://placehold.co/800x1200/8B7355/ffffff?text=Promotional+Flyer&font=raleway",
    downloadUrl: "#",
    aiGenerated: false,
  },
  banner: {
    id: "fallback-5",
    type: "banner",
    prompt: "Website banner design",
    imageUrl:
      "https://placehold.co/1200x400/2C3E50/ffffff?text=Website+Banner&font=raleway",
    downloadUrl: "#",
    aiGenerated: false,
  },
  logo: {
    id: "fallback-6",
    type: "logo",
    prompt: "Modern logo design",
    imageUrl:
      "https://placehold.co/800x800/FFD6E8/333333?text=Logo+Design&font=raleway",
    downloadUrl: "#",
    aiGenerated: false,
  },
  packaging: {
    id: "fallback-7",
    type: "packaging",
    prompt: "Product packaging design",
    imageUrl:
      "https://placehold.co/900x900/C3AED6/ffffff?text=Packaging+Design&font=raleway",
    downloadUrl: "#",
    aiGenerated: false,
  },
  menu: {
    id: "fallback-8",
    type: "menu",
    prompt: "Menu card design",
    imageUrl:
      "https://placehold.co/800x1100/D4A574/ffffff?text=Menu+Card&font=raleway",
    downloadUrl: "#",
    aiGenerated: false,
  },
};

export default function DesignGeneratorPage() {
  const [step, setStep] = React.useState<"input" | "generating" | "result">(
    "input"
  );
  const [designType, setDesignType] = React.useState("");
  const [colorScheme, setColorScheme] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [generatedDesign, setGeneratedDesign] =
    React.useState<GeneratedDesign | null>(null);
  const [usedFallback, setUsedFallback] = React.useState(false);

  const handleGenerate = async () => {
    setStep("generating");
    setProgress(0);
    setUsedFallback(false);

    try {
      // Animate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Call AI generation
      const result = await generateDesign({
        designType,
        businessName,
        colorScheme,
        description,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (result.success && result.design) {
        setGeneratedDesign(result.design as GeneratedDesign);
        toast.success("AI generated your design! 🎨");
        setTimeout(() => setStep("result"), 500);
      } else {
        throw new Error(result.error || "Failed to generate design");
      }
    } catch (error) {
      console.error("Design generation error:", error);

      // FALLBACK: Use placeholder design
      setUsedFallback(true);
      setProgress(100);

      const fallback =
        fallbackDesigns[designType] || fallbackDesigns["product-label"];
      setGeneratedDesign({
        ...fallback,
        prompt: description,
        id: `fallback-${Date.now()}`,
      });

      toast.warning(
        "AI temporarily unavailable. Showing sample design template.",
        {
          duration: 5000,
        }
      );

      setTimeout(() => setStep("result"), 500);
    }
  };

  const handleReset = () => {
    setStep("input");
    setDesignType("");
    setColorScheme("");
    setBusinessName("");
    setDescription("");
    setProgress(0);
    setGeneratedDesign(null);
    setUsedFallback(false);
  };

  const handleDownload = () => {
    if (generatedDesign?.imageUrl) {
      // Open image in new tab for download
      window.open(generatedDesign.imageUrl, "_blank");
      toast.success("Opening design for download...");
    }
  };

  const handleShare = () => {
    const text = `Check out my new ${
      designTypes.find((d) => d.value === designType)?.label
    } for ${businessName}!\n\nCreated with SheCan AI Design Generator 🎨`;
    if (navigator.share) {
      navigator.share({ title: businessName, text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Design details copied to clipboard!");
    }
  };

  if (step === "generating") {
    return (
      <div className="min-h-[600px] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5 -z-10" />
        <Card className="max-w-md w-full border-2 bg-background/95 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 -z-10" />
          <CardContent className="p-8 relative z-10">
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/50">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-bold">
                  Creating Your Design...
                </h3>
                <p className="text-base text-muted-foreground">
                  AI is crafting a beautiful design for you 🎨
                </p>
              </div>
              <div className="space-y-3">
                <Progress value={progress} className="h-3" />
                <p className="text-sm font-medium text-violet-600">
                  {progress < 30 && "🎨 Analyzing your requirements..."}
                  {progress >= 30 &&
                    progress < 60 &&
                    "✨ Generating design elements..."}
                  {progress >= 60 &&
                    progress < 90 &&
                    "🌈 Applying colors & styling..."}
                  {progress >= 90 && "🎉 Finalizing your design..."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "result" && generatedDesign) {
    return (
      <div className="space-y-6">
        {/* Fallback Notice */}
        {usedFallback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-2 border-yellow-500/50 bg-yellow-50/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-yellow-900">
                      AI Temporarily Unavailable
                    </p>
                    <p className="text-xs text-yellow-800">
                      We&apos;re showing a sample template. Try again in a few
                      minutes for AI-generated designs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-1">
              Your Design is Ready! 🎨
            </h1>
            <p className="text-muted-foreground">
              {usedFallback
                ? "Sample template based on your requirements"
                : "Download or customize your AI-generated design"}
            </p>
          </div>
          <Button onClick={handleReset} variant="neutral">
            Create Another Design
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Design Preview</CardTitle>
                    <CardDescription className="mt-1">
                      {designTypes.find((d) => d.value === designType)?.label}
                    </CardDescription>
                  </div>
                  <Badge
                    className={usedFallback ? "bg-yellow-600" : "bg-green-600"}
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {usedFallback ? "Template" : "AI Generated"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg border-2 border-violet-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={generatedDesign.imageUrl}
                    alt="Generated Design"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="grid gap-3 md:grid-cols-3 mt-4">
              <Button className="gap-2" size="lg" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
              <Button
                variant="neutral"
                className="gap-2"
                size="lg"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="neutral" className="gap-2" size="lg">
                <Wand2 className="h-4 w-4" />
                Customize
              </Button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Design Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Type</Label>
                  <p className="font-medium">
                    {designTypes.find((d) => d.value === designType)?.label}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Business Name
                  </Label>
                  <p className="font-medium">{businessName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Color Scheme
                  </Label>
                  <div className="flex gap-1 mt-1">
                    {colorSchemes
                      .find((c) => c.value === colorScheme)
                      ?.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-md border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Description
                  </Label>
                  <p className="text-sm">{description}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-violet-50 to-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Download in multiple formats",
                  "Use for social media posts",
                  "Print for physical products",
                  "Share with your team",
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-violet-100 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-sm">{step}</span>
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
          AI Design Generator 🎨
        </h1>
        <p className="text-muted-foreground">
          Create professional designs for your business in seconds
        </p>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="templates">Browse Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-violet-600" />
                    Design Details
                  </CardTitle>
                  <CardDescription>
                    Tell us what you need and AI will create it for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Design Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">What do you want to create?</Label>
                    <Select value={designType} onValueChange={setDesignType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select design type" />
                      </SelectTrigger>
                      <SelectContent>
                        {designTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Business Name */}
                  <div className="space-y-2">
                    <Label htmlFor="business">Business Name</Label>
                    <Input
                      id="business"
                      placeholder="e.g., Priya's Homemade Pickles"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>

                  {/* Color Scheme */}
                  <div className="space-y-2">
                    <Label htmlFor="colors">Color Theme</Label>
                    <Select value={colorScheme} onValueChange={setColorScheme}>
                      <SelectTrigger id="colors">
                        <SelectValue placeholder="Select color scheme" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorSchemes.map((scheme) => (
                          <SelectItem key={scheme.value} value={scheme.value}>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {scheme.colors.slice(0, 3).map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="w-4 h-4 rounded-sm border"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              {scheme.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Design Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you want... e.g., 'A warm, homely design for organic pickles with traditional Indian elements'"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full gap-2"
                    size="lg"
                    onClick={handleGenerate}
                    disabled={
                      !designType ||
                      !businessName ||
                      !colorScheme ||
                      !description
                    }
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate Design with AI
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Panel */}
            <div className="space-y-4">
              <Card className="border-2 bg-gradient-to-br from-violet-50 to-purple-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    What You&apos;ll Get
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: Palette, text: "Professional designs in seconds" },
                    {
                      icon: Download,
                      text: "Multiple format downloads (PNG, JPG, PDF)",
                    },
                    { icon: Sparkles, text: "AI-powered customization" },
                    { icon: FileImage, text: "Print & web ready" },
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
                  <CardTitle className="text-base">
                    Popular Design Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {designTypes.slice(0, 6).map((type) => (
                      <Button
                        key={type.value}
                        variant="neutral"
                        className="h-auto py-3 flex-col gap-1"
                        onClick={() => setDesignType(type.value)}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <span className="text-xs">
                          {type.label.split(" ")[0]}
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Ready-to-Use Templates</CardTitle>
              <CardDescription>
                Start with a template and customize it to your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="border hover:border-violet-300 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg border-2 border-violet-200 flex items-center justify-center mb-3">
                        <span className="text-6xl">{template.preview}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">
                        {template.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <Badge variant="neutral" className="text-xs">
                          {template.size}
                        </Badge>
                        <Button size="sm" variant="neutral">
                          Use
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
