import type { CalculatorSpecification } from '../../types/calculator';

export const gpaCalculatorSpecification = {
  slug: 'gpa-calculator', template: 'multi-row',
  inputs: [
    { id: 'courses', label: 'Course rows', kind: 'text', required: true, description: 'Each started row contains a letter grade, credits, and course level.' },
    { id: 'priorGpa', label: 'Prior unweighted GPA', kind: 'number', min: 0, max: 4, step: 0.01, advanced: true },
    { id: 'priorCredits', label: 'Previously completed credits', kind: 'number', min: 0.01, step: 0.25, advanced: true },
  ],
  outputs: [
    { id: 'unweightedGpa', label: 'Unweighted GPA', decimals: 3, primary: true },
    { id: 'weightedGpa', label: 'Weighted GPA', decimals: 3 },
    { id: 'cumulativeGpa', label: 'Cumulative GPA', decimals: 3 },
  ],
  formula: 'GPA = Σ(grade points × course credits) ÷ Σ course credits',
  calculationSteps: ['Ignore rows without a selected letter grade.', 'Convert grades to the default point scale and apply level bonuses only to the weighted result.', 'Weight quality points by course credits.', 'Combine prior GPA and prior credits only when both values are supplied.'],
  rounding: 'Displayed GPA values are rounded to three decimals.',
  validation: [{ inputId: 'courses', rule: 'required', message: 'Select a grade for at least one course.' }, { inputId: 'priorGpa', rule: 'maximum', value: 4, message: 'Prior unweighted GPA cannot exceed 4.0.' }],
  exceptionalStates: ['Deleting the final course creates a blank replacement row.', 'Prior GPA and prior credits must be supplied together.', 'School-specific grade points, bonuses, and caps are not inferred.'],
  provenance: { resultLabel: 'Planning estimate', sources: [], version: 'Default 4.0 scale with configurable course rows', lastVerified: '2026-08-10', updateResponsibility: 'OnlineTool.me', assumptions: ['A/A+ = 4.0 and plus/minus values use the displayed default scale.', 'Honors adds 0.5 and AP/IB adds 1.0.', 'Institution-specific repeat, transfer, and pass/fail rules are excluded.'] },
  testCases: [
    { name: 'Credit-weighted GPA', kind: 'normal', inputs: { grade1: 4, credits1: 3, grade2: 3, credits2: 1 }, expected: { unweightedGpa: 3.75 } },
    { name: 'Advanced course bonus', kind: 'normal', inputs: { grade1: 4, credits1: 1, bonus1: 1 }, expected: { weightedGpa: 5 } },
    { name: 'Prior GPA half entry rejected', kind: 'invalid', inputs: { priorGpa: 3.5, priorCredits: '' }, expected: { error: true } },
  ],
} satisfies CalculatorSpecification;
