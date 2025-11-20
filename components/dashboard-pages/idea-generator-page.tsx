"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  MapPin,
  Clock,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowRight,
  Loader2,
  CheckCircle2,
  BarChart3,
  Heart,
  Share2,
  GitCompare,
  Filter,
  Download,
  Zap,
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { generateBusinessIdeas } from "@/app/actions/generate-actions";

interface FormData {
  skill: string;
  location: string;
  timeAvailability: string;
  investment: string;
  experience: string;
}

interface IdeaResult {
  id: string;
  title: string;
  description: string;
  monthlyIncome: string;
  investment: string;
  demand: string;
  competition: string;
  steps: string[];
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  timeToProfit: string;
}

const skills = [
  "Cooking & Baking",
  "Tailoring & Stitching",
  "Handicrafts",
  "Beauty & Salon",
  "Teaching & Tutoring",
  "Digital Marketing",
  "Content Writing",
  "Graphic Design",
  "Photography",
  "Event Planning",
  "Jewelry Making",
  "Home Decor",
  "Organic Farming",
  "Food Delivery",
  "Online Reselling",
];

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Indore",
  "Bhopal",
  "Patna",
  "Nagpur",
  "Surat",
];

const sampleIdeas: IdeaResult[] = [
  {
    id: "1",
    title: "Home-Based Bakery & Cake Delivery",
    description:
      "Start a specialized cake and dessert business focusing on custom orders for birthdays, weddings, and corporate events.",
    monthlyIncome: "₹25,000 - ₹45,000",
    investment: "₹15,000 - ₹30,000",
    demand: "High (92% demand score)",
    competition: "Medium",
    tags: ["Food", "Home-Based", "Creative"],
    difficulty: "Easy",
    timeToProfit: "2-3 months",
    steps: [
      "Get food license (FSSAI registration)",
      "Set up home kitchen with basic equipment",
      "Create Instagram & WhatsApp Business account",
      "Design sample menu with pricing",
      "Partner with local delivery services",
      "Start taking orders from friends & family",
    ],
  },
  {
    id: "2",
    title: "Boutique Tailoring & Custom Clothing",
    description:
      "Offer personalized stitching and alteration services with focus on ethnic wear and party outfits.",
    monthlyIncome: "₹20,000 - ₹40,000",
    investment: "₹10,000 - ₹25,000",
    demand: "High (88% demand score)",
    competition: "Low",
    tags: ["Fashion", "Home-Based", "Skill-Based"],
    difficulty: "Medium",
    timeToProfit: "1-2 months",
    steps: [
      "Purchase good quality sewing machine",
      "Create portfolio of designs",
      "Join local women's groups for clients",
      "Offer home pickup & delivery service",
      "Register on local business directories",
      "Build WhatsApp catalog",
    ],
  },
  {
    id: "3",
    title: "Handmade Jewelry E-Commerce",
    description:
      "Create and sell unique handmade jewelry pieces through online platforms and social media.",
    monthlyIncome: "₹18,000 - ₹35,000",
    investment: "₹8,000 - ₹20,000",
    demand: "Very High (95% demand score)",
    competition: "Medium",
    tags: ["E-Commerce", "Creative", "Online"],
    difficulty: "Easy",
    timeToProfit: "3-4 months",
    steps: [
      "Learn basic jewelry making techniques",
      "Source raw materials in bulk",
      "Create product catalog with photos",
      "List on Meesho, Amazon Saheli, Etsy",
      "Run Instagram ads targeting young women",
      "Offer customization services",
    ],
  },
];

export default function IdeaGeneratorPage() {
  const [step, setStep] = React.useState<"form" | "loading" | "results">(
    "form"
  );
  const [formData, setFormData] = React.useState<FormData>({
    skill: "",
    location: "",
    timeAvailability: "",
    investment: "",
    experience: "",
  });
  const [ideas, setIdeas] = React.useState<IdeaResult[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [compareMode, setCompareMode] = React.useState(false);
  const [selectedForCompare, setSelectedForCompare] = React.useState<string[]>([]);
  const [filterDifficulty, setFilterDifficulty] = React.useState<string>("all");

  // Update the handleGenerate function
const handleGenerate = async () => {
  setStep("loading");
  setProgress(0);

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

    // Call the server action
    const result = await generateBusinessIdeas(formData);

    // Clear progress interval
    clearInterval(progressInterval);
    setProgress(100);

    if (result.success && result.ideas) {
      setIdeas(result.ideas);
      setTimeout(() => setStep("results"), 500);
    } else {
      throw new Error(result.error || "Failed to generate ideas");
    }
  } catch (error) {
    console.error("Generation error:", error);
    setStep("form");
    setProgress(0);
    
    // Show error message
    alert(
      error instanceof Error
        ? error.message
        : "Failed to generate ideas. Please try again."
    );
  }
};

  const handleReset = () => {
    setStep("form");
    setFormData({
      skill: "",
      location: "",
      timeAvailability: "",
      investment: "",
      experience: "",
    });
    setIdeas([]);
    setProgress(0);
    setFavorites([]);
    setCompareMode(false);
    setSelectedForCompare([]);
    setFilterDifficulty("all");
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) return prev.filter(item => item !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const shareIdea = (idea: IdeaResult) => {
    const text = `Check out this business idea: ${idea.title}\n\nExpected Income: ${idea.monthlyIncome}\nInvestment: ${idea.investment}\n\nGenerated by SheCan AI`;
    if (navigator.share) {
      navigator.share({ title: idea.title, text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Idea copied to clipboard!");
    }
  };

  const filteredIdeas = filterDifficulty === "all" 
    ? ideas 
    : ideas.filter(idea => idea.difficulty === filterDifficulty);

  if (step === "loading") {
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
                  Analyzing Your Profile...
                </h3>
                <p className="text-base text-muted-foreground">
                  AI is generating personalized business ideas ✨
                </p>
              </div>
              <div className="space-y-3">
                <Progress value={progress} className="h-3" />
                <p className="text-sm font-medium text-violet-600">
                  {progress < 30 && "🔍 Analyzing market trends..."}
                  {progress >= 30 &&
                    progress < 60 &&
                    "📊 Checking local demand..."}
                  {progress >= 60 &&
                    progress < 90 &&
                    "💰 Calculating profit margins..."}
                  {progress >= 90 && "✨ Finalizing recommendations..."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "results") {
    return (
      <div className="space-y-6 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border-2 border-violet-500/20 backdrop-blur-sm">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-1 flex items-center gap-2">
              <Target className="w-8 h-8 text-violet-600" />
              Your Business Ideas
            </h1>
            <p className="text-muted-foreground">
              AI-generated recommendations based on your profile
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setCompareMode(!compareMode)} variant="neutral" className="gap-2">
              <GitCompare className="h-4 w-4" />
              {compareMode ? "Exit Compare" : "Compare Ideas"}
            </Button>
            <Button onClick={handleReset} variant="neutral" className="gap-2">
              <Sparkles className="h-4 w-4" />
              New Ideas
            </Button>
          </div>
        </div>

        {/* Profile Summary & Filters */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-600" />
                Your Profile
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="neutral" className="gap-1">
                  <Lightbulb className="h-3 w-3" />
                  {formData.skill}
                </Badge>
                <Badge variant="neutral" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {formData.location}
                </Badge>
                <Badge variant="neutral" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {formData.timeAvailability}
                </Badge>
                <Badge variant="neutral" className="gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formData.investment}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4 text-pink-600" />
                Filter by Difficulty
              </h3>
              <div className="flex gap-2">
                {["all", "Easy", "Medium", "Hard"].map((diff) => (
                  <Button
                    key={diff}
                    size="sm"
                    variant={filterDifficulty === diff ? "default" : "neutral"}
                    onClick={() => setFilterDifficulty(diff)}
                    className="capitalize"
                  >
                    {diff}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ideas Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
            <Card
              className={`border-2 hover:shadow-2xl transition-all relative ${
                selectedForCompare.includes(idea.id) ? "ring-4 ring-violet-500" : ""
              } ${
                favorites.includes(idea.id) ? "border-pink-500" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{idea.title}</CardTitle>
                      <Badge 
                        className={`${
                          idea.difficulty === "Easy" ? "bg-green-600" :
                          idea.difficulty === "Medium" ? "bg-yellow-600" :
                          "bg-red-600"
                        }`}
                      >
                        {idea.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {idea.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {idea.tags.map((tag) => (
                        <Badge key={tag} variant="neutral" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className="bg-violet-600 shrink-0">
                      #{index + 1}
                    </Badge>
                    <button
                      onClick={() => toggleFavorite(idea.id)}
                      className="p-2 rounded-lg hover:bg-pink-100 transition-colors"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.includes(idea.id)
                            ? "fill-pink-500 text-pink-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-green-900">
                        Monthly Income
                      </span>
                    </div>
                    <p className="text-sm font-bold text-green-700">
                      {idea.monthlyIncome}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-900">
                        Investment
                      </span>
                    </div>
                    <p className="text-sm font-bold text-blue-700">
                      {idea.investment}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-4 w-4 text-cyan-600" />
                      <span className="text-xs font-medium text-cyan-900">
                        Time to Profit
                      </span>
                    </div>
                    <p className="text-sm font-bold text-cyan-700">
                      {idea.timeToProfit}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="h-4 w-4 text-orange-600" />
                      <span className="text-xs font-medium text-orange-900">
                        Market Demand
                      </span>
                    </div>
                    <p className="text-sm font-bold text-orange-700">
                      {idea.demand}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-900">
                        Competition
                      </span>
                    </div>
                    <p className="text-sm font-bold text-purple-700">
                      {idea.competition}
                    </p>
                  </div>
                </div>

                {/* Launch Steps */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Step-by-Step Launch Plan
                  </h4>
                  <div className="space-y-2">
                    {idea.steps.slice(0, 3).map((stepItem, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{stepItem}</span>
                      </div>
                    ))}
                    {idea.steps.length > 3 && (
                      <p className="text-xs text-muted-foreground pl-6">
                        +{idea.steps.length - 3} more steps...
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {compareMode && (
                    <Button
                      variant="neutral"
                      size="sm"
                      onClick={() => toggleCompare(idea.id)}
                      disabled={!selectedForCompare.includes(idea.id) && selectedForCompare.length >= 2}
                      className="gap-1"
                    >
                      <GitCompare className="h-4 w-4" />
                      {selectedForCompare.includes(idea.id) ? "Selected" : "Compare"}
                    </Button>
                  )}
                  <Button
                    variant="neutral"
                    size="sm"
                    onClick={() => shareIdea(idea)}
                    className={`gap-1 ${compareMode ? "" : "col-span-2"}`}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
                <Button className="w-full gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-xl" asChild>
                  <Link href={`/business-setup/launch?name=${encodeURIComponent(idea.title)}`}>
                    Start This Business
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Panel */}
        <AnimatePresence>
        {compareMode && selectedForCompare.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card className="border-2 bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-violet-600" />
                  Idea Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedForCompare.map((id) => {
                    const idea = ideas.find((i) => i.id === id);
                    if (!idea) return null;
                    return (
                      <div key={id} className="space-y-3">
                        <h3 className="font-bold text-lg">{idea.title}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Income:</span>
                            <span className="font-semibold">{idea.monthlyIncome}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Investment:</span>
                            <span className="font-semibold">{idea.investment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Difficulty:</span>
                            <Badge className={`${
                              idea.difficulty === "Easy" ? "bg-green-600" :
                              idea.difficulty === "Medium" ? "bg-yellow-600" :
                              "bg-red-600"
                            }`}>{idea.difficulty}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time to Profit:</span>
                            <span className="font-semibold">{idea.timeToProfit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Competition:</span>
                            <span className="font-semibold">{idea.competition}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border-2 border-violet-500/20 backdrop-blur-sm">
        <h1 className="text-3xl font-heading font-bold mb-1 flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-violet-600" />
          AI Business Idea Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Tell us about yourself, and we&apos;ll suggest the best business ideas for you ✨
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="border-2 bg-background/95 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5 -z-10" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-violet-600" />
                Your Profile
              </CardTitle>
              <CardDescription className="text-base">
                Fill in your details to get personalized business recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Skill */}
              <div className="relative">
                <Label htmlFor="skill" className="text-sm font-semibold text-muted-foreground mb-2 block flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-violet-600" />
                  What&apos;s your main skill or interest?
                </Label>
                <Select
                  value={formData.skill}
                  onValueChange={(value) =>
                    setFormData({ ...formData, skill: value })
                  }
                >
                  <SelectTrigger id="skill" className="h-14 border-2 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background transition-all text-base">
                    <SelectValue placeholder="Choose your primary skill" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    {skills.map((skill) => (
                      <SelectItem key={skill} value={skill} className="rounded-lg text-base">
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="relative">
                <Label htmlFor="location" className="text-sm font-semibold text-muted-foreground mb-2 block flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-violet-600" />
                  Your Location
                </Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    setFormData({ ...formData, location: value })
                  }
                >
                  <SelectTrigger id="location" className="h-14 border-2 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background transition-all text-base">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city} className="rounded-lg text-base">
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Availability */}
              <div className="relative">
                <Label htmlFor="time" className="text-sm font-semibold text-muted-foreground mb-2 block flex items-center gap-2">
                  <Clock className="h-4 w-4 text-violet-600" />
                  Time Availability
                </Label>
                <Select
                  value={formData.timeAvailability}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timeAvailability: value })
                  }
                >
                  <SelectTrigger id="time" className="h-14 border-2 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background transition-all text-base">
                    <SelectValue placeholder="How much time can you dedicate?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    <SelectItem value="2-4 hours/day" className="rounded-lg text-base">
                      2-4 hours/day (Part-time)
                    </SelectItem>
                    <SelectItem value="4-6 hours/day" className="rounded-lg text-base">
                      4-6 hours/day (Half-time)
                    </SelectItem>
                    <SelectItem value="6-8 hours/day" className="rounded-lg text-base">
                      6-8 hours/day (Full-time)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Investment */}
              <div className="relative">
                <Label htmlFor="investment" className="text-sm font-semibold text-muted-foreground mb-2 block flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-violet-600" />
                  Initial Investment Capacity
                </Label>
                <Select
                  value={formData.investment}
                  onValueChange={(value) =>
                    setFormData({ ...formData, investment: value })
                  }
                >
                  <SelectTrigger id="investment" className="h-14 border-2 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background transition-all text-base">
                    <SelectValue placeholder="How much can you invest?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    <SelectItem value="Under ₹10,000" className="rounded-lg text-base">Under ₹10,000</SelectItem>
                    <SelectItem value="₹10,000 - ₹25,000" className="rounded-lg text-base">
                      ₹10,000 - ₹25,000
                    </SelectItem>
                    <SelectItem value="₹25,000 - ₹50,000" className="rounded-lg text-base">
                      ₹25,000 - ₹50,000
                    </SelectItem>
                    <SelectItem value="Above ₹50,000" className="rounded-lg text-base">Above ₹50,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience */}
              <div className="relative">
                <Label htmlFor="experience" className="text-sm font-semibold text-muted-foreground mb-2 block flex items-center gap-2">
                  <Users className="h-4 w-4 text-violet-600" />
                  Business Experience
                </Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    setFormData({ ...formData, experience: value })
                  }
                >
                  <SelectTrigger id="experience" className="h-14 border-2 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background transition-all text-base">
                    <SelectValue placeholder="Your experience level" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    <SelectItem value="Complete beginner" className="rounded-lg text-base">
                      Complete beginner
                    </SelectItem>
                    <SelectItem value="Some experience" className="rounded-lg text-base">
                      Some experience
                    </SelectItem>
                    <SelectItem value="Experienced" className="rounded-lg text-base">
                      Experienced entrepreneur
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full gap-2 h-16 text-lg font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 rounded-xl"
                onClick={handleGenerate}
                disabled={
                  !formData.skill ||
                  !formData.location ||
                  !formData.timeAvailability ||
                  !formData.investment ||
                  !formData.experience
                }
              >
                <Sparkles className="h-5 w-5" />
                Generate Business Ideas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <Card className="border-2 bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl" />
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-lg font-bold">What You&apos;ll Get ✨</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {[
                { icon: Target, text: "Top 3 business ideas for your profile" },
                {
                  icon: TrendingUp,
                  text: "Market demand & competition analysis",
                },
                {
                  icon: DollarSign,
                  text: "Expected income & investment needed",
                },
                { icon: CheckCircle2, text: "Step-by-step launch plan" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-violet-500/10 transition-colors">
                    <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-2 bg-background/95 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-lg font-bold">How It Works 🚀</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {[
                "Fill your profile details",
                "AI analyzes local market data",
                "Get personalized recommendations",
                "Choose & launch your business",
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-xl hover:bg-purple-500/5 transition-colors">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white shadow-lg">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium">{step}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
