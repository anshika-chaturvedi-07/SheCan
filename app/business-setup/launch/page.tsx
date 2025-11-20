"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileText,
  CreditCard,
  Store,
  Package,
  TrendingUp,
  Users,
  Calendar,
  Clock,
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const launchSteps = [
  {
    id: 1,
    title: "Business Registration",
    description: "Register your business and get necessary licenses",
    icon: FileText,
    tasks: ["Choose business structure", "Register with authorities", "Get FSSAI/trade license"],
  },
  {
    id: 2,
    title: "Setup Payment",
    description: "Configure payment methods for your business",
    icon: CreditCard,
    tasks: ["Open business bank account", "Setup UPI/payment gateway", "Configure tax settings"],
  },
  {
    id: 3,
    title: "Create Store",
    description: "Build your online presence",
    icon: Store,
    tasks: ["Design store layout", "Add products/services", "Setup delivery options"],
  },
  {
    id: 4,
    title: "Launch Marketing",
    description: "Start promoting your business",
    icon: TrendingUp,
    tasks: ["Create social media accounts", "Design marketing materials", "Plan launch campaign"],
  },
];

export default function LaunchBusinessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessName = searchParams.get("name") || "Your Business";
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [formData, setFormData] = React.useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
  });

  const progress = (completedSteps.length / launchSteps.length) * 100;

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border-2 border-violet-500/20 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2 flex items-center gap-2">
                <Rocket className="w-8 h-8 text-violet-600" />
                Launch Your Business
              </h1>
              <p className="text-muted-foreground text-lg">
                Follow these steps to successfully launch <strong>{businessName}</strong>
              </p>
            </div>
            <Button variant="neutral" asChild>
              <Link href="/business-setup/idea-generator">
                Back to Ideas
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 border-2 bg-gradient-to-br from-background to-secondary-background">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">Launch Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedSteps.length} of {launchSteps.length} steps completed
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-lg px-4 py-2">
                  {Math.round(progress)}%
                </Badge>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Launch Steps */}
          <div className="lg:col-span-2 space-y-6">
            {launchSteps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === idx;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <Card
                    className={`border-2 transition-all ${
                      isCurrent ? "ring-4 ring-violet-500 shadow-2xl" : ""
                    } ${isCompleted ? "border-green-500 bg-green-50/50" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-xl ${
                              isCompleted
                                ? "bg-green-500"
                                : "bg-gradient-to-br from-violet-500 to-purple-600"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-6 w-6 text-white" />
                            ) : (
                              <Icon className="h-6 w-6 text-white" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-1">
                              Step {step.id}: {step.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {step.description}
                            </CardDescription>
                          </div>
                        </div>
                        {isCompleted && (
                          <Badge className="bg-green-600">Completed</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <h4 className="font-semibold text-sm">Tasks:</h4>
                        {step.tasks.map((task, taskIdx) => (
                          <div
                            key={taskIdx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle2
                              className={`h-4 w-4 ${
                                isCompleted ? "text-green-600" : "text-gray-400"
                              }`}
                            />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {!isCompleted && (
                          <Button
                            onClick={() => {
                              handleStepComplete(step.id);
                              if (idx < launchSteps.length - 1) {
                                setCurrentStep(idx + 1);
                              }
                            }}
                            className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600"
                          >
                            Mark as Complete
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="neutral" size="sm">
                          View Guide
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Business Details Form */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-violet-600" />
                    Business Details
                  </CardTitle>
                  <CardDescription>
                    Fill in your business information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Label className="text-sm font-semibold mb-2 block">
                      Business Name
                    </Label>
                    <Input
                      placeholder="Enter business name"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="relative">
                    <Label className="text-sm font-semibold mb-2 block">
                      Owner Name
                    </Label>
                    <Input
                      placeholder="Your full name"
                      value={formData.ownerName}
                      onChange={(e) =>
                        setFormData({ ...formData, ownerName: e.target.value })
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="relative">
                    <Label className="text-sm font-semibold mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <div className="relative">
                    <Label className="text-sm font-semibold mb-2 block">
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 border-2 rounded-xl"
                    />
                  </div>
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-xl"
                    disabled={!formData.businessName || !formData.ownerName}
                  >
                    Save Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-base">Estimated Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-violet-600" />
                    <div>
                      <p className="font-semibold">Launch Date</p>
                      <p className="text-sm text-muted-foreground">2-4 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-violet-600" />
                    <div>
                      <p className="font-semibold">Time Investment</p>
                      <p className="text-sm text-muted-foreground">4-6 hours/day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-violet-600" />
                    <div>
                      <p className="font-semibold">Support Available</p>
                      <p className="text-sm text-muted-foreground">24/7 Mentorship</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Launch Button */}
        {completedSteps.length === launchSteps.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="border-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  Ready to Launch! 🎉
                </h3>
                <p className="text-muted-foreground mb-6">
                  You&apos;ve completed all the steps. Time to launch your business!
                </p>
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-2xl text-lg px-8"
                  asChild
                >
                  <Link href="/business-setup/store-builder">
                    <Rocket className="h-5 w-5" />
                    Launch Business
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
