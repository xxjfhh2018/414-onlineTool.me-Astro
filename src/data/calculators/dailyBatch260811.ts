import type { CalculatorSpecification } from '../../types/calculator';

const verified = '2026-08-11';
const owner = 'OnlineTool.me';

export const linearFeetSpecification = {
  slug: 'linear-feet-calculator', template: 'multi-row',
  inputs: [{ id: 'items', label: 'Items, quantities, feet, and inches', kind: 'text', required: true }],
  outputs: [{ id: 'totalFeet', label: 'Total linear feet', unit: 'ft', decimals: 2, primary: true }, { id: 'totalMetres', label: 'Total metres', unit: 'm', decimals: 2 }, { id: 'pieceCount', label: 'Pieces', decimals: 0 }],
  formula: 'Total linear feet = Σ(quantity × (feet + inches ÷ 12))',
  calculationSteps: ['Convert each item’s inches to a fraction of a foot.', 'Multiply length per piece by quantity.', 'Add every completed row and convert the total to metres.'],
  rounding: 'Linear feet and metres display to two decimals; piece count remains a whole number.',
  validation: [{ inputId: 'items', rule: 'required', message: 'Add at least one complete item.' }],
  exceptionalStates: ['Blank rows are ignored.', 'A partially completed row displays an inline error.', 'Inches must stay below 12 because they are combined with the feet field.'],
  provenance: { resultLabel: 'Exact calculation', sources: [{ name: 'U.S. Survey Foot: Revised Unit Conversion Factors', url: 'https://www.nist.gov/pml/us-surveyfoot/revised-unit-conversion-factors', publisher: 'National Institute of Standards and Technology', accessedDate: verified }], version: 'International foot: 0.3048 metre exactly', lastVerified: verified, updateResponsibility: owner, assumptions: ['Every item is measured along one continuous dimension.', 'Quantity is a whole number of equal-length pieces within each row.', 'Waste, cuts, kerfs, and trim are not added automatically.'] },
  testCases: [{ name: 'Eight 6 ft 6 in pieces', kind: 'published-example', inputs: { quantity: 8, feet: 6, inches: 6 }, expected: { totalFeet: 52 } }, { name: 'One inch', kind: 'boundary', inputs: { quantity: 1, feet: 0, inches: 1 }, expected: { totalFeet: 0.083333 } }, { name: 'Twelve inches in inches field', kind: 'invalid', inputs: { quantity: 1, feet: 2, inches: 12 }, expected: { error: true } }],
} satisfies CalculatorSpecification;

export const rebarSpecification = {
  slug: 'rebar-calculator', template: 'formula',
  inputs: [{ id: 'lengthFeet', label: 'Slab length', kind: 'number', unit: 'ft', min: 0.1, required: true }, { id: 'widthFeet', label: 'Slab width', kind: 'number', unit: 'ft', min: 0.1, required: true }, { id: 'spacingInches', label: 'Bar spacing', kind: 'number', unit: 'in', min: 0.1, defaultValue: 18, required: true }, { id: 'coverInches', label: 'Edge cover', kind: 'number', unit: 'in', min: 0, defaultValue: 3 }, { id: 'layers', label: 'Grid layers', kind: 'select', defaultValue: 1, required: true }, { id: 'wastePercent', label: 'Waste allowance', kind: 'number', unit: '%', min: 0, max: 50, defaultValue: 10 }],
  outputs: [{ id: 'purchaseFeet', label: 'Rebar to purchase', unit: 'linear ft', decimals: 0, primary: true }, { id: 'barsRunningLength', label: 'Bars running lengthwise', decimals: 0 }, { id: 'barsRunningWidth', label: 'Bars running widthwise', decimals: 0 }],
  formula: 'Bar count = ceil(clear perpendicular dimension ÷ spacing) + 1; total length = Σ(bar count × clear run length) × layers; purchase length = ceil(total × (1 + waste%))',
  calculationSteps: ['Subtract edge cover from both sides of each slab dimension.', 'Use ceiling division so actual spacing does not exceed the entered target.', 'Multiply bar counts by their clear run lengths and the number of layers.', 'Add waste and round purchase length up.'],
  rounding: 'Bar counts and purchase length round up to whole values; installed length displays to one decimal.',
  validation: [{ inputId: 'coverInches', rule: 'custom', message: 'Cover must leave positive clear dimensions.' }],
  exceptionalStates: ['This estimates a rectangular orthogonal grid only.', 'Structural drawings control bar size, spacing, cover, laps, hooks, supports, and reinforcement zones.'],
  provenance: { resultLabel: 'Planning estimate', sources: [{ name: 'Placing Reinforcing Bars, 10th Edition — Table of Contents', url: 'https://www.crsi.org/wp-content/uploads/CRSI-Placing_Reinforcing_Bars_10th-TOC.pdf', publisher: 'Concrete Reinforcing Steel Institute', accessedDate: verified }, { name: 'ACI concrete reinforcement spacing context', url: 'https://www.concrete.org/frequentlyaskedquestions/faqid/754.aspx', publisher: 'American Concrete Institute', accessedDate: verified }], version: 'Rectangular grid quantity model', lastVerified: verified, updateResponsibility: owner, assumptions: ['Bars run straight in two perpendicular directions.', 'Spacing is a maximum target, so ceiling division is used.', 'Laps, hooks, chairs, localized reinforcement, openings, and stock-length optimization are outside the model.'] },
  testCases: [{ name: '20 by 10 foot slab', kind: 'published-example', inputs: { lengthFeet: 20, widthFeet: 10, spacingInches: 18, coverInches: 3, wastePercent: 10, layers: 1 }, expected: { barsRunningLength: 8, barsRunningWidth: 14, installedFeet: 289, purchaseFeet: 318 } }, { name: 'Zero waste', kind: 'boundary', inputs: { lengthFeet: 20, widthFeet: 10, spacingInches: 18, coverInches: 3, wastePercent: 0, layers: 1 }, expected: { purchaseFeet: 289 } }, { name: 'Cover consumes slab', kind: 'invalid', inputs: { lengthFeet: 1, widthFeet: 1, spacingInches: 12, coverInches: 6 }, expected: { error: true } }],
} satisfies CalculatorSpecification;

export const bowlingScoreSpecification = {
  slug: 'bowling-score-calculator', template: 'custom',
  inputs: [{ id: 'frames', label: 'Tenpin bowling frame rolls', kind: 'text', required: true }],
  outputs: [{ id: 'total', label: 'Game score', decimals: 0, primary: true }, { id: 'frameScores', label: 'Cumulative frame scores' }],
  formula: 'Open frame = pinfall; spare = 10 + next roll; strike = 10 + next two rolls; tenth-frame bonus rolls complete pending bonuses',
  calculationSteps: ['Validate roll pinfall within each frame.', 'Apply strike and spare bonuses only after the required future rolls exist.', 'Add cumulative scores frame by frame.', 'Use tenth-frame bonus rolls when a strike or spare is recorded.'],
  rounding: 'Bowling scores are whole pins; no rounding is applied.',
  validation: [{ inputId: 'frames', rule: 'custom', message: 'Two rolls in one rack cannot exceed 10 pins.' }],
  exceptionalStates: ['Pending strike or spare bonuses leave later cumulative totals blank.', 'The tenth frame allows a third roll only after a strike or spare.', 'Fouls should be entered as zero pinfall.'],
  provenance: { resultLabel: 'Exact calculation', sources: [{ name: 'Keeping Score', url: 'https://bowl.com/keeping-score', publisher: 'United States Bowling Congress', accessedDate: verified }], version: 'Standard tenpin bowling scoring', lastVerified: verified, updateResponsibility: owner, assumptions: ['The game uses standard tenpin scoring with ten frames.', 'Entered pinfall already accounts for fouls or corrected scores.', 'No league handicap, bonus pins, or alternative scoring format is applied.'] },
  testCases: [{ name: 'Perfect game', kind: 'published-example', inputs: { frames: 'X X X X X X X X X XXX' }, expected: { total: 300 } }, { name: 'All five spares', kind: 'boundary', inputs: { frames: '5/ repeated, bonus 5' }, expected: { total: 150 } }, { name: 'Frame exceeds ten pins', kind: 'invalid', inputs: { frames: '8,4' }, expected: { error: true } }],
} satisfies CalculatorSpecification;

export const partialFractionSpecification = {
  slug: 'partial-fraction-decomposition-calculator', template: 'formula',
  inputs: [{ id: 'numeratorX', label: 'Numerator x coefficient', kind: 'number', required: true }, { id: 'numeratorConstant', label: 'Numerator constant', kind: 'number', required: true }, { id: 'denominatorX2', label: 'Denominator x² coefficient', kind: 'number', required: true }, { id: 'denominatorX', label: 'Denominator x coefficient', kind: 'number', required: true }, { id: 'denominatorConstant', label: 'Denominator constant', kind: 'number', required: true }],
  outputs: [{ id: 'decomposition', label: 'Partial fraction decomposition', primary: true }, { id: 'factorization', label: 'Denominator factorization' }],
  formula: 'For distinct roots r₁,r₂: (mx+n)/(a(x−r₁)(x−r₂)) = A/(x−r₁)+B/(x−r₂), A=(mr₁+n)/(a(r₁−r₂)), B=(mr₂+n)/(a(r₂−r₁))',
  calculationSteps: ['Compute the quadratic discriminant and roots.', 'Use cover-up-equivalent coefficient formulas for two distinct real roots.', 'For a repeated root, include both first- and second-power denominator terms.', 'If the quadratic is irreducible over the reals, report that the proper fraction is already in irreducible real form.'],
  rounding: 'Displayed coefficients and roots use up to six decimal places; the internal calculation keeps full JavaScript precision.',
  validation: [{ inputId: 'denominatorX2', rule: 'nonzero', message: 'The denominator x² coefficient cannot be zero.' }],
  exceptionalStates: ['The numerator must be linear or constant and the denominator quadratic.', 'Polynomial long division and denominators above degree two are not supported.', 'Complex-linear decomposition is not displayed.'],
  provenance: { resultLabel: 'Exact calculation', sources: [{ name: '7.4 Partial Fractions', url: 'https://openstax.org/books/college-algebra/pages/7-4-partial-fractions', publisher: 'OpenStax', accessedDate: verified }], version: 'Linear numerator over quadratic denominator', lastVerified: verified, updateResponsibility: owner, assumptions: ['All coefficients are real numbers.', 'The rational expression is proper because the numerator degree is below two.', 'Results are expressed over real factors.'] },
  testCases: [{ name: 'Distinct factors example', kind: 'published-example', inputs: { numeratorX: 1, numeratorConstant: 0, denominatorX2: 1, denominatorX: -5, denominatorConstant: 6 }, expected: { decomposition: '3/(x−3) − 2/(x−2)' } }, { name: 'Repeated factor', kind: 'boundary', inputs: { numeratorX: 2, numeratorConstant: 3, denominatorX2: 1, denominatorX: -4, denominatorConstant: 4 }, expected: { decomposition: '2/(x−2) + 7/(x−2)²' } }, { name: 'Zero quadratic coefficient', kind: 'invalid', inputs: { denominatorX2: 0 }, expected: { error: true } }],
} satisfies CalculatorSpecification;

export const tankVolumeSpecification = {
  slug: 'tank-volume-calculator', template: 'formula',
  inputs: [{ id: 'shape', label: 'Tank shape', kind: 'select', defaultValue: 'rectangular', required: true }, { id: 'unitSystem', label: 'Unit system', kind: 'select', defaultValue: 'us', required: true }, { id: 'length', label: 'Length', kind: 'number', min: 0.001 }, { id: 'width', label: 'Width', kind: 'number', min: 0.001 }, { id: 'height', label: 'Height', kind: 'number', min: 0.001, required: true }, { id: 'diameter', label: 'Diameter', kind: 'number', min: 0.001 }, { id: 'fillPercent', label: 'Fill level', kind: 'number', unit: '%', min: 0, max: 100, defaultValue: 100 }],
  outputs: [{ id: 'liquidDisplay', label: 'Liquid volume', decimals: 2, primary: true }, { id: 'capacityDisplay', label: 'Full capacity', decimals: 2 }],
  formula: 'Rectangular: V=L×W×H; vertical cylinder: V=π(D÷2)²H; liquid volume=capacity×fill%',
  calculationSteps: ['Calculate internal geometric capacity from the selected shape.', 'Multiply capacity by the entered fill percentage.', 'Convert cubic feet to US gallons or cubic metres to litres.'],
  rounding: 'Capacity and liquid volume display to two decimals; calculations retain full precision.',
  validation: [{ inputId: 'height', rule: 'nonzero', message: 'Tank dimensions must be greater than zero.' }, { inputId: 'fillPercent', rule: 'maximum', value: 100, message: 'Fill level cannot exceed 100%.' }],
  exceptionalStates: ['Only rectangular tanks and upright right circular cylinders are supported.', 'Dimensions must be consistent in feet or metres.', 'Nominal dimensions do not account for wall thickness or internal obstructions.'],
  provenance: { resultLabel: 'Planning estimate', sources: [{ name: 'Volume and Surface Area', url: 'https://openstax.org/books/prealgebra/pages/9-6-solve-geometry-applications-volume-and-surface-area', publisher: 'OpenStax', accessedDate: verified }, { name: 'U.S. Survey Foot conversion factors', url: 'https://www.nist.gov/pml/us-surveyfoot/revised-unit-conversion-factors', publisher: 'National Institute of Standards and Technology', accessedDate: verified }], version: 'Rectangular and vertical-cylinder geometry', lastVerified: verified, updateResponsibility: owner, assumptions: ['Entered values are internal dimensions.', 'The cylinder is vertical with a level liquid surface.', 'US mode converts cubic feet to US liquid gallons; metric mode converts cubic metres to litres.'] },
  testCases: [{ name: 'Four-foot diameter by ten-foot cylinder', kind: 'published-example', inputs: { shape: 'vertical-cylinder', unitSystem: 'us', diameter: 4, height: 10, fillPercent: 100 }, expected: { capacityDisplay: 940.03 } }, { name: 'Half-full rectangular tank', kind: 'boundary', inputs: { shape: 'rectangular', unitSystem: 'us', length: 2, width: 3, height: 4, fillPercent: 50 }, expected: { liquidDisplay: 89.77 } }, { name: 'Zero dimension', kind: 'invalid', inputs: { shape: 'rectangular', length: 0, width: 3, height: 4 }, expected: { error: true } }],
} satisfies CalculatorSpecification;
