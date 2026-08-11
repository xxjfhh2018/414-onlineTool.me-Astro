---
seoTitle: "Partial Fraction Decomposition Calculator | Steps"
title: "Partial Fraction Decomposition Calculator"
description: "Decompose a linear-over-quadratic rational expression into real partial fractions. Enter coefficients to identify factors and verify the result."
intro: "Enter a linear numerator and quadratic denominator to get the real partial-fraction form and factor type."
keywords: "partial fraction decomposition calculator, partial fractions calculator, partial fraction calculator, decompose partial fractions, partial fraction expansion calculator"
category: "calculators"
subcategory: "education"
icon: "Sigma"
featured: false
features:
  - "Distinct and repeated real quadratic factors"
  - "Immediate coefficient-based decomposition"
  - "Irreducible-real result when no real roots exist"
  - "Visible scope and algebra verification anchor"
useCases:
  - title: "Check algebra homework"
    description: "Compare a hand decomposition for a proper linear-over-quadratic expression."
  - title: "Prepare an integral"
    description: "Rewrite a supported rational expression into simpler real fractions before integrating."
calculationDetails:
  formula: "For distinct roots r₁ and r₂: (mx+n)/(a(x−r₁)(x−r₂)) = A/(x−r₁)+B/(x−r₂), where A=(mr₁+n)/(a(r₁−r₂)) and B=(mr₂+n)/(a(r₂−r₁))"
  steps:
    - "Calculate the quadratic discriminant b² − 4ac."
    - "Use two linear terms for distinct real roots or first- and second-power terms for a repeated root."
    - "Evaluate the numerator at each root to solve the decomposition coefficients."
    - "Report an irreducible quadratic when the discriminant is negative over the real numbers."
  rounding: "Displayed coefficients use up to eight significant digits; calculations retain JavaScript floating-point precision."
  sources:
    - name: "Partial Fractions"
      url: "https://openstax.org/books/college-algebra/pages/7-4-partial-fractions"
      publisher: "OpenStax"
      accessedDate: "2026-08-11"
  version: "Proper degree-1 numerator over degree-2 denominator, real-number decomposition"
  lastVerified: "2026-08-11"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions:
    - "The denominator has a nonzero x-squared coefficient."
    - "The numerator degree is lower than the denominator degree, so polynomial division is unnecessary."
    - "The requested decomposition is over the real numbers."
  example:
    inputs: "x / (x² − 5x + 6)."
    calculation: "The roots are 3 and 2; cover-up substitution gives coefficients 3 and −2."
    result: "3/(x − 3) − 2/(x − 2)."
limitations:
  - "This focused calculator supports only (mx+n)/(ax²+bx+c); it does not accept higher-degree polynomials or an improper rational expression."
  - "A negative discriminant is reported as irreducible over the reals rather than decomposed with complex roots."
  - "Decimal output may be a rounded representation of an irrational coefficient or root."
relatedTools:
  - "ti-84-calculator"
  - "grade-calculator"
  - "gpa-calculator"
howToUse:
  - step: 1
    title: "Enter the Numerator"
    description: "Provide m and n for the linear numerator mx+n."
  - step: 2
    title: "Enter the Denominator"
    description: "Provide a, b, and c for ax²+bx+c, with a not equal to zero."
  - step: 3
    title: "Check the Decomposition"
    description: "Review the real factor type and combine the displayed terms to verify the original expression."
faq:
  - question: "What expressions does this calculator support?"
    answer: "It supports a proper linear numerator divided by a quadratic denominator with real numeric coefficients."
  - question: "What happens when the quadratic has a repeated root?"
    answer: "The result uses terms with both the first and second powers of the repeated linear factor."
  - question: "Why does the result say irreducible over the reals?"
    answer: "The denominator has a negative discriminant, so it has no real linear factors."
  - question: "Can it decompose an improper fraction?"
    answer: "No. Perform polynomial division first so the remaining numerator degree is lower than the denominator degree."
---
