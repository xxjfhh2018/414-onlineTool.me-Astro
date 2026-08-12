---
seoTitle: "Cross Stitch Calculator for Fabric Size | OnlineTool.me"
title: "Cross Stitch Calculator"
description: "Calculate cross stitch design and fabric cut sizes from chart stitches, fabric count, stitching method, and finishing allowance."
intro: "Enter pattern stitches, fabric count, and finishing allowance to get the finished design and fabric cut size."
keywords: "cross stitch calculator, cross stitch fabric calculator, cross stitch size calculator, fabric count calculator"
category: "calculators"
subcategory: "everyday"
icon: "Grid2X2"
featured: false
features: ["Live finished-design dimensions", "Fabric cut size with allowance on every side", "Stitch-over-one and stitch-over-two support", "Total chart-square count"]
useCases:
  - title: "Choose fabric before starting"
    description: "Compare 14-count Aida with higher-count fabric and see how the finished design changes."
  - title: "Prepare fabric for finishing"
    description: "Add a per-side margin for a hoop, frame, hem, or other finishing method."
calculationDetails:
  formula: "Design inches = chart stitches × threads stitched over ÷ fabric count; cut size = design size + 2 × allowance"
  steps: ["Divide each chart dimension by stitches per inch, adjusting for stitching over two threads.", "Add the selected allowance to both sides of each dimension.", "Multiply chart width by chart height for total chart squares."]
  rounding: "Dimensions display to two decimal inches; chart squares remain whole."
  sources:
    - name: "DMC Stitch Count Help"
      url: "https://www.dmc.com/US/en/stitch-your-photos/help_and_advice"
      publisher: "DMC"
      accessedDate: "2026-08-12"
  version: "Fabric-count geometry verified August 2026"
  lastVerified: "2026-08-12"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions: ["Fabric count means threads or stitch positions per inch.", "Stitching over two threads doubles stitch spacing.", "The same allowance is added to all four sides."]
  example:
    inputs: "140 × 98 stitches on 14-count Aida, over one, with 3 inches per side."
    calculation: "140 ÷ 14 = 10 in and 98 ÷ 14 = 7 in; add 6 in to each dimension."
    result: "Design = 10 × 7 in; fabric cut = 16 × 13 in."
limitations: ["Confirm whether an evenweave pattern is stitched over one or two fabric threads.", "Finishing methods may need a different allowance than the 3-inch default.", "The chart-square count does not estimate floss because color coverage and strand count are unknown."]
relatedTools: ["linear-feet-calculator", "material-calculator", "pomodoro-timer"]
howToUse:
  - step: 1
    title: "Enter the Chart Size"
    description: "Copy the pattern width and height in stitches."
  - step: 2
    title: "Choose Fabric Settings"
    description: "Enter fabric count and whether each cross spans one or two threads."
  - step: 3
    title: "Review Design and Cut Size"
    description: "Use the live design size and ensure the selected finishing allowance is sufficient."
faq:
  - question: "How do I calculate cross stitch size?"
    answer: "Divide chart stitches by fabric count when stitching over one; multiply stitches by two before dividing when stitching over two threads."
  - question: "What does 14-count Aida mean?"
    answer: "It provides 14 stitch positions per inch, so a 140-stitch-wide design finishes about 10 inches wide."
  - question: "How much fabric should I add around a cross stitch?"
    answer: "Three inches per side is a practical planning default, but your frame, hoop, hem, and finishing method control the final allowance."
  - question: "Does this estimate embroidery floss?"
    answer: "No. Floss use depends on color coverage, strand count, stitch type, tension, and waste."
---
