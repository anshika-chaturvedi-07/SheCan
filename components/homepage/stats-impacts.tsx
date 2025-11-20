"use client";

import React from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Users,
  Store,
  TrendingUp,
  Award,
  Globe,
  Heart,
  Sparkles,
} from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
  gradient: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Women Empowered",
    color: "text-violet-600",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Store,
    value: 5000,
    suffix: "+",
    label: "Businesses Launched",
    color: "text-blue-600",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: TrendingUp,
    value: 2,
    suffix: "Cr+",
    label: "Revenue Generated",
    color: "text-green-600",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Globe,
    value: 500,
    suffix: "+",
    label: "Cities Reached",
    color: "text-orange-600",
    gradient: "from-orange-500 to-amber-600",
  },
];

const impacts = [
  {
    icon: Heart,
    title: "Financial Independence",
    description: "Helping women achieve economic self-reliance and dignity",
  },
  {
    icon: Award,
    title: "Skill Development",
    description: "Upskilling entrepreneurs with modern digital tools",
  },
  {
    icon: Sparkles,
    title: "Community Building",
    description: "Creating supportive networks of women entrepreneurs",
  },
];

// Animated Counter Component
function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  React.useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-IN").format(
          Math.floor(latest)
        );
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

const StatsImpactsSection = () => {
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
            <TrendingUp className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-black/70">
              Our Impact
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Creating <span className="italic">Real Change</span>
          </h2>
          <p className="text-base sm:text-lg text-black/70 max-w-2xl mx-auto px-4">
            Empowering women across India to build sustainable businesses and
            achieve financial independence
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div className="relative z-10 mb-4">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="relative z-10 mb-2">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-black flex items-baseline gap-1">
                      <AnimatedCounter value={stat.value} />
                      <span className={`text-2xl sm:text-3xl ${stat.color}`}>
                        {stat.suffix}
                      </span>
                    </div>
                  </div>

                  {/* Label */}
                  <p className="relative z-10 text-sm sm:text-base text-black/60 font-medium">
                    {stat.label}
                  </p>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Impact Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          {/* Background Card */}
          <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-1 shadow-2xl">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {impacts.map((impact, index) => {
                  const Icon = impact.icon;
                  return (
                    <motion.div
                      key={impact.title}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="group flex flex-col items-center text-center sm:items-start sm:text-left"
                    >
                      {/* Icon */}
                      <div className="mb-4 relative">
                        <div className="absolute inset-0 bg-violet-500/20 rounded-xl blur-xl group-hover:bg-violet-500/30 transition-colors" />
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                        {impact.title}
                      </h3>
                      <p className="text-sm sm:text-base text-black/60 leading-relaxed">
                        {impact.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-black/80 italic max-w-3xl mx-auto px-4">
            &ldquo;Every woman has the potential to be an entrepreneur. We&apos;re here to
            unlock that potential.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsImpactsSection;