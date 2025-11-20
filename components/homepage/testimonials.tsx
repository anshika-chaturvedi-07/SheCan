"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  business: string;
  location: string;
  testimonial: string;
  image: string;
  rating: number;
  revenue?: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Founder",
    business: "Handloom Sarees",
    location: "Varanasi, UP",
    testimonial:
      "SheCan transformed my traditional weaving skills into a thriving online business. Within 6 months, I went from local sales to shipping across India. The AI pricing tool helped me compete with bigger brands.",
    image: "/testimonials/priya.jpg",
    rating: 5,
    revenue: "₹5L+",
    highlight: "From local to national in 6 months",
  },
  {
    name: "Anjali Patel",
    role: "Baker & Entrepreneur",
    business: "Sweet Delights Bakery",
    location: "Ahmedabad, Gujarat",
    testimonial:
      "I started with just ₹10,000 and a passion for baking. The store builder was so easy, even my teenage daughter helped me set it up. Now I have 3 employees and daily orders!",
    image: "/testimonials/anjali.jpg",
    rating: 5,
    revenue: "₹8L+",
    highlight: "Grew from home kitchen to 3 employees",
  },
  {
    name: "Meera Reddy",
    role: "Artist",
    business: "Traditional Art Studio",
    location: "Hyderabad, Telangana",
    testimonial:
      "The design generator helped me create professional labels and packaging. My mentor connected me with galleries in Mumbai and Delhi. This platform gave me confidence I never had.",
    image: "/testimonials/meera.jpg",
    rating: 5,
    revenue: "₹12L+",
    highlight: "Expanded to 2 major cities",
  },
  {
    name: "Kavita Singh",
    role: "Fashion Designer",
    business: "Ethnic Wear Collection",
    location: "Jaipur, Rajasthan",
    testimonial:
      "Being a single mother, I needed flexible work. SheCan helped me launch my boutique online while taking care of my kids. The learning resources taught me everything about digital marketing.",
    image: "/testimonials/kavita.jpg",
    rating: 5,
    revenue: "₹6L+",
    highlight: "Balanced motherhood & business",
  },
  {
    name: "Lakshmi Nair",
    role: "Organic Farmer",
    business: "Farm Fresh Produce",
    location: "Kerala",
    testimonial:
      "I never thought I could sell my organic vegetables online. The platform made it so simple. Now I supply to 50+ families every week and earned more than my husband's salary!",
    image: "/testimonials/lakshmi.jpg",
    rating: 5,
    revenue: "₹4L+",
    highlight: "Weekly supply to 50+ families",
  },
  {
    name: "Nisha Gupta",
    role: "Jewelry Maker",
    business: "Handcrafted Jewelry",
    location: "Kolkata, West Bengal",
    testimonial:
      "After my divorce, I needed to support myself. SheCan didn't just give me tools, it gave me a community of women who understood my journey. Today, I'm financially independent and proud.",
    image: "/testimonials/nisha.jpg",
    rating: 5,
    revenue: "₹7L+",
    highlight: "Found independence & community",
  },
];

const TestimonialsSection = () => {
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
            <Quote className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-black/70">
              Real Stories
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Success Stories from <span className="italic">Real Women</span>
          </h2>
          <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto px-4">
            Meet the incredible women who turned their dreams into successful
            businesses
          </p>
        </motion.div>

        {/* Testimonials Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              } ${index === 2 ? "lg:row-span-2" : ""}`}
            >
              <div className="relative h-full bg-white/90 backdrop-blur-md rounded-2xl border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500" />

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar Placeholder */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                        {testimonial.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-black">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-black/60">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-violet-600 font-medium">
                          {testimonial.business}
                        </p>
                      </div>
                    </div>

                    {/* Revenue Badge */}
                    {testimonial.revenue && (
                      <div className="px-3 py-1 rounded-full bg-green-100 border border-green-200 shrink-0">
                        <p className="text-xs sm:text-sm font-bold text-green-700">
                          {testimonial.revenue}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-violet-200 mb-3" />

                  {/* Testimonial */}
                  <p className="text-sm sm:text-base text-black/80 leading-relaxed mb-4">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </p>

                  {/* Highlight */}
                  <div className="flex items-center gap-2 pt-4 border-t border-black/10">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    <p className="text-xs sm:text-sm font-semibold text-violet-600 italic">
                      {testimonial.highlight}
                    </p>
                  </div>

                  {/* Location */}
                  <p className="text-xs text-black/40 mt-3">
                    📍 {testimonial.location}
                  </p>
                </div>

                {/* Bottom Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-12 bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-black/10 shadow-xl">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-black mb-1">
                4.9/5
              </p>
              <p className="text-sm text-black/60">Average Rating</p>
            </div>
            <div className="h-12 w-px bg-black/10 hidden sm:block" />
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-black mb-1">
                10,000+
              </p>
              <p className="text-sm text-black/60">Happy Entrepreneurs</p>
            </div>
            <div className="h-12 w-px bg-black/10 hidden sm:block" />
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-black mb-1">
                ₹50Cr+
              </p>
              <p className="text-sm text-black/60">Combined Revenue</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;