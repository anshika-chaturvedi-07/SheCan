"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Features", href: "#features" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-4 z-50 px-4  sm:px-6 pb-2">
      <div className="max-w-6xl mx-auto">
        {/* Main Navbar Container */}
        <div className="bg-white/90 backdrop-blur-md border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ">
          <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 ">
            {/* Brand Name */}
            <Link href="/" className="group">
              <span className="text-xl sm:text-2xl font-black text-black group-hover:translate-x-1 transition-transform inline-block">
                SheCan
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 lg:px-4 py-2 text-sm font-bold text-black hover:bg-black hover:text-white rounded-lg transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/login"
                className="px-4 lg:px-6 py-2 text-sm font-bold text-white bg-black rounded-lg hover:bg-black/90 transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(124,58,237,1)] hover:shadow-[5px_5px_0px_0px_rgba(124,58,237,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 bg-white/90 backdrop-blur-md border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-bold text-black hover:bg-black hover:text-white rounded-lg transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-bold text-white bg-black rounded-lg text-center shadow-[3px_3px_0px_0px_rgba(124,58,237,1)] transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
