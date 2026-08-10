---
seoTitle: "Watts to Amps Calculator – DC & AC | OnlineTool.me"
title: "Watts to Amps Calculator"
description: "Convert watts to amps for DC, single-phase AC, or balanced three-phase AC. Enter power, voltage, and power factor for a live current calculation."
intro: "Enter circuit type, real power, voltage, and AC power factor to calculate current in amps."
keywords: "watts to amps calculator, convert watts to amps, watt to amp calculator, three phase amps calculator, ac current calculator"
category: "calculators"
subcategory: "engineering"
icon: "Calculator"
featured: false
features:
  - "DC, single-phase AC, and balanced three-phase AC modes"
  - "Live current calculation with AC power factor"
  - "Visible circuit assumptions and applied formula"
  - "Inline validation for zero voltage and invalid power factor"
useCases:
  - title: "Check equipment operating current"
    description: "Convert known real power and voltage into an approximate or exact formula-based current for the selected circuit model."
  - title: "Compare AC power-factor scenarios"
    description: "See how a lower power factor increases current for the same real power and voltage."
calculationDetails:
  formula: "DC: I=P÷V; single-phase AC: I=P÷(V×PF); balanced three-phase AC: I=P÷(√3×Vline×PF)"
  steps:
    - "Select DC, single-phase AC, or balanced three-phase AC."
    - "Enter real power in watts and operating voltage in volts."
    - "For AC, enter power factor from greater than 0 through 1."
    - "Divide real power by the voltage, power-factor, and phase terms that apply."
  rounding: "Current displays to two decimals at 1 A or more and three decimals below 1 A."
  sources:
    - name: "Electrical Glossary"
      url: "https://www.fluke.com/en/learn/blog/electrical/electrical-glossary"
      publisher: "Fluke"
      accessedDate: "2026-08-10"
    - name: "How to Size Motors for Load"
      url: "https://www.fluke.com/en-us/learn/blog/power-quality/horsepower-motor-efficient-installation"
      publisher: "Fluke"
      accessedDate: "2026-08-10"
  version: "Standard real-power relationships"
  lastVerified: "2026-08-10"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions:
    - "Watts mean real power rather than apparent power in volt-amperes."
    - "Three-phase voltage is line-to-line and the load is balanced."
    - "The entered power factor represents the operating condition."
  example:
    inputs: "1,200 W DC at 120 V."
    calculation: "1,200 ÷ 120 = 10."
    result: "Current = 10 A."
limitations:
  - "Use this for conversion and preliminary checking, then compare the result with equipment nameplate current and manufacturer documentation."
  - "Do not use the result alone to size conductors, breakers, fuses, disconnects, generators, or other safety-critical electrical equipment."
  - "Real systems may require efficiency, harmonics, starting current, duty cycle, imbalance, or local code requirements not modeled here."
relatedTools:
  - "material-calculator"
  - "cinder-block-calculator"
  - "ti-84-calculator"
howToUse:
  - step: 1
    title: "Select the Circuit Type"
    description: "Choose DC, single-phase AC, or balanced three-phase AC."
  - step: 2
    title: "Enter Power and Voltage"
    description: "Use real watts and the operating voltage; for three-phase AC, use line-to-line voltage."
  - step: 3
    title: "Add AC Power Factor"
    description: "For AC loads, enter the operating power factor and compare the calculated amps with rated data."
faq:
  - question: "How do I convert watts to amps for DC?"
    answer: "Divide watts by volts: amps equal watts divided by volts."
  - question: "How do I convert watts to amps for single-phase AC?"
    answer: "Divide real watts by volts multiplied by power factor."
  - question: "How do I calculate amps for three-phase power?"
    answer: "For a balanced system using line-to-line voltage, divide real watts by the square root of three, voltage, and power factor."
  - question: "Can I size a breaker from this result?"
    answer: "No. Breaker and conductor sizing depends on electrical codes, continuous-load rules, starting current, temperature, installation method, and equipment requirements."
---
