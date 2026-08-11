---
seoTitle: "Linear Feet Calculator for Multiple Items | OnlineTool.me"
title: "Linear Feet Calculator"
description: "Calculate total linear feet from multiple lengths and quantities. Add feet and inches per item to get totals in feet, inches, and metres."
intro: "Enter each piece length and quantity to get total linear feet, total inches, and metres."
keywords: "linear feet calculator, calculate linear feet, linear footage calculator, how to calculate linear feet, board feet to linear feet calculator"
category: "calculators"
subcategory: "engineering"
icon: "Ruler"
featured: false
features:
  - "Multiple item rows with live totals"
  - "Separate feet, inches, and quantity inputs"
  - "Results in linear feet, inches, and metres"
  - "Incomplete rows excluded with a clear notice"
useCases:
  - title: "Total trim or moulding runs"
    description: "Add repeated cut lengths before comparing the total with supplier stock lengths."
  - title: "Combine mixed piece lengths"
    description: "Total a cut list that contains different feet-and-inch measurements and quantities."
calculationDetails:
  formula: "Total linear feet = Σ(quantity × (feet + inches ÷ 12))"
  steps:
    - "Convert each item's inches to feet by dividing by 12."
    - "Add the feet and converted inches for one piece."
    - "Multiply by quantity and sum every complete row."
    - "Convert the total using 1 foot = 0.3048 metre."
  rounding: "Linear feet and metres display to three decimals; total inches display to two decimals."
  sources:
    - name: "Revised Unit Conversion Factors"
      url: "https://www.nist.gov/pml/us-surveyfoot/revised-unit-conversion-factors"
      publisher: "National Institute of Standards and Technology"
      accessedDate: "2026-08-11"
  version: "International foot conversion: 1 ft = 0.3048 m exactly"
  lastVerified: "2026-08-11"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions:
    - "Every row represents a straight measured length multiplied by a whole-number quantity."
    - "Inches must be from 0 to less than 12; enter additional whole feet separately."
    - "No cutting waste, kerf, overlap, or stock-length optimization is added."
  example:
    inputs: "8 pieces at 6 ft 6 in and 2 pieces at 4 ft 0 in."
    calculation: "8 × 6.5 ft + 2 × 4 ft = 52 ft + 8 ft."
    result: "Total = 60 linear ft = 720 in = 18.288 m."
limitations:
  - "Linear feet measure length only; they do not represent area, volume, board feet, or material cost."
  - "Add your own allowance for cuts, joins, defects, offcuts, and supplier stock sizes before ordering."
  - "Measure along the actual run when curves, mitres, overlaps, or field conditions affect required length."
relatedTools:
  - "material-calculator"
  - "cinder-block-calculator"
  - "rebar-calculator"
howToUse:
  - step: 1
    title: "Enter a Piece Length"
    description: "Add feet and inches for one item or repeated piece."
  - step: 2
    title: "Add the Quantity"
    description: "Enter a whole-number count and add rows for other lengths."
  - step: 3
    title: "Review the Total"
    description: "Use the live linear-foot total, then apply project-specific waste separately."
faq:
  - question: "What is a linear foot?"
    answer: "A linear foot is a one-dimensional length of 12 inches, regardless of an item's width or thickness."
  - question: "How do I calculate linear feet?"
    answer: "Convert inches to feet, add them to whole feet, multiply by quantity, and sum all items."
  - question: "Are linear feet and square feet the same?"
    answer: "No. Linear feet measure length, while square feet measure area."
  - question: "Does this calculator add waste?"
    answer: "No. The result is the measured total, so add a suitable project allowance before buying material."
---
