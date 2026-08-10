import type { CalculatorSpecification } from '../../types/calculator';

export const cdCalculatorSpecification = {
  slug: 'cd-calculator',
  template: 'formula',
  inputs: [
    { id: 'principal', label: 'Deposit amount', kind: 'number', unit: 'USD', placeholder: '10000', min: 0.01, step: 0.01, required: true },
    {
      id: 'termMonths',
      label: 'Term',
      kind: 'select',
      unit: 'months',
      defaultValue: 60,
      required: true,
      options: [
        { label: '6 months', value: 6 },
        { label: '1 year', value: 12 },
        { label: '2 years', value: 24 },
        { label: '3 years', value: 36 },
        { label: '5 years', value: 60 },
      ],
    },
    { id: 'annualRatePercent', label: 'Annual interest rate', kind: 'number', unit: '%', placeholder: '4.5', min: 0, step: 0.01, required: true },
    {
      id: 'compoundsPerYear',
      label: 'Compounding',
      kind: 'select',
      defaultValue: 12,
      required: true,
      options: [
        { label: 'Daily', value: 365 },
        { label: 'Monthly', value: 12 },
        { label: 'Quarterly', value: 4 },
        { label: 'Annually', value: 1 },
      ],
    },
  ],
  outputs: [
    { id: 'maturityValue', label: 'Total at maturity', unit: 'USD', decimals: 2, primary: true },
    { id: 'interestEarned', label: 'Interest earned', unit: 'USD', decimals: 2 },
    { id: 'effectiveAnnualYield', label: 'Effective annual yield', unit: '%', decimals: 2 },
    { id: 'growthPercent', label: 'Total growth', unit: '%', decimals: 2 },
  ],
  formula: 'Maturity value = Principal × (1 + annual rate ÷ compounds per year)^(compounds per year × years)',
  calculationSteps: [
    'Convert the selected term from months to years and the entered percentage to a decimal annual rate.',
    'Divide the annual rate by the selected number of compounding periods and apply compound growth.',
    'Subtract the principal from the maturity value to calculate interest earned.',
    'Derive the effective annual yield from total growth over the selected term.',
  ],
  rounding: 'Currency results and displayed percentages are rounded to two decimal places.',
  validation: [
    { inputId: 'principal', rule: 'nonzero', message: 'Deposit amount must be greater than zero.' },
    { inputId: 'annualRatePercent', rule: 'minimum', value: 0, message: 'Annual interest rate cannot be negative.' },
    { inputId: 'termMonths', rule: 'nonzero', message: 'Term must be greater than zero.' },
    { inputId: 'compoundsPerYear', rule: 'nonzero', message: 'Compounding frequency must be greater than zero.' },
  ],
  exceptionalStates: [
    'Incomplete principal or rate inputs keep the result area in its initial state.',
    'A zero annual interest rate returns the original deposit with zero interest.',
    'Taxes, fees, penalties, withdrawals, and additional deposits are not modeled.',
  ],
  provenance: {
    resultLabel: 'Planning estimate',
    sources: [],
    version: 'Standard nominal-rate compound-interest formula',
    lastVerified: '2026-08-10',
    updateResponsibility: 'OnlineTool.me',
    assumptions: [
      'The entered annual percentage is a nominal annual interest rate, not an already-calculated APY.',
      'The principal remains deposited for the full selected term.',
      'Interest compounds at a constant rate and frequency with no additional transactions.',
    ],
  },
  testCases: [
    { name: 'Existing 12-month page example', kind: 'published-example', inputs: { principal: 10000, termMonths: 12, annualRatePercent: 4.5, compoundsPerYear: 12 }, expected: { maturityValue: 10459.398250406, interestEarned: 459.398250406 }, tolerance: 0.000001 },
    { name: 'Zero-rate boundary', kind: 'boundary', inputs: { principal: 10000, termMonths: 60, annualRatePercent: 0, compoundsPerYear: 12 }, expected: { maturityValue: 10000, interestEarned: 0 }, tolerance: 0.000001 },
    { name: 'Zero deposit rejected', kind: 'invalid', inputs: { principal: 0, termMonths: 12, annualRatePercent: 4.5, compoundsPerYear: 12 }, expected: { error: true } },
  ],
} satisfies CalculatorSpecification;
