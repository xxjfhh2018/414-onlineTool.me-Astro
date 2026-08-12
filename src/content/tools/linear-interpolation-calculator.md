---
seoTitle: "Linear Interpolation Calculator - Estimate Y"
title: "Linear Interpolation Calculator"
description: "Use this linear interpolation calculator with two known points and a target x value to estimate y, slope, and interval position instantly."
intro: "Enter two known coordinate pairs and a target x value to get the estimated y, slope, and interval position."
keywords: "linear interpolation calculator, interpolate between two points, linear interpolation formula, estimate y value"
category: "calculators"
subcategory: "education"
icon: "TrendingUp"
featured: false
features: ["Two-point linear interpolation", "Live slope and interval position", "Negative and decimal support", "Clear extrapolation warning"]
useCases:
  - title: "Estimate a value in a table"
    description: "Find an intermediate measurement between two known data rows when a straight-line assumption is appropriate."
  - title: "Check a manual interpolation"
    description: "Compare your fraction, slope, and estimated y value with a transparent calculation."
calculationDetails:
  formula: "y = y₁ + (x − x₁)(y₂ − y₁) ÷ (x₂ − x₁)"
  steps: ["Subtract x₁ from the target x and divide by the full x interval.", "Multiply that interval position by the change in y.", "Add the result to y₁."]
  rounding: "The calculation keeps full precision and displays up to eight decimal places."
  sources:
    - name: "DLMF §3.3 Interpolation"
      url: "https://dlmf.nist.gov/3.3"
      publisher: "National Institute of Standards and Technology"
      accessedDate: "2026-08-13"
  version: "Two-point linear interpolation"
  lastVerified: "2026-08-13"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions: ["The relationship between the known points is treated as a straight line.", "The two x coordinates are different.", "All values are expressed on compatible scales and units."]
  example:
    inputs: "Points (10, 100) and (20, 200), with target x = 15."
    calculation: "Position = (15 − 10) ÷ (20 − 10) = 0.5; y = 100 + 0.5 × 100."
    result: "Estimated y = 150."
limitations: ["A target outside the known x interval is extrapolation and may be less reliable.", "The result is inappropriate when the underlying relationship is curved, discontinuous, categorical, or otherwise nonlinear.", "Input-data uncertainty is not propagated into the result."]
relatedTools: ["partial-fraction-decomposition-calculator", "ti-84-calculator", "rpm-calculator"]
howToUse:
  - step: 1
    title: "Enter Two Known Points"
    description: "Provide x₁, y₁, x₂, and y₂ using compatible scales."
  - step: 2
    title: "Enter the Target X"
    description: "Use a target between the two x values for interpolation."
  - step: 3
    title: "Review Range Context"
    description: "Check the estimated y, slope, and whether the target is inside or outside the known interval."
faq:
  - question: "What is the linear interpolation formula?"
    answer: "Use y = y₁ + (x − x₁)(y₂ − y₁)/(x₂ − x₁)."
  - question: "Can I interpolate with decreasing values?"
    answer: "Yes. Either x or y can decrease; the formula preserves the direction through the calculated slope."
  - question: "What happens when target x is outside the two points?"
    answer: "The same formula performs linear extrapolation, which the calculator flags because uncertainty commonly increases outside the known interval."
---
