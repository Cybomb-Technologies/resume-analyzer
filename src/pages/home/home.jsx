import React from "react";

import Banner from "./banner";
import Feature from "./feature";
import HowItWorks from "../../components/howitworks";   // ✅ KEEP THIS ONE
import StepsShowcase from "../../components/stepshowcase";
import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Banner />
      <Feature />

      {/*  ONLY ONE HOW IT WORKS */}
      <HowItWorks />

      <StepsShowcase />

      {/*  REMOVED SCREENING COMPLETELY */}
    </div>
  );
}
