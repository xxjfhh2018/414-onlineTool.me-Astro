---
seoTitle: "Hydrates Calculator - Percent Water & Molar Mass"
title: "Hydrates Calculator"
description: "Use this hydrates calculator to find hydrate molar mass, theoretical percent water, and optional sample water mass from a salt formula's molar mass."
intro: "Enter anhydrous molar mass and the number of water molecules to get hydrate molar mass and theoretical percent water."
keywords: "hydrates calculator, hydrate calculator chemistry, percent water in hydrate calculator, theoretical percentage of water in hydrate, chemistry hydrate calculator"
category: "calculators"
subcategory: "education"
icon: "Calculator"
featured: false
features: ["Hydrate molar mass", "Theoretical percent water", "Optional sample composition", "Transparent 18.015 g/mol water constant"]
useCases:
  - title: "Check a hydrate formula"
    description: "Calculate the expected water percentage for an anhydrous salt with n waters of hydration."
  - title: "Plan a chemistry sample calculation"
    description: "Estimate grams of water and anhydrous salt in a theoretical sample."
calculationDetails:
  formula: "M(hydrate) = M(anhydrous) + n × 18.015; water % = n × 18.015 ÷ M(hydrate) × 100."
  steps: ["Multiply the hydration number by 18.015 g/mol.", "Add that water mass to the anhydrous molar mass.", "Divide the water contribution by the hydrate molar mass and multiply by 100."]
  rounding: "Calculations retain floating-point precision; results display up to three decimal places."
  sources:
    - name: "Percent of Water in a Hydrate"
      url: "https://chem.libretexts.org/Bookshelves/Introductory_Chemistry/Book%3A_Introductory_Chemistry_%28CK-12%29/10%3A_The_Mole/10.10%3A_Percent_of_Water_in_a_Hydrate"
      publisher: "Chemistry LibreTexts"
      accessedDate: "2026-08-18"
  version: "Water molar mass fixed at 18.015 g/mol"
  lastVerified: "2026-08-18"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions: ["The entered anhydrous molar mass is correct for the compound.", "The hydrate has an integer number of water molecules per formula unit.", "The theoretical sample contains only the named hydrate."]
  example:
    inputs: "CuSO4 molar mass 159.609 g/mol and n = 5."
    calculation: "159.609 + 5 × 18.015 = 249.684 g/mol; 90.075 ÷ 249.684 × 100."
    result: "Hydrate molar mass 249.684 g/mol and about 36.075% water."
limitations: ["The tool does not parse chemical formulas or look up atomic weights.", "Experimental percent water may differ because of incomplete heating, decomposition, rehydration, or impurities.", "Use the molar mass convention required by your course or laboratory."
]
relatedTools: ["percentage-calculator", "sig-fig-calculator", "statistics-calculator"]
howToUse:
  - step: 1
    title: "Enter the Anhydrous Molar Mass"
    description: "Calculate or copy the salt molar mass without waters of hydration."
  - step: 2
    title: "Enter the Hydration Number"
    description: "For a formula ending in ·nH2O, enter n as a whole number."
  - step: 3
    title: "Review Composition"
    description: "Read hydrate molar mass and percent water; add sample mass for theoretical gram amounts."
faq:
  - question: "How do I calculate percent water in a hydrate?"
    answer: "Divide the molar mass contributed by water by the full hydrate molar mass, then multiply by 100."
  - question: "What does n mean in a hydrate formula?"
    answer: "It is the number of water molecules associated with each formula unit of the anhydrous compound."
  - question: "Why might my lab result differ from the theoretical result?"
    answer: "Incomplete dehydration, decomposition, moisture uptake, sample impurities, or measurement uncertainty can change an experimental percentage."
---
