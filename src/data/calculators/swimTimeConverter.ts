import type { CalculatorSpecification } from '../../types/calculator';

export const swimTimeConverterSpecification = {
  slug: 'swim-time-converter',
  template: 'converter',
  inputs: [
    { id: 'event', label: 'Swimming event', kind: 'select', required: true },
    { id: 'sex', label: 'NCAA factor table', kind: 'select', required: true },
    { id: 'fromCourse', label: 'From pool course', kind: 'select', required: true },
    { id: 'toCourse', label: 'To pool course', kind: 'select', required: true },
    { id: 'time', label: 'Swim time', kind: 'time', placeholder: '1:00.00', required: true },
    { id: 'splitInterval', label: 'Split interval', kind: 'select', required: true, advanced: true },
  ],
  outputs: [
    { id: 'convertedTime', label: 'Estimated equivalent time', primary: true },
    { id: 'pace50', label: 'Average pace per 50' },
    { id: 'splitTable', label: 'Even-pace split estimates' },
  ],
  formula: 'Target time = source time × source-to-SCY factor ÷ target-to-SCY factor',
  calculationSteps: [
    'Convert the entered performance to an SCY-equivalent time with the selected NCAA sample factor.',
    'Divide the SCY-equivalent time by the target course factor.',
    'Drop units smaller than one hundredth of a second for the displayed converted time.',
  ],
  rounding: 'The converted time is truncated to hundredths, following the process in the NCAA sample conversion table. Pace and split displays are rounded to hundredths.',
  validation: [
    { inputId: 'time', rule: 'required', message: 'Enter a swim time.' },
    { inputId: 'time', rule: 'minimum', value: 0.01, message: 'Swim time must be greater than zero.' },
  ],
  exceptionalStates: [
    'Unsupported events are not approximated with a generic distance ratio.',
    'The same source and target course returns the entered time.',
  ],
  provenance: {
    resultLabel: 'Estimated equivalent',
    sources: [
      {
        name: '2025-26 and 2026-27 NCAA Swimming and Diving Rules Book',
        url: 'https://ncaaorg.s3.amazonaws.com/championships/sports/swimdive/rules/PRXSW_RulesBook.pdf',
        publisher: 'NCAA',
        accessedDate: '2026-08-10',
      },
    ],
    version: 'NCAA rules book updated August 5, 2026',
    applicableDate: '2025-26 and 2026-27 NCAA rules cycle',
    lastVerified: '2026-08-10',
    updateResponsibility: 'OnlineTool.me',
    assumptions: [
      'Reverse and SCM-to-LCM conversions invert or combine the published metric-to-SCY sample factors.',
      'Pace and split rows assume perfectly even pacing.',
      'Results are planning estimates, not official meet-entry or qualification times.',
    ],
  },
  testCases: [
    { name: 'NCAA men 200 LCM breaststroke example', kind: 'published-example', inputs: { timeSeconds: 136.71, eventKey: '200-breast', sex: 'men', fromCourse: 'LCM', toCourse: 'SCY' }, expected: { convertedSeconds: 117.29 } },
    { name: '100 SCM freestyle to SCY', kind: 'normal', inputs: { timeSeconds: 60, eventKey: '100-free', sex: 'women', fromCourse: 'SCM', toCourse: 'SCY' }, expected: { convertedSeconds: 53.76 } },
    { name: 'Zero time rejected', kind: 'invalid', inputs: { timeSeconds: 0, eventKey: '100-free', sex: 'men', fromCourse: 'LCM', toCourse: 'SCY' }, expected: { error: true } },
  ],
} satisfies CalculatorSpecification;
