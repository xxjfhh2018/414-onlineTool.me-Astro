const finite = (value, label) => {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new RangeError(`Enter a valid ${label}.`);
  return number;
};

export function calculateCrossStitch({ widthStitches, heightStitches, fabricCount = 14, threadsOver = 1, allowancePerSide = 3 }) {
  const width = finite(widthStitches, 'pattern width'); const height = finite(heightStitches, 'pattern height'); const count = finite(fabricCount, 'fabric count'); const over = finite(threadsOver, 'threads-over value'); const allowance = finite(allowancePerSide, 'finishing allowance');
  if (width <= 0 || height <= 0 || count <= 0 || ![1, 2].includes(over) || allowance < 0 || allowance > 12) throw new RangeError('Use positive stitch dimensions and fabric count, stitch over one or two threads, and an allowance from 0 to 12 inches per side.');
  const designWidthInches = width * over / count; const designHeightInches = height * over / count;
  return { designWidthInches, designHeightInches, cutWidthInches: designWidthInches + allowance * 2, cutHeightInches: designHeightInches + allowance * 2, totalStitches: width * height };
}

export function calculateDunk({ unitSystem = 'imperial', standingReach, currentVertical = '', clearance = 6 }) {
  if (!['imperial', 'metric'].includes(unitSystem)) throw new RangeError('Choose inches or centimetres.');
  const reach = finite(standingReach, 'standing reach'); const extra = finite(clearance, 'clearance'); const rim = unitSystem === 'imperial' ? 120 : 304.8;
  if (reach <= 0 || reach >= rim + 30 || extra < 0 || extra > (unitSystem === 'imperial' ? 24 : 61)) throw new RangeError('Check standing reach and use a nonnegative target clearance within the supported range.');
  const requiredVertical = Math.max(0, rim + extra - reach); const current = currentVertical === '' || currentVertical == null ? null : finite(currentVertical, 'current vertical jump');
  if (current != null && (current < 0 || current > (unitSystem === 'imperial' ? 60 : 152.4))) throw new RangeError('Current vertical jump is outside the supported range.');
  return { rim, requiredVertical, currentVertical: current, gap: current == null ? null : requiredVertical - current, clearance: extra, unit: unitSystem === 'imperial' ? 'in' : 'cm' };
}

const snowboardBands = [[45,135,145],[54,140,149],[63,146,154],[72,150,158],[81,154,162],[90,157,165],[100,160,168],[Infinity,163,172]];
export function calculateSnowboardSize({ unitSystem = 'metric', weight, height, terrain = 'all-mountain', bootSizeUS }) {
  const kg = finite(weight, 'rider weight') * (unitSystem === 'us' ? 0.45359237 : 1); const heightCm = finite(height, 'rider height') * (unitSystem === 'us' ? 2.54 : 1); const boot = finite(bootSizeUS, 'US boot size');
  if (kg < 25 || kg > 180 || heightCm < 120 || heightCm > 230 || boot < 1 || boot > 18 || !['park','all-mountain','powder'].includes(terrain)) throw new RangeError('Enter a supported adult rider weight, height, US boot size, and terrain preference.');
  const band = snowboardBands.find(([max]) => kg <= max); const terrainShift = terrain === 'park' ? -2 : terrain === 'powder' ? 3 : 0; let minCm = band[1] + terrainShift; let maxCm = band[2] + terrainShift; const heightCap = Math.round(heightCm - 8);
  if (minCm > heightCap) { const shift = minCm - heightCap; minCm -= shift; maxCm -= shift; }
  const widthAdvice = boot >= 11 ? 'Look for a wide model and verify waist width against the boot maker and board chart.' : boot >= 10 ? 'Check waist width carefully; some models may need a mid-wide or wide option.' : 'A regular-width model is a reasonable starting point, but verify the product chart.';
  return { minCm, maxCm, midpointCm: Math.round((minCm + maxCm) / 2), widthAdvice, terrain };
}

export function calculateBricks({ wallLengthFeet, wallHeightFeet, openingsSqFeet = 0, brickLengthInches = 7.625, brickHeightInches = 2.25, jointInches = 0.375, wastePercent = 5 }) {
  const length = finite(wallLengthFeet, 'wall length'); const height = finite(wallHeightFeet, 'wall height'); const openings = finite(openingsSqFeet, 'opening area'); const brickLength = finite(brickLengthInches, 'brick length'); const brickHeight = finite(brickHeightInches, 'brick height'); const joint = finite(jointInches, 'mortar joint'); const waste = finite(wastePercent, 'waste percentage');
  if (length <= 0 || height <= 0 || openings < 0 || brickLength <= 0 || brickHeight <= 0 || joint < 0 || waste < 0 || waste > 30) throw new RangeError('Enter positive wall and brick dimensions, nonnegative openings and joints, and waste from 0% to 30%.');
  const grossArea = length * height; const netArea = grossArea - openings; if (netArea <= 0) throw new RangeError('Opening area must be smaller than gross wall area.');
  const moduleAreaSqFeet = (brickLength + joint) * (brickHeight + joint) / 144; const baseBricks = netArea / moduleAreaSqFeet;
  return { grossArea, netArea, moduleAreaSqFeet, bricksPerSqFoot: 1 / moduleAreaSqFeet, baseBricks, purchaseBricks: Math.ceil(baseBricks * (1 + waste / 100)) };
}

const climateRates = { mild: 25, moderate: 35, cold: 45, 'very-cold': 55 }; const insulationFactors = { efficient: 0.8, average: 1, limited: 1.2 };
export function calculateFurnaceSize({ areaSqFeet, climate = 'moderate', insulation = 'average', afuePercent = 90 }) {
  const area = finite(areaSqFeet, 'conditioned floor area'); const afue = finite(afuePercent, 'AFUE');
  if (area < 100 || area > 15000 || !climateRates[climate] || !insulationFactors[insulation] || afue < 60 || afue > 100) throw new RangeError('Enter 100–15,000 square feet, a supported climate and envelope, and AFUE from 60% to 100%.');
  const outputBtu = area * climateRates[climate] * insulationFactors[insulation]; const inputBtu = outputBtu / (afue / 100);
  return { outputBtu, inputBtu, lowInputBtu: inputBtu * 0.85, highInputBtu: inputBtu * 1.15, rate: climateRates[climate], envelopeFactor: insulationFactors[insulation], afue };
}
