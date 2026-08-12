---
seoTitle: "RPM Calculator - Revolutions per Minute"
title: "RPM Calculator"
description: "Use this RPM calculator to convert revolutions and elapsed time into RPM, hertz, radians per second, and seconds per revolution."
intro: "Enter revolutions and elapsed time to get RPM, hertz, angular speed, and seconds per revolution."
keywords: "rpm calculator, revolutions per minute calculator, rotational speed calculator, rpm to hertz"
category: "calculators"
subcategory: "engineering"
icon: "Wrench"
featured: false
features: ["Seconds, minutes, or hours input", "Live RPM calculation", "Hertz and radians-per-second conversion", "Cycle-time output"]
useCases:
  - title: "Convert a counted rotation interval"
    description: "Turn revolutions observed over a timed sample into an average per-minute rate."
  - title: "Compare rotational units"
    description: "View the same rate as RPM, hertz, radians per second, and seconds per turn."
calculationDetails:
  formula: "RPM = revolutions ÷ elapsed minutes; Hz = RPM ÷ 60; rad/s = RPM × 2π ÷ 60"
  steps: ["Convert elapsed time to minutes.", "Divide revolutions by elapsed minutes.", "Convert the result to hertz, angular speed, and cycle time."]
  rounding: "RPM displays to two decimals; converted values display to four decimals."
  sources:
    - name: "NIST Guide to the SI, Chapter 8"
      url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8"
      publisher: "National Institute of Standards and Technology"
      accessedDate: "2026-08-13"
  version: "Rotational-frequency definition"
  lastVerified: "2026-08-13"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions: ["The revolution count covers the complete entered time interval.", "Rotation is represented by an average rate over that interval.", "One revolution equals 2π radians."]
  example:
    inputs: "120 revolutions in 30 seconds."
    calculation: "30 seconds = 0.5 minutes; 120 ÷ 0.5 = 240 RPM."
    result: "240 RPM = 4 Hz = about 25.1327 rad/s."
limitations: ["This is an average rate, not a live tachometer measurement.", "It does not calculate pulley ratios, gear ratios, torque, slip, or load.", "Very short manual timing samples can amplify counting and stopwatch error."]
relatedTools: ["watts-to-amps-calculator", "linear-interpolation-calculator", "pomodoro-timer"]
howToUse:
  - step: 1
    title: "Count Revolutions"
    description: "Enter the number of complete turns observed during the sample."
  - step: 2
    title: "Enter Elapsed Time"
    description: "Provide the sample duration and choose seconds, minutes, or hours."
  - step: 3
    title: "Compare Rotation Rates"
    description: "Review RPM and equivalent frequency, angular speed, and cycle time."
faq:
  - question: "How do I calculate RPM from revolutions and seconds?"
    answer: "Divide revolutions by seconds, then multiply by 60."
  - question: "How many hertz is 60 RPM?"
    answer: "Sixty RPM is one revolution per second, which is 1 Hz."
  - question: "Is RPM the same as angular velocity?"
    answer: "They describe related rotation rates, but angular velocity is commonly expressed in radians per second; multiply RPM by 2π/60."
---

