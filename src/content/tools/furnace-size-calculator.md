---
seoTitle: "Furnace Size Calculator - BTU Range"
title: "Furnace Size Calculator"
description: "Estimate a preliminary furnace BTU input range from floor area, winter climate, envelope quality, and AFUE before arranging Manual J sizing."
intro: "Enter floor area, climate, insulation quality, and AFUE to get a preliminary furnace input range and output-load estimate."
keywords: "furnace size calculator, furnace btu calculator, what size furnace do i need, heating btu calculator"
category: "calculators"
subcategory: "engineering"
icon: "Flame"
featured: false
features: ["Broad preliminary BTU/h range", "Climate and envelope adjustments", "AFUE input-to-output conversion", "Prominent Manual J and Manual S limitation"]
useCases:
  - title: "Prepare for an HVAC conversation"
    description: "Understand the order of magnitude before requesting a room-by-room heating-load calculation."
  - title: "See why AFUE matters"
    description: "Compare required furnace input with the estimated delivered output load."
calculationDetails:
  formula: "Estimated output load = area × climate rate × envelope factor; input capacity = output load ÷ AFUE"
  steps: ["Apply a transparent 25, 35, 45, or 55 BTU/h per square-foot climate rate.", "Multiply by 0.8, 1.0, or 1.2 for envelope quality.", "Divide output load by AFUE as a decimal.", "Display a broad ±15% preliminary input range."]
  rounding: "BTU/h outputs display to the nearest 1,000 because this model is intentionally approximate."
  sources:
    - name: "HVAC Proper Sizing of HVAC Systems"
      url: "https://bsesc.energy.gov/energy-basics/hvac-proper-sizing-hvac-systems"
      publisher: "U.S. Department of Energy Building Science Education"
      accessedDate: "2026-08-12"
    - name: "Strategy Guideline: HVAC Equipment Sizing"
      url: "https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/strategy_guide_hvac_sizing.pdf"
      publisher: "U.S. Department of Energy"
      accessedDate: "2026-08-12"
  version: "OnlineTool.me preliminary rule-of-thumb model, August 2026"
  lastVerified: "2026-08-12"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Planning estimate"
  assumptions: ["Conditioned floor area is used as a coarse proxy for heat loss.", "Climate and envelope selections are broad user judgments.", "AFUE converts estimated delivered output into nominal furnace input."]
  example:
    inputs: "2,000 sq ft, moderate winter, average envelope, 90% AFUE."
    calculation: "2,000 × 35 × 1.0 = 70,000 BTU/h output; ÷ 0.90 = 77,778 BTU/h input."
    result: "Preliminary input range ≈ 66,000–89,000 BTU/h."
limitations: ["Do not purchase or specify equipment from this result; it is not an ACCA Manual J load calculation or Manual S selection.", "Actual loads depend on design temperatures, surfaces, insulation, infiltration, ducts, windows, orientation, ventilation, and room-by-room conditions.", "Oversizing can increase cost and cycling; a qualified HVAC professional should calculate load and select equipment."]
relatedTools: ["watts-to-amps-calculator", "material-calculator", "tank-volume-calculator"]
howToUse:
  - step: 1
    title: "Enter Conditioned Area"
    description: "Use the floor area actually served by the proposed heating system."
  - step: 2
    title: "Choose Broad Conditions"
    description: "Select winter severity, envelope quality, and the furnace AFUE."
  - step: 3
    title: "Use the Result Only for Planning"
    description: "Take the rough range to an HVAC professional and request Manual J and Manual S work."
faq:
  - question: "How many BTUs should a furnace have per square foot?"
    answer: "A single number per square foot is only a rough shortcut. This tool exposes its broad rates, while professional sizing calculates actual heat loss."
  - question: "What is the difference between furnace input and output BTU?"
    answer: "Input is fuel energy entering the furnace; output is estimated heat delivered after accounting for AFUE."
  - question: "Why can an oversized furnace be a problem?"
    answer: "Oversizing can increase cost and cause frequent cycling that may reduce comfort and efficiency."
  - question: "Is this a Manual J calculator?"
    answer: "No. Manual J requires detailed building and design-condition inputs that this preliminary tool does not collect."
---
