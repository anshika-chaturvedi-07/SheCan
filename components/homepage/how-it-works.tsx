"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserCircle,
  Lightbulb,
  Store,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sign Up & Profile",
    description:
      "Create your account and tell us about your skills, interests, and business goals. Our AI will understand your unique strengths.",
    icon: UserCircle,
    color: "from-violet-500 to-purple-600",
    dotColor: "bg-violet-500",
  },
  {
    number: "02",
    title: "Get AI Features",
    description:
      "Receive personalized business ideas, pricing strategies, and design suggestions powered by our intelligent algorithms.",
    icon: Lightbulb,
    color: "from-blue-500 to-cyan-600",
    dotColor: "bg-blue-500",
  },
  {
    number: "03",
    title: "Build Your Store",
    description:
      "Use our drag-and-drop store builder to create your online presence. Add products, customize themes, and set up payments.",
    icon: Store,
    color: "from-pink-500 to-rose-600",
    dotColor: "bg-pink-500",
  },
  {
    number: "04",
    title: "Launch & Grow",
    description:
      "Go live with your business! Connect with mentors, track analytics, and scale your venture with our comprehensive tools.",
    icon: Rocket,
    color: "from-orange-500 to-amber-600",
    dotColor: "bg-orange-500",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 mb-6 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-black/70">
              Simple Process
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            How <span className="italic">It Works</span>
          </h2>
          <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto px-4">
            Get started in 4 simple steps and transform your entrepreneurial
            dreams into reality
          </p>
        </motion.div>

        {/* Steps Grid - Desktop/Tablet */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-black/20 to-transparent z-0" />
                )}

                {/* Card */}
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Indicator */}
                  <div
                    className={`w-full h-1 rounded-full bg-gradient-to-r ${step.color} mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Steps Timeline - Mobile */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex gap-4"
              >
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-black/20 to-transparent" />
                )}

                {/* Number & Icon */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-black/10 shadow-lg">
                  <h3 className="text-lg font-bold text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-black/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};

export default HowItWorksSection;
