import type { CalculatorSpecification } from '../../types/calculator';

export const apCalculusAbScoreSpecification = {
  slug: 'ap-calculus-ab-score-calculator', template: 'versioned-lookup',
  inputs: [
    { id: 'version', label: 'Exam format version', kind: 'select', required: true, options: [{ label: 'May 2027 exam format', value: 'may-2027' }, { label: 'May 2026 exam format', value: 'may-2026' }] },
    { id: 'multipleChoice', label: 'Multiple Choice points earned', kind: 'number', min: 0, step: 0.01, required: true },
    { id: 'freeResponse', label: 'Free Response points earned', kind: 'number', min: 0, step: 0.01, required: true },
    { id: 'cutScores', label: 'Estimated 1–5 cut scores', kind: 'text', advanced: true },
  ],
  outputs: [{ id: 'estimatedScore', label: 'Estimated AP score', decimals: 0, primary: true }, { id: 'weightedComposite', label: 'Weighted composite', unit: '%', decimals: 2 }],
  formula: 'Composite = Σ(section points earned ÷ section points possible × official section weight); estimated score = lookup against editable descending cutoffs',
  calculationSteps: ['Load the selected exam-version record.', 'Validate its official section structure, weights, source, and estimated cutoff table.', 'Calculate the weighted composite from entered section points.', 'Map the composite to an estimated 1–5 score using the visible cutoff table.'],
  rounding: 'Weighted composite is displayed to two decimals; the AP estimate is an integer from 1 to 5.',
  validation: [{ inputId: 'multipleChoice', rule: 'minimum', value: 0, message: 'Earned points cannot be negative.' }, { inputId: 'cutScores', rule: 'custom', message: 'Cutoffs must descend from score 5 through score 2.' }],
  exceptionalStates: ['Incomplete sections preserve the initial result state.', 'Earned points above the selected version maximum produce an inline error.', 'Changing version resets section inputs and loads that version’s source and cutoff table.', 'Old version records remain selectable instead of being overwritten.'],
  provenance: {
    resultLabel: 'Planning estimate',
    sources: [
      { name: 'AP Calculus AB Exam', url: 'https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam', publisher: 'College Board', accessedDate: '2026-08-10' },
      { name: 'AP Calculus AB and BC clarifications effective fall 2026', url: 'https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-bc-course-and-exam-description-clarifications-effective-fall-2026.pdf', publisher: 'College Board', accessedDate: '2026-08-10' },
    ],
    version: 'May 2027 current model with May 2026 legacy format retained', applicableDate: 'Version selected by the user', lastVerified: '2026-08-10', updateResponsibility: 'OnlineTool.me',
    assumptions: ['Section weights follow the selected College Board exam format.', 'The editable 1–5 cut scores are planning estimates, not official released conversion tables.', 'Secure-form difficulty, equating, and standard setting are not reproduced.'],
  },
  testCases: [
    { name: 'May 2027 equal section performance', kind: 'normal', inputs: { version: 'may-2027', mcq: 21, frq: 27 }, expected: { composite: 50 } },
    { name: 'May 2026 legacy MCQ maximum retained', kind: 'boundary', inputs: { version: 'may-2026', mcqPossible: 45 }, expected: { mcqPossible: 45 } },
    { name: 'Earned above version maximum rejected', kind: 'invalid', inputs: { version: 'may-2027', mcq: 43 }, expected: { error: true } },
  ],
} satisfies CalculatorSpecification;
