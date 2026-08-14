---
seoTitle: "Tire Pressure Calculator - Temperature Change"
title: "Tire Pressure Calculator"
description: "Use this tire pressure calculator to estimate how gauge pressure changes with ambient temperature. Always follow the vehicle cold-pressure placard."
intro: "Enter measured tire pressure and two temperatures to get a constant-volume pressure-change estimate, not a recommended inflation setting."
keywords: "tire pressure calculator, tire pressure temperature calculator, psi temperature calculator, cold tire pressure estimate"
category: "calculators"
subcategory: "engineering"
icon: "Wrench"
featured: false
features: ["psi/°F and kPa/°C modes", "Absolute-temperature pressure calculation", "Live pressure-change estimate", "Vehicle-placard safety reminder"]
useCases:
  - title: "Understand a weather-related pressure change"
    description: "Estimate how the same sealed tire could read after a change in ambient temperature."
  - title: "Interpret a warm or cold reading"
    description: "Use the result as context before rechecking a cold tire against the manufacturer placard."
calculationDetails:
  formula: "P₂ gauge = (P₁ gauge + atmospheric pressure) × T₂ absolute ÷ T₁ absolute − atmospheric pressure"
  steps: ["Convert gauge pressure to absolute pressure.", "Convert Fahrenheit or Celsius to an absolute temperature scale.", "Apply the ideal-gas pressure ratio at constant volume.", "Convert absolute pressure back to gauge pressure."]
  rounding: "Pressure displays to one decimal psi or kPa."
  sources:
    - name: "TireWise — Tire Safety Ratings and Awareness"
      url: "https://www.nhtsa.gov/vehicle-safety/tires"
      publisher: "National Highway Traffic Safety Administration"
      accessedDate: "2026-08-14"
  version: "Constant-volume ideal-gas estimate"
  lastVerified: "2026-08-14"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Planning estimate"
  assumptions: ["The tire’s internal air mass and volume stay constant.", "Atmospheric pressure is approximated as 14.6959 psi at sea level.", "Measured and target temperatures represent the tire air closely enough for planning.", "Leaks, driving heat, sunlight, altitude changes, gauge error, and tire flex are excluded."]
  example:
    inputs: "35 psi measured at 70°F, with a target temperature of 30°F."
    calculation: "Convert 35 psi gauge to absolute pressure, scale by the Rankine temperature ratio, then subtract atmospheric pressure."
    result: "The estimated pressure is lower; the exact output is a physics estimate, not an instruction to add or release air."
limitations: ["Never use this result instead of the vehicle manufacturer’s cold inflation pressure on the door placard or owner’s manual.", "NHTSA defines cold tires as not driven for at least three hours; recheck cold after any temporary warm-tire adjustment.", "Do not use tire-sidewall maximum pressure as the vehicle’s recommended pressure.", "Damaged, leaking, overloaded, commercial, racing, aviation, or specialty tires require qualified guidance."]
relatedTools: ["rpm-calculator", "linear-interpolation-calculator", "watts-to-amps-calculator"]
howToUse:
  - step: 1
    title: "Choose Pressure and Temperature Units"
    description: "Use psi with Fahrenheit or kPa with Celsius. Switching units clears measurements to prevent reinterpretation."
  - step: 2
    title: "Enter the Measured Conditions"
    description: "Provide gauge pressure, measured temperature, and the temperature you want to compare."
  - step: 3
    title: "Return to the Placard"
    description: "Use the estimate as context, then measure cold and follow the vehicle placard."
faq:
  - question: "What tire pressure should I use?"
    answer: "Use the vehicle manufacturer’s recommended cold pressure on the driver-door placard or in the owner’s manual, not this estimate or the tire-sidewall maximum."
  - question: "Why does tire pressure fall in cold weather?"
    answer: "For a sealed tire of roughly constant volume, absolute pressure falls as absolute temperature falls."
  - question: "Should I release air from a warm tire?"
    answer: "NHTSA advises checking cold pressure; warm pressure normally rises while driving, so recheck after the tire has been cold for at least three hours."
---

