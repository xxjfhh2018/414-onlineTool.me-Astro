---
seoTitle: "Rebar Calculator for Slab Grid Length | OnlineTool.me"
title: "Rebar Calculator"
description: "Estimate rebar for a rectangular slab grid from dimensions, spacing, cover, layers, and waste. Get directional bar counts and purchase length."
intro: "Enter slab dimensions, spacing, cover, layers, and waste to estimate rebar counts and total purchase length."
keywords: "rebar calculator, rebar spacing calculator, rebar weight calculator, how much rebar do i need, concrete rebar calculator"
category: "calculators"
subcategory: "engineering"
icon: "Grid3X3"
featured: false
features:
  - "Live rectangular grid estimate"
  - "Directional bar counts for one or two layers"
  - "Adjustable spacing, cover, and waste"
  - "Installed length separated from purchase length"
useCases:
  - title: "Prepare a preliminary slab takeoff"
    description: "Estimate the grid length before checking engineered drawings and supplier stock lengths."
  - title: "Compare grid spacing scenarios"
    description: "See how a different maximum spacing changes the number and length of bars."
calculationDetails:
  formula: "Bars across a direction = ceil(clear perpendicular dimension ÷ maximum spacing) + 1; total length = directional bars × clear run length × layers"
  steps:
    - "Subtract twice the edge cover from slab length and width."
    - "Divide each clear perpendicular dimension by maximum spacing, round intervals up, and add one bar."
    - "Multiply each directional count by its clear run length and number of layers."
    - "Add waste and round purchase length up to the next whole foot."
  rounding: "Bar counts and purchase feet round up; installed length displays to one decimal foot."
  sources:
    - name: "Placing Reinforcing Bars, 10th Edition"
      url: "https://www.crsi.org/wp-content/uploads/CRSI-Placing_Reinforcing_Bars_10th-TOC.pdf"
      publisher: "Concrete Reinforcing Steel Institute"
      accessedDate: "2026-08-11"
    - name: "Frequently Asked Questions: Bar Spacing"
      url: "https://www.concrete.org/frequentlyaskedquestions/faqid/754.aspx"
      publisher: "American Concrete Institute"
      accessedDate: "2026-08-11"
  version: "Rectangular orthogonal grid planning model"
  lastVerified: "2026-08-11"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Planning estimate"
  assumptions:
    - "Bars form an evenly spaced orthogonal grid within the entered edge cover."
    - "The entered spacing is a maximum, so the number of spaces rounds up."
    - "Laps, hooks, chairs, supports, openings, thickened edges, and localized reinforcement are excluded."
  example:
    inputs: "20 ft by 10 ft slab, 18 in maximum spacing, 3 in cover, one layer, 10% waste."
    calculation: "8 lengthwise bars plus 14 widthwise bars require 289 installed ft; 289 × 1.10 = 317.9 ft."
    result: "Purchase estimate = 318 linear ft of rebar."
limitations:
  - "This is a material takeoff estimate, not structural design advice. An engineer or approved drawing must specify bar size, grade, spacing, cover, layers, development, and laps."
  - "The estimate does not convert length into bar count by supplier stock size or calculate weight and cost."
  - "Openings, irregular boundaries, footings, beams, dowels, supports, and local code requirements need separate treatment."
relatedTools:
  - "concrete-calculator"
  - "cinder-block-calculator"
  - "linear-feet-calculator"
howToUse:
  - step: 1
    title: "Enter Slab Dimensions"
    description: "Use the overall rectangular slab length and width in feet."
  - step: 2
    title: "Set the Grid"
    description: "Enter the spacing and edge cover required by the approved project documents."
  - step: 3
    title: "Review the Takeoff"
    description: "Choose layers and waste, then compare installed and rounded purchase length."
faq:
  - question: "How does this rebar calculator determine bar count?"
    answer: "It divides each clear perpendicular dimension by the maximum spacing, rounds the number of spaces up, and adds one boundary bar."
  - question: "Does the result include rebar overlap?"
    answer: "No. Add engineered lap, development, hook, splice, and anchorage requirements separately."
  - question: "Can this calculator choose rebar size and spacing?"
    answer: "No. Those are structural design decisions that must come from approved drawings or a qualified professional."
  - question: "Why is purchase length rounded up?"
    answer: "Material cannot be purchased as a fraction of a foot in this planning model, so the waste-adjusted total rounds upward."
---
