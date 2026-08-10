---
seoTitle: "VDOT Calculator for Running Race Times | OnlineTool.me"
title: "VDOT Calculator"
description: "Estimate VDOT from a recent race distance and finish time. Get a Daniels-based running performance index plus average pace per kilometer and mile."
intro: "Enter a recent race distance and finish time to estimate VDOT and average pace per kilometer and mile."
keywords: "vdot calculator, running vdot calculator, jack daniels vdot calculator, race time calculator, running pace calculator"
category: "sports"
icon: "Trophy"
featured: false
features:
  - "Live VDOT estimate from common race distances"
  - "Average pace per kilometer and mile"
  - "Daniels–Gilbert oxygen-cost and duration model"
  - "Clear model limits and performance-only context"
useCases:
  - title: "Benchmark a recent race"
    description: "Turn a recent all-out result into a repeatable performance index for training discussions."
  - title: "Track race fitness over time"
    description: "Compare VDOT estimates from similar races while accounting for course and weather differences yourself."
calculationDetails:
  formula: "VDOT = (−4.60 + 0.182258v + 0.000104v²) ÷ (0.8 + 0.1894393e^(−0.012778t) + 0.2989558e^(−0.1932605t)), where v is m/min and t is minutes"
  steps:
    - "Convert the selected distance and finish time into metres per minute."
    - "Estimate oxygen cost from race velocity."
    - "Estimate the sustainable fraction from total race duration."
    - "Divide oxygen cost by the duration fraction and calculate average paces."
  rounding: "VDOT displays to one decimal; average paces display to the nearest second."
  sources:
    - name: "Daniels' Running Formula"
      url: "https://www.human-kinetics.co.uk/9781718203662/daniels-running-formula/"
      publisher: "Human Kinetics"
      accessedDate: "2026-08-10"
  version: "Daniels–Gilbert race-performance equations"
  lastVerified: "2026-08-10"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Planning estimate"
  assumptions:
    - "The entered performance reflects a recent race-level effort."
    - "Terrain, altitude, temperature, wind, fatigue, and course accuracy are not adjusted."
    - "VDOT is treated as a performance index rather than a direct laboratory VO₂max measurement."
  example:
    inputs: "5,000 metres in 20:00."
    calculation: "Race velocity is 250 m/min; the Daniels–Gilbert equations produce about 49.81."
    result: "Estimated VDOT = 49.8 and average pace = 4:00/km."
limitations:
  - "Use a recent race or hard time trial; an easy training run will understate race-performance VDOT."
  - "Results from hills, trails, heat, altitude, wind, or inaccurate distance may not compare fairly with a flat measured course."
  - "This is not a medical assessment, VO₂max laboratory test, or guarantee of another race time."
relatedTools:
  - "swim-time-converter"
  - "ffmi-calculator"
  - "pomodoro-timer"
howToUse:
  - step: 1
    title: "Choose a Race Distance"
    description: "Select the event that matches a recent race or hard time trial."
  - step: 2
    title: "Enter Finish Time"
    description: "Provide hours, minutes, and seconds exactly as recorded."
  - step: 3
    title: "Review VDOT and Pace"
    description: "Use the estimate for performance context and compare future results under similar conditions."
faq:
  - question: "What does VDOT mean?"
    answer: "VDOT is a running performance index associated with Jack Daniels’ training system. It combines race velocity and duration rather than directly measuring oxygen in a laboratory."
  - question: "Is VDOT the same as VO2 max?"
    answer: "No. The values may look similar, but this calculator estimates a performance index from a race result and does not measure physiological VO₂max."
  - question: "Which race should I use for a VDOT calculation?"
    answer: "Use a recent, accurately measured, hard race or time trial with representative conditions."
  - question: "Why do my VDOT estimates differ by distance?"
    answer: "Endurance, pacing, terrain, weather, fatigue, and course accuracy can affect each performance differently."
---
