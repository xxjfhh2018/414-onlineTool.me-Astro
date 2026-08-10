---
seoTitle: "Swim Time Converter: SCY, SCM & LCM | OnlineTool.me"
title: "Swim Time Converter"
description: "Use this swim time converter to estimate SCY, SCM, and LCM equivalents, then review pace and even-split times for common swimming events."
intro: "Enter an event, pool course, and swim time to get estimated SCY, SCM, and LCM equivalents with pace and split estimates."
keywords: "swim time converter, swimming time converter, SCY to LCM converter, LCM to SCY converter, SCM to SCY converter, yards to meters swim time conversion, swimming conversion calculator, swim pace calculator, swim split calculator, swimming time standards converter"
category: "sports"
icon: "ArrowLeftRight"
featured: true
features:
  - "Converts common individual events among SCY, SCM, and LCM courses"
  - "Uses event-specific NCAA sample factors instead of a simple yards-to-meters distance ratio"
  - "Applies separate men's and women's factors when an LCM course is involved"
  - "Shows average pace per 50 in the target course"
  - "Builds a scrollable table of even-pace split and cumulative times"
useCases:
  - title: "Compare performances across pool courses"
    description: "Estimate how an SCY performance compares with an SCM or LCM swim when reviewing results from different seasons and facilities."
  - title: "Set a practice target"
    description: "Convert a goal time into the course used by your current pool, then use the pace and split estimates during training."
  - title: "Review meet results"
    description: "Create a consistent planning comparison for common individual events without treating the converted value as an official entry time."
calculationDetails:
  formula: "Target time = source time × source-to-SCY factor ÷ target-to-SCY factor"
  steps:
    - "The calculator converts the entered result to an SCY-equivalent time with the NCAA sample factor for the selected course, event, and factor table."
    - "It divides that SCY-equivalent time by the target course factor. SCM-to-LCM and LCM-to-SCM estimates therefore use SCY as the common intermediate course."
    - "Pace and split estimates divide the converted total time evenly across the selected target distance."
  rounding: "The converted result drops units smaller than one hundredth of a second, following the NCAA sample process. Pace and split displays are rounded to hundredths."
  sources:
    - name: "2025-26 and 2026-27 NCAA Swimming and Diving Rules Book"
      url: "https://ncaaorg.s3.amazonaws.com/championships/sports/swimdive/rules/PRXSW_RulesBook.pdf"
      publisher: "NCAA"
      accessedDate: "2026-08-10"
    - name: "World Aquatics Swimming Documents"
      url: "https://www.worldaquatics.com/swimming/documents"
      publisher: "World Aquatics"
      accessedDate: "2026-08-10"
  version: "NCAA rules book updated August 5, 2026"
  applicableDate: "2025-26 and 2026-27 NCAA rules cycle"
  lastVerified: "2026-08-10"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Estimated equivalent"
  assumptions:
    - "Reverse conversions invert the published metric-to-SCY factors; direct SCM-to-LCM conversions combine two factors through SCY."
    - "The selected men's or women's table affects conversions involving LCM but not conversions limited to SCY and SCM."
    - "Split estimates assume perfectly even pacing and do not model starts, turns, fatigue, underwater distance, or stroke strategy."
  example:
    inputs: "Men's 200 breaststroke, 2:16.71 in LCM, converted to SCY."
    calculation: "136.71 seconds × the NCAA men's 200 breaststroke LCM-to-SCY sample factor of 0.858 = 117.29718 seconds; units below hundredths are dropped."
    result: "The estimated SCY equivalent is 1:57.29, matching the worked example in the NCAA rules book."
limitations:
  - "NCAA labels the rules-book tables as sample conversions and warns that championship qualification may use different tables. Check the applicable meet or governing-body instructions before submitting an entry."
  - "This tool does not determine whether a swimmer meets a qualifying, age-group, school, club, national, or championship time standard."
  - "Only supported common individual events are shown. Unsupported races are not approximated with a generic length multiplier."
  - "Pool configuration, number of turns, starts, walls, underwater phases, altitude, timing systems, and individual strengths can make an actual performance differ from the estimate."
relatedTools:
  - "tally-counter"
  - "score-board"
howToUse:
  - step: 1
    title: "Select the Swimming Event"
    description: "Choose the stroke and distance so the calculator can use the corresponding course factors."
  - step: 2
    title: "Choose the Factor Table and Courses"
    description: "Select men's or women's factors, then choose the source and target pool courses. Use the swap button to reverse them."
  - step: 3
    title: "Enter the Swim Time"
    description: "Type seconds or minutes and seconds, such as 58.42 or 1:02.35. The result updates automatically."
  - step: 4
    title: "Review Pace and Even Splits"
    description: "Use the estimated equivalent, average pace, and split table for planning while checking official meet rules separately."
faq:
  - question: "How do I convert SCY to LCM swimming times?"
    answer: "Select the event, choose SCY as the source and LCM as the target, select the applicable men's or women's NCAA factor table, and enter the SCY time. The tool inverts the published LCM-to-SCY sample factor to estimate the LCM equivalent."
  - question: "Can I convert LCM to SCY with one yards-to-meters multiplier?"
    answer: "A race-time conversion should not use only the physical yard-to-meter ratio. Pool length changes the number of turns, walls, and underwater phases, so this calculator uses event-specific sample factors."
  - question: "What is the difference between SCY, SCM, and LCM?"
    answer: "SCY uses a 25-yard pool, SCM uses a 25-meter pool, and LCM uses a 50-meter pool. The event distance and number of lengths can therefore differ even when the races are treated as corresponding events."
  - question: "Are these converted swimming times official?"
    answer: "No. They are planning estimates based on NCAA sample conversion factors. Meet hosts, conferences, teams, and governing bodies may prescribe different tables or accept only actual times from specific courses."
  - question: "Does the swim split calculator predict my real race splits?"
    answer: "No. The split table divides the estimated target time evenly. It is useful for basic pacing targets but does not predict starts, turns, fatigue, or race strategy."
  - question: "Does this page convert swimming time standards?"
    answer: "It converts an entered performance among pool courses, but it does not compare that performance with qualification standards. Standards depend on the organization, event, age group, sex, course, meet, and season."
---
