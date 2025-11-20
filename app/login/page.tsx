"use client";

import React from "react";
import { motion } from "framer-motion";
import { Chrome } from "lucide-react";
import Link from "next/link";

const LoginAndSignUpPage = () => {
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth later
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-md border-2 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-3xl sm:text-4xl font-black text-black">
                SheCan
              </h1>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
              Welcome Back
            </h2>
            <p className="text-sm sm:text-base text-black/60">
              Sign in to continue your entrepreneurial journey
            </p>
          </div>

          {/* Google Sign In Button */}
         <Link href={"/dashboard"}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-black rounded-xl font-bold text-black hover:bg-black hover:text-white transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            <Chrome className="w-5 h-5" />
            <span>Continue with Google</span>
          </motion.button>
         </Link>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-black/60 font-medium">
                Quick & Secure
              </span>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            {[
              "AI-powered business tools",
              "Connect with mentors",
              "Build your online store",
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 text-sm text-black/70"
              >
                <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-black/50 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-black">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-black">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-6"
        >
          <Link
            href="/"
            className="text-sm font-semibold text-black/70 hover:text-black transition-colors inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginAndSignUpPage;
