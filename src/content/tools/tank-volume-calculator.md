---
seoTitle: "Tank Volume Calculator for Gallons and Litres"
title: "Tank Volume Calculator"
description: "Calculate rectangular or vertical cylindrical tank capacity from inside dimensions. Get total and filled volume in gallons, litres, and cubic units."
intro: "Enter tank shape, inside dimensions, units, and fill level to get total capacity, liquid volume, and headroom."
keywords: "tank volume calculator, water tank volume calculator, tank capacity calculator, cylindrical tank volume calculator, gallons in a tank calculator"
category: "calculators"
subcategory: "engineering"
icon: "Cylinder"
featured: false
features:
  - "Rectangular and vertical cylindrical tanks"
  - "US gallons and metric litres"
  - "Capacity, liquid volume, and headroom"
  - "Adjustable percentage fill level"
useCases:
  - title: "Estimate storage capacity"
    description: "Calculate theoretical capacity from known inside tank dimensions."
  - title: "Check liquid at a fill percentage"
    description: "Compare current liquid volume with remaining theoretical headroom."
calculationDetails:
  formula: "Rectangular V=L×W×H; vertical cylinder V=π(d÷2)²H; liquid volume=capacity×fill%"
  steps:
    - "Choose the tank shape and measurement system."
    - "Calculate cubic capacity from the inside dimensions."
    - "Multiply capacity by the entered fill percentage."
    - "Convert cubic feet to US gallons or cubic metres to litres."
  rounding: "Displayed gallons and litres round to two decimals; cubic volume displays to three decimals."
  sources:
    - name: "Solve Geometry Applications: Volume and Surface Area"
      url: "https://openstax.org/books/prealgebra/pages/9-6-solve-geometry-applications-volume-and-surface-area"
      publisher: "OpenStax"
      accessedDate: "2026-08-11"
    - name: "Revised Unit Conversion Factors"
      url: "https://www.nist.gov/pml/us-surveyfoot/revised-unit-conversion-factors"
      publisher: "National Institute of Standards and Technology"
      accessedDate: "2026-08-11"
  version: "Rectangular prism and upright full cylinder geometric model"
  lastVerified: "2026-08-11"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Planning estimate"
  assumptions:
    - "Dimensions are internal, use one consistent unit system, and describe a regular rectangular prism or upright circular cylinder."
    - "The fill percentage represents a level-proportional volume for these constant cross-section shapes."
    - "US conversion uses 1 cubic foot = 7.4805194805 US gallons; metric uses 1 cubic metre = 1,000 litres."
  example:
    inputs: "Vertical cylindrical tank, 4 ft inside diameter, 10 ft inside height, 100% full."
    calculation: "π × (4÷2)² × 10 = 125.6637 ft³; × 7.4805194805."
    result: "Capacity ≈ 940.03 US gallons."
limitations:
  - "Use inside dimensions. Wall thickness, domed ends, rounded corners, internal fittings, displacement, freeboard, and unusable residual volume are excluded."
  - "Only rectangular tanks and upright full cylinders are supported; horizontal cylinders and irregular vessels require level-dependent geometry."
  - "Do not use this planning estimate as a certified calibration, custody-transfer measurement, or safe operating limit."
relatedTools:
  - "material-calculator"
  - "concrete-calculator"
  - "linear-feet-calculator"
howToUse:
  - step: 1
    title: "Choose Shape and Units"
    description: "Select a rectangular tank or vertical cylinder and the unit system used by your measurements."
  - step: 2
    title: "Enter Inside Dimensions"
    description: "Measure the internal length, width, height, or diameter required for the selected shape."
  - step: 3
    title: "Set the Fill Level"
    description: "Enter a percentage to compare liquid volume with total capacity and remaining headroom."
faq:
  - question: "How do I calculate tank volume in gallons?"
    answer: "Find the tank's cubic feet from its inside geometry and multiply by about 7.48052 US gallons per cubic foot."
  - question: "Does tank wall thickness affect the result?"
    answer: "Yes. Enter inside dimensions; outside dimensions overstate usable internal capacity."
  - question: "Can this calculate a horizontal cylindrical tank?"
    answer: "No. The cylinder option assumes an upright tank whose fill percentage scales directly with volume."
  - question: "Is the calculated capacity the usable capacity?"
    answer: "Not necessarily. Freeboard, fittings, dead volume, rounded ends, and operating limits can reduce usable capacity."
---
