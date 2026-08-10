import type { CalculatorSpecification } from '../../types/calculator';

export const gradeCalculatorSpecification = {
  slug: 'grade-calculator', template: 'multi-row',
  inputs: [
    { id: 'rows', label: 'Assignment or category rows', kind: 'text', required: true, description: 'Rows contain paired scores or paired grade and weight values.' },
    { id: 'currentGrade', label: 'Current grade', kind: 'number', unit: '%', min: 0, step: 0.01 },
    { id: 'targetGrade', label: 'Desired course grade', kind: 'number', unit: '%', min: 0, step: 0.01 },
    { id: 'finalWeight', label: 'Final exam weight', kind: 'number', unit: '%', min: 0.01, max: 100, step: 0.01 },
  ],
  outputs: [
    { id: 'grade', label: 'Overall or normalized grade', unit: '%', decimals: 2, primary: true },
    { id: 'weightedContribution', label: 'Contribution to course grade', unit: 'points', decimals: 2 },
    { id: 'requiredFinal', label: 'Grade needed on final', unit: '%', decimals: 2 },
  ],
  formula: 'Points grade = Σ earned ÷ Σ possible × 100; weighted grade = Σ(grade × weight) ÷ Σ weights; required final = [target − current × (1 − final weight)] ÷ final weight',
  calculationSteps: ['Ignore completely blank rows.', 'Require both numeric cells in every started row.', 'Recalculate immediately after adding, deleting, or editing a row.', 'Show both normalized grade and entered-weight contribution when category weights do not total 100%.'],
  rounding: 'Displayed percentages and point totals are rounded to two decimals.',
  validation: [
    { inputId: 'rows', rule: 'required', message: 'At least one complete row is required.' },
    { inputId: 'finalWeight', rule: 'maximum', value: 100, message: 'Final exam weight cannot exceed 100%.' },
  ],
  exceptionalStates: ['A half-completed row produces an inline incomplete-row message.', 'Deleting the last row creates a new blank row.', 'Weights below or above 100% are reported and normalized rather than silently corrected.', 'A required final above 100% is shown as mathematically unreachable without extra credit.'],
  provenance: { resultLabel: 'Exact calculation', sources: [], version: 'Standard arithmetic grade formulas', lastVerified: '2026-08-10', updateResponsibility: 'OnlineTool.me', assumptions: ['Rows are independent and use the values entered.', 'Common A–F context uses 90/80/70/60 cutoffs.', 'Course-specific rounding, drops, curves, and extra credit are excluded.'] },
  testCases: [
    { name: 'Points rows', kind: 'normal', inputs: { earned1: 80, possible1: 100, earned2: 45, possible2: 50 }, expected: { grade: 83.333333 } },
    { name: 'Partial weights', kind: 'boundary', inputs: { grade1: 90, weight1: 30, grade2: 80, weight2: 20 }, expected: { normalizedGrade: 86, totalWeight: 50 } },
    { name: 'Half row rejected', kind: 'invalid', inputs: { earned1: 80, possible1: '' }, expected: { error: true } },
  ],
} satisfies CalculatorSpecification;
