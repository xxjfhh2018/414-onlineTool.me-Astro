---
seoTitle: "eDPI Calculator - Effective Mouse Sensitivity"
title: "eDPI Calculator"
description: "Use this eDPI calculator to multiply mouse DPI by in-game sensitivity and find an equivalent sensitivity for another DPI setting."
intro: "Enter mouse DPI and in-game sensitivity to get eDPI and an equivalent sensitivity at an optional target DPI."
keywords: "edpi calculator, effective dpi calculator, mouse sensitivity calculator, dpi sensitivity converter"
category: "calculators"
subcategory: "games"
icon: "Gamepad2"
featured: false
features: ["Instant DPI-times-sensitivity result", "Equivalent target-DPI sensitivity", "Zero-sensitivity boundary support", "Same-game comparison warning"]
useCases:
  - title: "Change mouse DPI without changing eDPI"
    description: "Calculate the in-game sensitivity needed to preserve the same numeric eDPI at another DPI."
  - title: "Compare two settings in one game"
    description: "Use one number to check whether different DPI-sensitivity pairs produce the same effective value."
calculationDetails:
  formula: "eDPI = mouse DPI × in-game sensitivity; target sensitivity = eDPI ÷ target DPI"
  steps: ["Multiply mouse DPI by the game sensitivity value.", "If target DPI is supplied, divide eDPI by that DPI."]
  rounding: "Display eDPI and equivalent sensitivity with up to four decimals."
  sources:
    - name: "Why eDPI Is Important in FPS Games"
      url: "https://zowie.benq.com/en-au/knowledge/mouse/edpi-calculation-method-for-fps-games.html"
      publisher: "BenQ ZOWIE"
      accessedDate: "2026-08-14"
  version: "DPI × in-game sensitivity formula"
  lastVerified: "2026-08-14"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions: ["DPI and sensitivity belong to the same game and sensitivity scale.", "The game applies the entered sensitivity as the relevant multiplier.", "ADS, scope, yaw, FOV, acceleration, operating-system scaling, and raw-input differences are excluded."]
  example:
    inputs: "800 DPI, 0.5 in-game sensitivity, target 1600 DPI."
    calculation: "800 × 0.5 = 400 eDPI; 400 ÷ 1600 = 0.25."
    result: "400 eDPI and 0.25 equivalent sensitivity at 1600 DPI."
limitations: ["eDPI is most useful within the same game; different games use different sensitivity scales and yaw constants.", "Matching eDPI does not guarantee identical ADS feel, field-of-view behavior, acceleration, or centimetres per 360°.", "Comfort and control are personal; there is no universal pass/fail eDPI."]
relatedTools: ["palworld-breeding-calculator", "dynasty-trade-calculator", "pomodoro-timer"]
howToUse:
  - step: 1
    title: "Enter Mouse DPI"
    description: "Use the active hardware DPI from your mouse software."
  - step: 2
    title: "Enter Game Sensitivity"
    description: "Use the numeric hip-fire or base sensitivity from the same game."
  - step: 3
    title: "Compare an Optional Target DPI"
    description: "Enter another DPI to calculate the numeric sensitivity that preserves the same eDPI."
faq:
  - question: "How do I calculate eDPI?"
    answer: "Multiply mouse DPI by the in-game sensitivity value. For example, 800 DPI at 0.5 sensitivity equals 400 eDPI."
  - question: "Can I compare eDPI across different games?"
    answer: "Not reliably by eDPI alone because games use different sensitivity scales, yaw values, FOV behavior, and ADS multipliers."
  - question: "Does the same eDPI always feel identical?"
    answer: "No. Hardware, polling, acceleration, input method, field of view, and game-specific scaling can change the feel."
---
