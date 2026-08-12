---
seoTitle: "Brick Calculator for Walls and Waste | OnlineTool.me"
title: "Brick Calculator"
description: "Calculate bricks for a wall from dimensions, openings, brick face size, mortar joint, and waste. Get net area and a rounded purchase total."
intro: "Enter wall dimensions, openings, brick face size, mortar joint, and waste to get the bricks to purchase."
keywords: "calculator bricks, brick calculator, how many bricks do i need, brick wall calculator, bricks per square foot calculator"
category: "calculators"
subcategory: "engineering"
icon: "BrickWall"
featured: false
features: ["Live wall-area and brick estimate", "Door and window deductions", "Editable face size and mortar joint", "Waste-adjusted whole-brick purchase total"]
useCases:
  - title: "Estimate a brick veneer wall"
    description: "Convert net rectangular wall area into a preliminary unit count."
  - title: "Compare brick modules"
    description: "Change face dimensions and mortar joint to match a supplier’s specified product."
calculationDetails:
  formula: "Bricks = ceil(((wall area − openings) ÷ ((brick length + joint) × (brick height + joint))) × (1 + waste%))"
  steps: ["Calculate gross wall area and subtract openings.", "Add mortar joint to the brick face dimensions to form the constructed module.", "Divide net area by module face area.", "Add waste and round up to a whole brick."]
  rounding: "Purchase quantity rounds up; areas and density display to two decimals."
  sources:
    - name: "Technical Note 10: Dimensioning and Estimating Brick Masonry"
      url: "https://www.gobrick.com/media/file/10-dimensioning-and-estimating-brick-masonry.pdf"
      publisher: "Brick Industry Association"
      accessedDate: "2026-08-12"
  version: "US modular brick face planning model"
  lastVerified: "2026-08-12"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Planning estimate"
  assumptions: ["Brick is laid as a stretcher in a single visible face.", "Default specified face is 7⅝ × 2¼ inches with a ⅜-inch mortar joint.", "Waste represents cuts, breakage, and handling only."]
  example:
    inputs: "20 × 8 ft wall, no openings, default modular face and joint, 5% waste."
    calculation: "The constructed module is 8 × 2⅝ in, or 6.857 bricks/sq ft; 160 × 6.857 × 1.05."
    result: "Purchase estimate = 1,152 bricks."
limitations: ["Confirm specified brick dimensions, joint thickness, bond pattern, corners, returns, and supplier packaging.", "Headers, soldiers, arches, multiple wythes, structural design, ties, lintels, mortar, and labor are excluded.", "Irregular layouts should be separated into measured wall sections."]
relatedTools: ["cinder-block-calculator", "rebar-calculator", "material-calculator", "linear-feet-calculator"]
howToUse:
  - step: 1
    title: "Measure the Wall"
    description: "Enter gross wall length and height, then total door and window areas."
  - step: 2
    title: "Match the Brick Module"
    description: "Use the supplier’s face length, face height, and intended mortar joint."
  - step: 3
    title: "Review the Purchase Total"
    description: "Select waste and check the rounded quantity against layout and supplier packaging."
faq:
  - question: "How many modular bricks are in one square foot?"
    answer: "With a 7⅝-by-2¼-inch face and ⅜-inch joint, the constructed module is about 6.86 bricks per square foot."
  - question: "Does the calculator include mortar joints?"
    answer: "Yes. It adds the entered joint to brick face length and height before calculating coverage."
  - question: "Does it subtract windows and doors?"
    answer: "Yes. Enter their combined square footage as openings."
  - question: "How much brick waste should I add?"
    answer: "Five percent is a planning default, but bond pattern, cuts, handling, breakage, matching needs, and supplier advice may justify another value."
---
