import React from "react";

import Banner from "./banner";
import Feature from "./feature";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import FAQ from "./FAQ";

import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* 1. Banner */}
      <Banner />

      {/* 2. Services Providing */}
      <Feature />

      {/* 3. General - Data about tool and usage */}
      <Stats />

      {/* 4. Testimonials */}
      <Testimonials />

      {/* 5. CTA */}
      <CTA />

      {/* 6. FAQ */}
      <FAQ />
    </div>
  );
}
