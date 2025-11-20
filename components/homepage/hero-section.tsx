"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Navbar from './navbar';

const HeroSection = () => {
  return (
     <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Top */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
        }}
      />
      <Navbar/>
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <Badge
            variant="neutral"
            className="px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium bg-black/90 text-white border-0 shadow-xl backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2 inline-block" />
            <span className="hidden xs:inline">
              Empowering Women Entrepreneurs Across India
            </span>
            <span className="xs:hidden">Empowering Women Entrepreneurs</span>
          </Badge>
        </motion.div>

        {/* Main Heading - Bold Black */}
        <motion.h1
          className="text-4xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-black leading-[1.1] tracking-tight px-2"
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Turn Your Skills <br />
          <span className="italic font-bold">Into A Thriving</span> <br />
          Business
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-sm xs:text-base sm:text-lg text-black/70 my-4 sm:my-5 max-w-xs xs:max-w-md sm:max-w-lg md:max-w-3xl mx-auto leading-relaxed font-normal px-4"
          initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.2,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          AI-powered toolkit designed for women entrepreneurs. Get business
          ideas, build your store, predict pricing, and connect with mentors—all
          in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4"
          initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold bg-black hover:bg-black/90 text-white shadow-xl group"
              asChild
            >
              <Link href="/dashboard">
                Get Started
                <motion.div
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="neutral"
              className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
              asChild
            >
              <Link href="#features">Explore Features</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default HeroSection;
