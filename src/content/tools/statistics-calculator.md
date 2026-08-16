---
seoTitle: "Statistics Calculator - Mean, Median and SD"
title: "Statistics Calculator"
description: "Use this statistics calculator to find mean, median, mode, quartiles, variance, range, and sample or population standard deviation. Paste data now."
intro: "Paste a list of numbers to get center, spread, quartiles, modes, and both sample and population statistics."
keywords: "statistics calculator, mean median mode calculator, standard deviation calculator, statistical calculator, statistics formula calculator, data analysis calculator"
category: "calculators"
subcategory: "education"
icon: "ListOrdered"
featured: false
features: ["Paste up to 10,000 values", "Mean, median, mode, and sum", "Quartiles, IQR, range, and extremes", "Sample and population variance and standard deviation"]
useCases:
  - title: "Summarize an assignment data set"
    description: "Paste measurements, scores, or observations and compare center and spread without manually sorting the list."
  - title: "Check sample versus population formulas"
    description: "See both n and n−1 variance conventions side by side so the selected statistic matches the data context."
calculationDetails:
  formula: "Mean = Σx/n; population variance = Σ(x−μ)²/n; sample variance = Σ(x−x̄)²/(n−1)."
  steps: ["Parse and sort all entered numeric values.", "Calculate count, sum, mean, median, modes, extremes, range, and median-of-halves quartiles.", "Measure squared distance from the mean and divide by n or n−1 for population or sample results."]
  rounding: "Calculations retain full floating-point precision and display summary values with up to eight decimal places."
  sources:
    - name: "Measures of Scale"
      url: "https://itl.nist.gov/div898/handbook/eda/section3/eda356.htm"
      publisher: "NIST/SEMATECH"
      accessedDate: "2026-08-15"
    - name: "Measures of the Center of the Data"
      url: "https://openstax.org/books/introductory-statistics/pages/2-5-measures-of-the-center-of-the-data"
      publisher: "OpenStax"
      accessedDate: "2026-08-15"
  version: "Descriptive statistics with median-of-halves quartiles"
  lastVerified: "2026-08-15"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions: ["Every entered value has equal weight.", "The list contains no missing-value markers.", "For an odd count, Q1 and Q3 use the lower and upper halves with the overall median excluded."]
  example:
    inputs: "2, 4, 4, 6, 8."
    calculation: "Sum = 24 and n = 5, so mean = 4.8; sorted median and mode are 4; population squared-deviation total 20.8 is divided by 5."
    result: "Mean 4.8, median 4, mode 4, population variance 4.16, and sample variance 5.2."
limitations: ["Different software can use different quartile interpolation conventions; this page uses median-of-halves and states that method beside the result.", "Sample standard deviation needs at least two values.", "The tool does not handle weights, frequencies, confidence intervals, missing-data codes, units, or inferential statistical tests."]
relatedTools: ["percentage-calculator", "binomial-distribution-calculator", "sig-fig-calculator", "grade-calculator"]
howToUse:
  - step: 1
    title: "Paste the Data Values"
    description: "Separate numbers with commas, spaces, semicolons, or new lines."
  - step: 2
    title: "Review Center and Spread"
    description: "Compare mean, median, mode, extremes, range, and standard deviations as the list updates."
  - step: 3
    title: "Choose the Correct Convention"
    description: "Use population results for the complete population and sample results when the values are a sample."
faq:
  - question: "Should I use sample or population standard deviation?"
    answer: "Use population standard deviation when the list is the entire population of interest. Use sample standard deviation when the values are a sample used to estimate a broader population."
  - question: "Why might quartiles differ from another calculator?"
    answer: "Several accepted quartile conventions exist. This calculator uses the median of the lower and upper halves and excludes the overall median when the count is odd."
  - question: "What happens when every value appears once?"
    answer: "The calculator reports no repeated mode instead of labeling every value as a mode."
---
