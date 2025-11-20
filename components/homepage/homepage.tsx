import React from "react";
import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import HowItWorksSection from "./how-it-works";
import CTA from "./cta";
import Footer from "./footer";

const Homepage = () => {
  return (
    <div className="">
      {/* Your Content/Components */}
      <HeroSection />
      <FeaturesSection/>
      <HowItWorksSection/>
      <CTA/>
      <Footer/>
    </div>
  );
};

export default Homepage;
