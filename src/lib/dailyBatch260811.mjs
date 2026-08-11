export function calculateLinearFeet(items) {
  if (!Array.isArray(items) || items.length === 0) throw new RangeError('Add at least one complete item.');
  let totalFeet = 0;
  let pieceCount = 0;
  for (const item of items) {
    const quantity = Number(item.quantity);
    const feet = Number(item.feet || 0);
    const inches = Number(item.inches || 0);
    if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 1_000_000 || !Number.isFinite(feet) || feet < 0 || !Number.isFinite(inches) || inches < 0 || inches >= 12 || feet + inches === 0) {
      throw new RangeError('Each item needs a whole-number quantity and a positive length with inches from 0 to less than 12.');
    }
    pieceCount += quantity;
    totalFeet += quantity * (feet + inches / 12);
  }
  return { totalFeet, totalInches: totalFeet * 12, totalMetres: totalFeet * 0.3048, pieceCount };
}

export function calculateRebarGrid({ lengthFeet, widthFeet, spacingInches = 18, coverInches = 3, wastePercent = 10, layers = 1 }) {
  const length = Number(lengthFeet) * 12;
  const width = Number(widthFeet) * 12;
  const spacing = Number(spacingInches);
  const cover = Number(coverInches);
  const waste = Number(wastePercent);
  const layerCount = Number(layers);
  if (![length, width, spacing, cover, waste, layerCount].every(Number.isFinite) || length <= 0 || width <= 0 || spacing <= 0 || cover < 0 || waste < 0 || waste > 50 || ![1, 2].includes(layerCount)) throw new RangeError('Enter positive slab dimensions and spacing, nonnegative cover, waste from 0% to 50%, and one or two layers.');
  const clearLength = length - 2 * cover;
  const clearWidth = width - 2 * cover;
  if (clearLength <= 0 || clearWidth <= 0) throw new RangeError('Edge cover must leave a positive bar length in both directions.');
  const barsRunningLength = Math.ceil(clearWidth / spacing) + 1;
  const barsRunningWidth = Math.ceil(clearLength / spacing) + 1;
  const oneLayerFeet = barsRunningLength * (clearLength / 12) + barsRunningWidth * (clearWidth / 12);
  const installedFeet = oneLayerFeet * layerCount;
  const purchaseFeet = Math.ceil(installedFeet * (1 + waste / 100));
  return { barsRunningLength: barsRunningLength * layerCount, barsRunningWidth: barsRunningWidth * layerCount, clearLengthFeet: clearLength / 12, clearWidthFeet: clearWidth / 12, installedFeet, purchaseFeet, layerCount };
}

function normalizeBowlingFrames(frames) {
  if (!Array.isArray(frames) || frames.length > 10) throw new RangeError('A bowling game has no more than 10 frames.');
  const rolls = [];
  let completeThrough = 0;
  for (let index = 0; index < Math.min(frames.length, 9); index += 1) {
    const frame = frames[index] || [];
    if (frame.length === 0 || frame[0] === '' || frame[0] == null) break;
    const first = Number(frame[0]);
    if (!Number.isInteger(first) || first < 0 || first > 10) throw new RangeError(`Frame ${index + 1} first roll must be from 0 to 10.`);
    rolls.push(first);
    if (first === 10) { completeThrough = index + 1; continue; }
    if (frame[1] === '' || frame[1] == null) break;
    const second = Number(frame[1]);
    if (!Number.isInteger(second) || second < 0 || first + second > 10) throw new RangeError(`Frame ${index + 1} rolls cannot exceed 10 pins.`);
    rolls.push(second); completeThrough = index + 1;
  }
  const tenth = frames[9] || [];
  let tenthComplete = false;
  if (tenth[0] !== '' && tenth[0] != null) {
    const first = Number(tenth[0]); const second = Number(tenth[1]);
    if (!Number.isInteger(first) || first < 0 || first > 10) throw new RangeError('Frame 10 first roll must be from 0 to 10.');
    rolls.push(first);
    if (tenth[1] !== '' && tenth[1] != null) {
      if (!Number.isInteger(second) || second < 0 || second > 10 || (first < 10 && first + second > 10)) throw new RangeError('Frame 10 first two rolls are not valid.');
      rolls.push(second);
      const bonusRequired = first === 10 || first + second === 10;
      if (!bonusRequired) tenthComplete = true;
      else if (tenth[2] !== '' && tenth[2] != null) {
        const third = Number(tenth[2]);
        if (!Number.isInteger(third) || third < 0 || third > 10 || (first === 10 && second < 10 && second + third > 10)) throw new RangeError('Frame 10 bonus roll is not valid.');
        rolls.push(third); tenthComplete = true;
      }
    }
  }
  return { rolls, completeThrough, tenthComplete };
}

export function calculateBowlingScore(frames) {
  const { rolls, completeThrough, tenthComplete } = normalizeBowlingFrames(frames);
  const frameScores = Array(10).fill(null);
  let rollIndex = 0;
  let cumulative = 0;
  for (let frame = 0; frame < 9 && frame < completeThrough; frame += 1) {
    const first = rolls[rollIndex];
    if (first === 10) {
      if (rolls[rollIndex + 1] == null || rolls[rollIndex + 2] == null) { rollIndex += 1; continue; }
      cumulative += 10 + rolls[rollIndex + 1] + rolls[rollIndex + 2]; rollIndex += 1;
    } else {
      const second = rolls[rollIndex + 1];
      if (second == null) break;
      if (first + second === 10) {
        if (rolls[rollIndex + 2] == null) { rollIndex += 2; continue; }
        cumulative += 10 + rolls[rollIndex + 2];
      } else cumulative += first + second;
      rollIndex += 2;
    }
    frameScores[frame] = cumulative;
  }
  if (tenthComplete && completeThrough === 9) {
    const tenthRolls = rolls.slice(rollIndex);
    cumulative += tenthRolls.reduce((sum, roll) => sum + roll, 0);
    frameScores[9] = cumulative;
  }
  return { frameScores, total: frameScores[9], rolls, isComplete: frameScores[9] != null };
}

export function decomposePartialFraction({ numeratorX, numeratorConstant, denominatorX2, denominatorX, denominatorConstant }) {
  const m = Number(numeratorX); const n = Number(numeratorConstant); const a = Number(denominatorX2); const b = Number(denominatorX); const c = Number(denominatorConstant);
  if (![m, n, a, b, c].every(Number.isFinite) || a === 0) throw new RangeError('Enter finite coefficients and a nonzero x² coefficient.');
  const discriminant = b * b - 4 * a * c;
  const epsilon = 1e-12;
  if (discriminant > epsilon) {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const coefficient1 = (m * root1 + n) / (a * (root1 - root2));
    const coefficient2 = (m * root2 + n) / (a * (root2 - root1));
    return { type: 'distinct-real', discriminant, root1, root2, coefficient1, coefficient2 };
  }
  if (Math.abs(discriminant) <= epsilon) {
    const root = -b / (2 * a);
    return { type: 'repeated-real', discriminant: 0, root, coefficient1: m / a, coefficient2: (m * root + n) / a };
  }
  return { type: 'irreducible-real', discriminant };
}

export function calculateTankVolume({ shape = 'rectangular', unitSystem = 'us', length, width, height, diameter, fillPercent = 100 }) {
  const fill = Number(fillPercent);
  if (!['rectangular', 'vertical-cylinder'].includes(shape) || !['us', 'metric'].includes(unitSystem) || !Number.isFinite(fill) || fill < 0 || fill > 100) throw new RangeError('Choose a supported tank shape and a fill level from 0% to 100%.');
  let capacityCubic;
  if (shape === 'rectangular') {
    const dimensions = [length, width, height].map(Number);
    if (!dimensions.every(value => Number.isFinite(value) && value > 0)) throw new RangeError('Rectangular tanks need positive length, width, and height.');
    capacityCubic = dimensions[0] * dimensions[1] * dimensions[2];
  } else {
    const d = Number(diameter); const h = Number(height);
    if (!Number.isFinite(d) || d <= 0 || !Number.isFinite(h) || h <= 0) throw new RangeError('Cylindrical tanks need positive diameter and height.');
    capacityCubic = Math.PI * (d / 2) ** 2 * h;
  }
  const liquidCubic = capacityCubic * fill / 100;
  const conversion = unitSystem === 'us' ? 7.4805194805 : 1000;
  return { capacityCubic, liquidCubic, capacityDisplay: capacityCubic * conversion, liquidDisplay: liquidCubic * conversion, displayUnit: unitSystem === 'us' ? 'US gal' : 'L', cubicUnit: unitSystem === 'us' ? 'ft³' : 'm³', fillPercent: fill };
}
