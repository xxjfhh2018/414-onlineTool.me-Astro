import type { CalculatorSpecification } from '../../types/calculator';

export const ffmiCalculatorSpecification = {
  slug: 'ffmi-calculator',
  template: 'formula',
  inputs: [
    {
      id: 'unitSystem',
      label: 'Unit system',
      kind: 'select',
      defaultValue: 'metric',
      required: true,
      options: [
        { label: 'Metric', value: 'metric' },
        { label: 'US customary', value: 'us' },
      ],
    },
    { id: 'weight', label: 'Weight', kind: 'number', unit: 'kg', placeholder: '82', min: 0.1, max: 350, step: 0.1, required: true },
    { id: 'height', label: 'Height', kind: 'number', unit: 'cm', placeholder: '180', min: 50, max: 280, step: 0.1, required: true },
    { id: 'bodyFat', label: 'Body fat', kind: 'number', unit: '%', placeholder: '15', min: 0, max: 75, step: 0.1, required: true },
  ],
  outputs: [
    { id: 'ffmi', label: 'FFMI', decimals: 2, primary: true },
    { id: 'leanMass', label: 'Lean mass', unit: 'kg', decimals: 1 },
    { id: 'normalizedFfmi', label: 'Height-normalized FFMI', decimals: 2 },
  ],
  formula: 'Lean mass = weight × (1 − body fat ÷ 100); FFMI = lean mass kg ÷ height m²; normalized FFMI = FFMI + 6.3 × (1.80 − height m)',
  calculationSteps: [
    'Convert US customary weight and height to kilograms and metres when necessary.',
    'Multiply body weight by the estimated lean-mass fraction.',
    'Divide lean mass in kilograms by squared height in metres.',
    'Apply the Kouri height-normalization adjustment and round displayed FFMI values to two decimals.',
  ],
  rounding: 'FFMI and normalized FFMI are displayed to two decimals. Lean mass is displayed to one decimal in the selected unit system.',
  validation: [
    { inputId: 'weight', rule: 'nonzero', message: 'Weight must be greater than zero.' },
    { inputId: 'weight', rule: 'maximum', value: 350, message: 'Metric weight cannot exceed 350 kg; US weight cannot exceed 770 lb.' },
    { inputId: 'height', rule: 'minimum', value: 50, message: 'Metric height must be at least 50 cm; US height must be at least 20 in.' },
    { inputId: 'height', rule: 'maximum', value: 280, message: 'Metric height cannot exceed 280 cm; US height cannot exceed 110 in.' },
    { inputId: 'bodyFat', rule: 'minimum', value: 0, message: 'Body fat cannot be below 0%.' },
    { inputId: 'bodyFat', rule: 'maximum', value: 75, message: 'Body fat cannot exceed 75%.' },
  ],
  exceptionalStates: [
    'Incomplete inputs keep the result area in its initial state.',
    'Changing the unit system converts completed weight and height values before recalculating.',
    'A height of exactly 1.80 m produces no displayed height-normalization difference.',
  ],
  provenance: {
    resultLabel: 'Planning estimate',
    sources: [
      {
        name: 'Fat-free mass index in users and nonusers of anabolic-androgenic steroids',
        url: 'https://pubmed.ncbi.nlm.nih.gov/7496846/',
        publisher: 'Clinical Journal of Sport Medicine',
        accessedDate: '2026-08-10',
      },
    ],
    version: 'Kouri et al. height-normalization model',
    lastVerified: '2026-08-10',
    updateResponsibility: 'OnlineTool.me',
    assumptions: [
      'Entered body-fat percentage is treated as an estimate of total body-fat proportion.',
      'Height normalization uses a coefficient of 6.3 and a reference height of 1.80 metres.',
      'The result is body-composition context, not a diagnosis, pass/fail standard, or proof of drug use.',
    ],
  },
  testCases: [
    { name: 'Published page example at reference height', kind: 'published-example', inputs: { unitSystem: 'metric', weight: 82, height: 180, bodyFat: 15 }, expected: { leanKg: 69.7, ffmi: 21.512345679, normalizedFfmi: 21.512345679 }, tolerance: 0.000001 },
    { name: 'US customary calculation', kind: 'normal', inputs: { unitSystem: 'us', weight: 181, height: 70.9, bodyFat: 15 }, expected: { ffmi: 21.518071069, normalizedFfmi: 21.512653069 }, tolerance: 0.000001 },
    { name: 'Zero body fat boundary', kind: 'boundary', inputs: { unitSystem: 'metric', weight: 80, height: 180, bodyFat: 0 }, expected: { leanKg: 80 }, tolerance: 0.000001 },
    { name: 'Weight above supported metric range', kind: 'invalid', inputs: { unitSystem: 'metric', weight: 351, height: 180, bodyFat: 15 }, expected: { error: true } },
  ],
} satisfies CalculatorSpecification;
