export const LSAC_GRADE_POINTS = Object.freeze({
  'A+': 4.33, A: 4, 'A-': 3.67, AB: 3.5,
  'B+': 3.33, B: 3, 'B-': 2.67, BC: 2.5,
  'C+': 2.33, C: 2, 'C-': 1.67, CD: 1.5,
  'D+': 1.33, D: 1, 'D-': 0.67, 'DE/DF': 0.5, 'E/F': 0,
});

export function calculateLsacGpa(courses) {
  if (!Array.isArray(courses) || courses.length === 0) throw new RangeError('Add at least one complete course.');
  let credits = 0;
  let qualityPoints = 0;
  for (const course of courses) {
    const grade = String(course.grade || '');
    const courseCredits = Number(course.credits);
    if (!(grade in LSAC_GRADE_POINTS) || !Number.isFinite(courseCredits) || courseCredits <= 0 || courseCredits > 30) {
      throw new RangeError('Each course needs a supported grade and credits from 0.01 to 30.');
    }
    credits += courseCredits;
    qualityPoints += LSAC_GRADE_POINTS[grade] * courseCredits;
  }
  return { gpa: qualityPoints / credits, credits, qualityPoints, courseCount: courses.length };
}

export const LSAT_APRIL_2022_SCALE = Object.freeze([
  120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,121,122,124,126,127,
  129,131,132,133,135,136,137,138,139,140,141,142,143,144,145,145,146,147,148,148,
  149,150,151,151,152,153,153,154,155,156,156,157,158,158,159,160,161,161,162,163,
  164,165,166,166,167,168,169,171,172,173,175,176,178,179,180,180,
]);

export function calculateLsatScore(rawScore, version = 'april-2022-ltzb03') {
  const raw = Number(rawScore);
  if (version !== 'april-2022-ltzb03') throw new RangeError('Unsupported LSAT conversion version.');
  if (!Number.isInteger(raw) || raw < 0 || raw > 75) throw new RangeError('Raw score must be a whole number from 0 to 75.');
  return { rawScore: raw, scaledScore: LSAT_APRIL_2022_SCALE[raw], version };
}

export function calculateCinderBlocks({ lengthFeet, heightFeet, openingsSquareFeet = 0, blockLengthInches = 16, blockHeightInches = 8, wastePercent = 5 }) {
  const values = [lengthFeet, heightFeet, openingsSquareFeet, blockLengthInches, blockHeightInches, wastePercent].map(Number);
  const [length, height, openings, blockLength, blockHeight, waste] = values;
  if (!values.every(Number.isFinite) || length <= 0 || height <= 0 || openings < 0 || blockLength <= 0 || blockHeight <= 0 || waste < 0 || waste > 50) throw new RangeError('Enter positive dimensions, nonnegative openings, and waste from 0% to 50%.');
  const grossArea = length * height;
  if (openings >= grossArea) throw new RangeError('Openings must be smaller than the wall area.');
  const netArea = grossArea - openings;
  const faceArea = (blockLength / 12) * (blockHeight / 12);
  const baseBlocks = netArea / faceArea;
  const totalBlocks = Math.ceil(baseBlocks * (1 + waste / 100));
  return { grossArea, netArea, faceArea, baseBlocks, wasteBlocks: totalBlocks - Math.ceil(baseBlocks), totalBlocks };
}

export function calculateVdot({ distanceMetres, hours = 0, minutes = 0, seconds = 0 }) {
  const distance = Number(distanceMetres);
  const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  if (![distance, totalSeconds].every(Number.isFinite) || distance < 400 || distance > 100000 || totalSeconds < 60 || totalSeconds > 86400) throw new RangeError('Use a distance from 400 m to 100 km and a time from 1 minute to 24 hours.');
  const totalMinutes = totalSeconds / 60;
  const velocity = distance / totalMinutes;
  const oxygenCost = -4.60 + 0.182258 * velocity + 0.000104 * velocity ** 2;
  const sustainableFraction = 0.8 + 0.1894393 * Math.exp(-0.012778 * totalMinutes) + 0.2989558 * Math.exp(-0.1932605 * totalMinutes);
  const vdot = oxygenCost / sustainableFraction;
  if (!Number.isFinite(vdot) || vdot <= 0 || vdot > 100) throw new RangeError('This distance and time are outside the supported VDOT model range.');
  return { vdot, totalSeconds, pacePerKmSeconds: totalSeconds / (distance / 1000), pacePerMileSeconds: totalSeconds / (distance / 1609.344) };
}

export function calculateWattsToAmps({ phase = 'dc', watts, volts, powerFactor = 1 }) {
  const power = Number(watts);
  const voltage = Number(volts);
  const pf = Number(powerFactor);
  if (!['dc', 'single', 'three'].includes(phase) || !Number.isFinite(power) || power <= 0 || power > 1e9 || !Number.isFinite(voltage) || voltage <= 0 || voltage > 1e6) throw new RangeError('Enter positive watts and volts within the supported range.');
  if (phase !== 'dc' && (!Number.isFinite(pf) || pf <= 0 || pf > 1)) throw new RangeError('AC power factor must be greater than 0 and no more than 1.');
  const divisor = phase === 'dc' ? voltage : phase === 'single' ? voltage * pf : Math.sqrt(3) * voltage * pf;
  return { amps: power / divisor, watts: power, volts: voltage, powerFactor: phase === 'dc' ? 1 : pf, phase };
}
