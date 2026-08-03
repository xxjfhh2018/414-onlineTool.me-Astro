---
seoTitle: "CD Calculator - Estimate Deposit Returns | OnlineTool.me"
title: "CD Calculator"
description: "Try this CD calculator to estimate interest earned and maturity value from your deposit, term, annual rate, and compounding frequency."
intro: "Project a certificate of deposit balance from the opening deposit, term, entered annual rate, and compounding schedule."
keywords: "CD calculator, certificate of deposit calculator, CD interest calculator, maturity value calculator"
category: "calculators"
subcategory: "finance"
icon: "PiggyBank"
featured: false
whatIs:
  - "A certificate of deposit is a bank deposit held for a defined term, usually in exchange for a stated return. This CD calculator projects the ending balance and separates the original deposit from estimated interest."
  - "The current formula compounds the entered annual percentage at the selected frequency. Although the input is labeled APY, this implementation treats it as a nominal annual rate, so compare the result carefully with a bank's official disclosure."
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
    - "The calculator converts the selected term from months to years, divides the annual rate by the number of compounding periods, and applies compound growth to the opening deposit."
    - "Interest earned is the projected maturity value minus the original principal. The displayed effective rate is derived from the total growth over the selected term."
  formula: "Maturity value = Principal × (1 + Rate ÷ Periods)^(Periods × Years)"
  example: "A $10,000 deposit at an entered 4.5% annual rate compounded monthly for 12 months produces a projected maturity value of about $10,459.40 and about $459.40 in interest."
limitations:
  - "The tool treats the entered percentage as a nominal annual rate even though the field is labeled APY."
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
    title: "Enter APY"
    description: "Input the annual percentage yield offered by your bank."
  - step: 4
    title: "Calculate Returns"
    description: "See your total interest earned and maturity value instantly."
faq:
  - question: "What is a Certificate of Deposit (CD)?"
    answer: "A CD is a savings product that earns interest on a lump sum for a fixed period of time."
  - question: "Can I withdraw early from a CD?"
    answer: "Early withdrawal typically incurs a penalty. Check with your bank for specific terms."
  - question: "Is CD interest taxable?"
    answer: "CD interest may be taxable depending on your jurisdiction and account type. Consult current tax guidance or a qualified adviser for your situation."
  - question: "Is APY the same as the rate used by this calculator?"
    answer: "Not exactly. The current input is labeled APY, but the implemented formula treats the percentage as a nominal annual rate combined with the selected compounding frequency."
---
