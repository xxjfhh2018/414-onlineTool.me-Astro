---
seoTitle: "Sig Fig Calculator - Round Significant Figures"
title: "Sig Fig Calculator"
description: "Use this sig fig calculator to round decimals or scientific notation to 1–15 significant figures with NIST half-even rules. Try a value now."
intro: "Enter a decimal or scientific-notation value and choose the precision to get a rounded result with significant figures preserved."
keywords: "sig fig calculator, significant figures calculator, sig figs calculator, significant figure calculator, rounding significant figures calculator"
category: "calculators"
subcategory: "education"
icon: "Calculator"
featured: false
features: ["Exact decimal-string rounding", "1–15 significant figures", "NIST half-even tie handling", "Decimal and scientific-notation output"]
useCases:
  - title: "Report a measured value"
    description: "Round a laboratory or engineering value to the precision required by an assignment, report, or measurement method."
  - title: "Check a halfway rounding case"
    description: "See how an exact trailing 5 behaves under half-even rounding instead of assuming every 5 rounds upward."
calculationDetails:
  formula: "Keep the requested leading significant digits; if the discarded portion is exactly halfway, make the final retained digit even."
  steps: ["Locate the first nonzero digit; leading zeros are placeholders, not significant figures.", "Keep the requested number of significant digits.", "Inspect the discarded digits and apply half-even rounding, then rebuild decimal and scientific notation."]
  rounding: "Exact halfway cases follow NIST half-even rounding. The calculator supports 1–15 significant figures."
  sources:
    - name: "NIST Guide to the SI, Chapter 7"
      url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values"
      publisher: "National Institute of Standards and Technology"
      accessedDate: "2026-08-15"
    - name: "NIST SP 811 Appendix B"
      url: "https://physics.nist.gov/cuu/pdf/sp811.pdf"
      publisher: "National Institute of Standards and Technology"
      accessedDate: "2026-08-15"
  version: "NIST half-even rounding"
  lastVerified: "2026-08-15"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions: ["The digits entered by the user reflect the intended source value and precision.", "Scientific notation uses base 10.", "The tool rounds one number; it does not propagate measurement uncertainty through a longer calculation."]
  example:
    inputs: "Value 0.004565 and 3 significant figures."
    calculation: "Leading zeros are ignored; keep 456 and inspect the exact trailing 5. Because the retained 6 is even, it stays unchanged."
    result: "0.00456, or 4.56 × 10^-3."
limitations: ["The calculator does not decide how many significant figures a scientific result should use.", "A whole number such as 1200 can be visually ambiguous in plain notation; use the scientific-notation result to show intended trailing-zero significance.", "This is a rounding aid, not an uncertainty or error-propagation calculator."]
relatedTools: ["percentage-calculator", "statistics-calculator", "linear-interpolation-calculator"]
howToUse:
  - step: 1
    title: "Enter the Number"
    description: "Use an ordinary decimal or notation such as 1.2345e6."
  - step: 2
    title: "Choose Significant Figures"
    description: "Select a whole-number precision from 1 through 15."
  - step: 3
    title: "Review Both Formats"
    description: "Compare the rounded decimal with scientific notation, which makes retained trailing zeros explicit."
faq:
  - question: "Do leading zeros count as significant figures?"
    answer: "No. In 0.00456, the zeros before 4 only locate the decimal place, so the value has three significant figures."
  - question: "Why does 12.25 round to 12.2 at three significant figures?"
    answer: "The discarded portion is exactly 5 with no later nonzero digits. Half-even rounding keeps the final retained digit even, so 2 stays 2."
  - question: "Do zeros after a decimal count?"
    answer: "Trailing zeros after a decimal can be significant. For example, 1.200 communicates four significant figures."
---
