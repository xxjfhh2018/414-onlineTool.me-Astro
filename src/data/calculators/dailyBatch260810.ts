import type { CalculatorSpecification } from '../../types/calculator';

const verified = '2026-08-10';
const owner = 'OnlineTool.me';

export const lsacGpaSpecification = {
  slug: 'lsac-gpa-calculator', template: 'multi-row',
  inputs: [{ id: 'courses', label: 'Courses, grades, and credits', kind: 'text', required: true }],
  outputs: [{ id: 'gpa', label: 'Estimated LSAC GPA', decimals: 2, primary: true }, { id: 'qualityPoints', label: 'Quality points', decimals: 2 }, { id: 'credits', label: 'Credits included', decimals: 2 }],
  formula: 'Estimated LSAC GPA = Σ(LSAC grade value × course credits) ÷ Σ(course credits)',
  calculationSteps: ['Map each entered letter grade to LSAC’s published 0.00–4.33 value.', 'Multiply each grade value by its course credits.', 'Divide total quality points by total included credits.'],
  rounding: 'The GPA and supporting totals are displayed to two decimal places.',
  validation: [{ inputId: 'courses', rule: 'required', message: 'Add at least one course with both a grade and credits.' }],
  exceptionalStates: ['Blank rows are ignored.', 'A half-complete row displays an inline error.', 'The result is an estimate because LSAC controls transcript-specific exclusions and conversions.'],
  provenance: { resultLabel: 'Planning estimate', sources: [{ name: 'Transcript Summarization', url: 'https://www.lsac.org/applying-law-school/jd-application-process/cas/requesting/transcript-summarization', publisher: 'Law School Admission Council', accessedDate: verified }], version: 'LSAC grade-conversion table verified August 2026', lastVerified: verified, updateResponsibility: owner, assumptions: ['All entered courses are eligible for LSAC conversion.', 'Credits are already expressed in a consistent unit.', 'Institution-specific transcript treatment is not reproduced.'] },
  testCases: [{ name: 'Mixed-credit example', kind: 'published-example', inputs: { courses: 'A+×3, B×4, C-×2' }, expected: { qualityPoints: 28.33, credits: 9, gpa: 3.147777 } }, { name: 'Single failing course', kind: 'boundary', inputs: { courses: 'E/F×3' }, expected: { gpa: 0 } }, { name: 'Zero credits', kind: 'invalid', inputs: { courses: 'A×0' }, expected: { error: true } }],
} satisfies CalculatorSpecification;

export const lsatScoreSpecification = {
  slug: 'lsat-score-calculator', template: 'versioned-lookup',
  inputs: [{ id: 'version', label: 'Disclosed test version', kind: 'select', required: true }, { id: 'rawScore', label: 'Raw score', kind: 'number', min: 0, max: 75, step: 1, required: true }],
  outputs: [{ id: 'scaledScore', label: 'Form-specific scaled score', decimals: 0, primary: true }],
  formula: 'Scaled score = exact lookup of raw correct answers in the selected disclosed-form conversion table',
  calculationSteps: ['Select the disclosed test version.', 'Validate the raw score against that form’s scored-question count.', 'Return the corresponding 120–180 score from LSAC’s published table.'],
  rounding: 'No interpolation or rounding is used; the table returns a whole-number scaled score.',
  validation: [{ inputId: 'rawScore', rule: 'custom', message: 'Use a whole-number raw score from 0 to 75 for this version.' }],
  exceptionalStates: ['This table applies only to April 2022 Form LTZB03.', 'Different LSAT forms use equating and can map the same raw score differently.', 'No percentile or admissions prediction is inferred.'],
  provenance: { resultLabel: 'Version-specific result', sources: [{ name: 'April 2022 LSAT Disclosure Booklet — Form LTZB03', url: 'https://www.lsac.org/document-library/809', publisher: 'Law School Admission Council', accessedDate: verified }, { name: 'LSAT Technical Report TR 24-01', url: 'https://www.lsac.org/sites/default/files/research/TR-24-01.pdf', publisher: 'Law School Admission Council', accessedDate: verified }], version: 'April 2022 Form LTZB03', applicableDate: 'April 2022 disclosed administration only', lastVerified: verified, updateResponsibility: owner, assumptions: ['Raw score means correct answers across the 75 scored questions on this disclosed form.', 'The lookup is not applied to a different practice test or administration.'] },
  testCases: [{ name: 'Perfect raw score', kind: 'published-example', inputs: { rawScore: 75 }, expected: { scaledScore: 180 } }, { name: 'Middle table value', kind: 'normal', inputs: { rawScore: 50 }, expected: { scaledScore: 156 } }, { name: 'Noninteger raw score', kind: 'invalid', inputs: { rawScore: 50.5 }, expected: { error: true } }],
} satisfies CalculatorSpecification;

export const cinderBlockSpecification = {
  slug: 'cinder-block-calculator', template: 'formula',
  inputs: [{ id: 'lengthFeet', label: 'Wall length', kind: 'number', unit: 'ft', min: 0.1, required: true }, { id: 'heightFeet', label: 'Wall height', kind: 'number', unit: 'ft', min: 0.1, required: true }, { id: 'openingsSquareFeet', label: 'Doors and windows', kind: 'number', unit: 'sq ft', min: 0, defaultValue: 0 }, { id: 'wastePercent', label: 'Waste allowance', kind: 'number', unit: '%', min: 0, max: 50, defaultValue: 5 }, { id: 'blockSize', label: 'Nominal block size', kind: 'select', defaultValue: '16x8', required: true }],
  outputs: [{ id: 'totalBlocks', label: 'Blocks to purchase', decimals: 0, primary: true }, { id: 'netArea', label: 'Net wall area', unit: 'sq ft', decimals: 2 }],
  formula: 'Blocks = ceil(((wall length × wall height − openings) ÷ nominal block face area) × (1 + waste%))',
  calculationSteps: ['Calculate gross wall area.', 'Subtract entered doors and windows.', 'Divide by the nominal block face module.', 'Add waste and round the purchase quantity up.'],
  rounding: 'Area is displayed to two decimals; purchase quantity always rounds up to a whole block.',
  validation: [{ inputId: 'lengthFeet', rule: 'nonzero', message: 'Wall length must be greater than zero.' }, { inputId: 'openingsSquareFeet', rule: 'custom', message: 'Openings must be smaller than gross wall area.' }],
  exceptionalStates: ['A wall fully consumed by openings is rejected.', 'Custom physical product sizes may differ from the nominal mortar-joint module.'],
  provenance: { resultLabel: 'Planning estimate', sources: [{ name: 'CMU-TEC-001: Concrete Masonry Products', url: 'https://www.cmha.org/resource/cmu-tec-001/', publisher: 'Concrete Masonry & Hardscapes Association', accessedDate: verified }], version: 'Nominal 8 in × 16 in face module', lastVerified: verified, updateResponsibility: owner, assumptions: ['Default block face is the nominal 8-by-16-inch module including the mortar-joint allowance.', 'The wall is a single-wythe rectangular area.', 'Breakage and cuts are represented only by the chosen waste allowance.'] },
  testCases: [{ name: '20 by 8 foot wall with 5 percent waste', kind: 'published-example', inputs: { lengthFeet: 20, heightFeet: 8, openingsSquareFeet: 0, wastePercent: 5 }, expected: { baseBlocks: 180, totalBlocks: 189 } }, { name: 'No waste', kind: 'boundary', inputs: { lengthFeet: 20, heightFeet: 8, openingsSquareFeet: 0, wastePercent: 0 }, expected: { totalBlocks: 180 } }, { name: 'Openings equal wall', kind: 'invalid', inputs: { lengthFeet: 10, heightFeet: 8, openingsSquareFeet: 80 }, expected: { error: true } }],
} satisfies CalculatorSpecification;

export const vdotSpecification = {
  slug: 'vdot-calculator', template: 'formula',
  inputs: [{ id: 'distanceMetres', label: 'Race distance', kind: 'number', unit: 'm', min: 400, max: 100000, required: true }, { id: 'hours', label: 'Hours', kind: 'number', min: 0, max: 23, defaultValue: 0 }, { id: 'minutes', label: 'Minutes', kind: 'number', min: 0, max: 59, required: true }, { id: 'seconds', label: 'Seconds', kind: 'number', min: 0, max: 59, required: true }],
  outputs: [{ id: 'vdot', label: 'Estimated VDOT', decimals: 1, primary: true }, { id: 'pacePerKm', label: 'Average pace per km' }, { id: 'pacePerMile', label: 'Average pace per mile' }],
  formula: 'VDOT = oxygen cost at race velocity ÷ sustainable fraction at race duration (Daniels–Gilbert model)',
  calculationSteps: ['Convert distance and finish time to metres per minute.', 'Estimate oxygen cost from running velocity.', 'Estimate the sustainable fraction for the race duration.', 'Divide oxygen cost by sustainable fraction and calculate average pace.'],
  rounding: 'VDOT is displayed to one decimal; paces are displayed to the nearest second.',
  validation: [{ inputId: 'distanceMetres', rule: 'minimum', value: 400, message: 'Distance must be at least 400 metres.' }, { inputId: 'minutes', rule: 'custom', message: 'Total finish time must be from 1 minute to 24 hours.' }],
  exceptionalStates: ['Very short, very long, or implausible input combinations are rejected.', 'VDOT is a performance index, not a laboratory VO₂max measurement.'],
  provenance: { resultLabel: 'Planning estimate', sources: [{ name: "Daniels' Running Formula", url: 'https://www.human-kinetics.co.uk/9781718203662/daniels-running-formula/', publisher: 'Human Kinetics', accessedDate: verified }], version: 'Daniels–Gilbert race-performance equations', lastVerified: verified, updateResponsibility: owner, assumptions: ['The entered result represents a recent race-effort performance.', 'Conditions, terrain, altitude, weather, and fatigue are not adjusted.', 'Equivalent fitness across race distances is not guaranteed.'] },
  testCases: [{ name: '20-minute 5K', kind: 'published-example', inputs: { distanceMetres: 5000, minutes: 20, seconds: 0 }, expected: { vdot: 49.806233, pacePerKmSeconds: 240 } }, { name: 'Minimum supported distance', kind: 'boundary', inputs: { distanceMetres: 400, minutes: 1, seconds: 30 }, expected: { error: false } }, { name: 'Distance too short', kind: 'invalid', inputs: { distanceMetres: 100, minutes: 1 }, expected: { error: true } }],
} satisfies CalculatorSpecification;

export const wattsToAmpsSpecification = {
  slug: 'watts-to-amps-calculator', template: 'formula',
  inputs: [{ id: 'phase', label: 'Circuit type', kind: 'select', defaultValue: 'dc', required: true }, { id: 'watts', label: 'Real power', kind: 'number', unit: 'W', min: 0.01, required: true }, { id: 'volts', label: 'Voltage', kind: 'number', unit: 'V', min: 0.01, required: true }, { id: 'powerFactor', label: 'Power factor', kind: 'number', min: 0.01, max: 1, defaultValue: 1 }],
  outputs: [{ id: 'amps', label: 'Current', unit: 'A', decimals: 3, primary: true }],
  formula: 'DC: I=P÷V; single-phase AC: I=P÷(V×PF); balanced three-phase AC: I=P÷(√3×Vline×PF)',
  calculationSteps: ['Select DC, single-phase AC, or balanced three-phase AC.', 'Enter real power and operating voltage.', 'For AC, include the load power factor.', 'Divide power by the applicable voltage and phase factor.'],
  rounding: 'Current is displayed with adaptive precision up to three decimal places.',
  validation: [{ inputId: 'watts', rule: 'nonzero', message: 'Watts must be greater than zero.' }, { inputId: 'powerFactor', rule: 'custom', message: 'AC power factor must be greater than 0 and no more than 1.' }],
  exceptionalStates: ['Power factor is ignored for DC.', 'Three-phase calculation assumes a balanced load and line-to-line voltage.', 'Calculated current is not a conductor, breaker, or safety rating.'],
  provenance: { resultLabel: 'Exact calculation', sources: [{ name: 'Electrical Glossary', url: 'https://www.fluke.com/en/learn/blog/electrical/electrical-glossary', publisher: 'Fluke', accessedDate: verified }, { name: 'How to Size Motors for Load', url: 'https://www.fluke.com/en-us/learn/blog/power-quality/horsepower-motor-efficient-installation', publisher: 'Fluke', accessedDate: verified }], version: 'Standard real-power relationships', lastVerified: verified, updateResponsibility: owner, assumptions: ['AC watts mean real power, not apparent power.', 'Three-phase voltage is line-to-line and the load is balanced.', 'Efficiency losses are already reflected in the entered real power or are outside this conversion.'] },
  testCases: [{ name: '1200 W DC at 120 V', kind: 'published-example', inputs: { phase: 'dc', watts: 1200, volts: 120 }, expected: { amps: 10 } }, { name: 'Balanced three-phase load', kind: 'normal', inputs: { phase: 'three', watts: 10000, volts: 400, powerFactor: 0.8 }, expected: { amps: 18.042196 } }, { name: 'Zero power factor', kind: 'invalid', inputs: { phase: 'single', watts: 1000, volts: 120, powerFactor: 0 }, expected: { error: true } }],
} satisfies CalculatorSpecification;
