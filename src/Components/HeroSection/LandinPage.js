import React from "react";
import Hero from "./Hero";
import CompanyOverview from "../CompanyOverview/CompanyOverview";
import CoreValuesSlider from "../CoreValues/CoreValueSlider";

function LandinPage() {
  return (
    <div>
      <Hero />
      <CompanyOverview />
      <CoreValuesSlider />
    </div>
  );
}

export default LandinPage;
