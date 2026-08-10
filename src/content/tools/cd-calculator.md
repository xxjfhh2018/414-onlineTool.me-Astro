---
seoTitle: "CD Calculator - Estimate Deposit Returns | OnlineTool.me"
title: "CD Calculator"
description: "Try this CD calculator to estimate interest earned and maturity value from your deposit, term, annual rate, and compounding frequency."
intro: "Enter a deposit, annual interest rate, term, and compounding frequency to get projected CD interest and maturity value."
keywords: "CD calculator, certificate of deposit calculator, CD interest calculator, maturity value calculator"
category: "calculators"
subcategory: "finance"
icon: "PiggyBank"
featured: false
features:
  - "Includes preset terms from 6 months through 5 years"
  - "Supports daily, monthly, quarterly, and annual compounding"
  - "Separates estimated interest from total maturity value"
  - "Shows the effective annualized return implied by the calculation"
useCases:
  - title: "Compare CD offers"
    description: "Test the same deposit across different terms, rates, and compounding schedules before reviewing official offers."
  - title: "Set a savings target"
    description: "Estimate the opening deposit or term needed to approach a future cash target, without modeling additional contributions."
method:
  title: "How CD Returns Are Calculated"
  description:
    - "The calculator treats the entered percentage as a nominal annual interest rate, converts the selected term from months to years, divides the rate by the number of compounding periods, and applies compound growth to the opening deposit."
    - "Interest earned is the projected maturity value minus the original principal. The displayed effective rate is derived from the total growth over the selected term."
  formula: "Maturity value = Principal × (1 + Rate ÷ Periods)^(Periods × Years)"
  example: "A $10,000 deposit at an entered 4.5% annual rate compounded monthly for 12 months produces a projected maturity value of about $10,459.40 and about $459.40 in interest."
limitations:
  - "The entered percentage is treated as a nominal annual interest rate. If an institution publishes only APY, use its official maturity estimate or convert APY to a nominal rate before comparing compounding schedules."
  - "Taxes, early-withdrawal penalties, fees, and additional deposits are not included."
  - "Rounding and a bank's compounding method can produce a different final amount."
relatedTools:
  - "bac-calculator"
  - "bah-calculator"
howToUse:
  - step: 1
    title: "Enter Deposit Amount"
    description: "Input the amount you plan to deposit into the CD."
  - step: 2
    title: "Set Term Length"
    description: "Choose the duration of the CD (e.g., 6 months, 1 year, 5 years)."
  - step: 3
    title: "Enter the Annual Interest Rate"
    description: "Input the nominal annual interest rate used with the institution's stated compounding frequency."
  - step: 4
    title: "Review the Live Returns"
    description: "The maturity value, interest earned, and effective APY update automatically as you change an input."
faq:
  - question: "What is a Certificate of Deposit (CD)?"
    answer: "A CD is a savings product that earns interest on a lump sum for a fixed period of time."
  - question: "Can I withdraw early from a CD?"
    answer: "Early withdrawal typically incurs a penalty. Check with your bank for specific terms."
  - question: "Is CD interest taxable?"
    answer: "CD interest may be taxable depending on your jurisdiction and account type. Consult current tax guidance or a qualified adviser for your situation."
  - question: "Is APY the same as the annual rate used by this calculator?"
    answer: "No. This calculator combines a nominal annual interest rate with the selected compounding frequency. APY already includes compounding, so entering APY as the nominal rate would overstate the projected return."
---
