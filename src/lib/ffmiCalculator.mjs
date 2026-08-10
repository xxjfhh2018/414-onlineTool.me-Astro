export const FFMI_CONSTANTS = Object.freeze({
  poundsPerKilogram: 2.2046226218,
  centimetresPerInch: 2.54,
  metresPerInch: 0.0254,
  normalizationCoefficient: 6.3,
  normalizationReferenceHeightMetres: 1.8,
});

export const FFMI_LIMITS = Object.freeze({
  metric: Object.freeze({ maxWeight: 350, minHeight: 50, maxHeight: 280 }),
  us: Object.freeze({ maxWeight: 770, minHeight: 20, maxHeight: 110 }),
  minBodyFat: 0,
  maxBodyFat: 75,
});

export function validateFfmiInput({ unitSystem, weight, height, bodyFat }) {
  if (unitSystem !== 'metric' && unitSystem !== 'us') return false;
  const limits = FFMI_LIMITS[unitSystem];
  return [weight, height, bodyFat].every(Number.isFinite)
    && weight > 0
    && weight <= limits.maxWeight
    && height >= limits.minHeight
    && height <= limits.maxHeight
    && bodyFat >= FFMI_LIMITS.minBodyFat
    && bodyFat <= FFMI_LIMITS.maxBodyFat;
}

export function calculateFfmi({ unitSystem = 'metric', weight, height, bodyFat }) {
  const input = {
    unitSystem,
    weight: Number(weight),
    height: Number(height),
    bodyFat: Number(bodyFat),
  };
  if (!validateFfmiInput(input)) {
    throw new RangeError('FFMI inputs are outside the supported range.');
  }

  const kilograms = unitSystem === 'metric'
    ? input.weight
    : input.weight / FFMI_CONSTANTS.poundsPerKilogram;
  const metres = unitSystem === 'metric'
    ? input.height / 100
    : input.height * FFMI_CONSTANTS.metresPerInch;
  const leanKg = kilograms * (1 - input.bodyFat / 100);
  const ffmi = leanKg / (metres * metres);
  const normalizedFfmi = ffmi
    + FFMI_CONSTANTS.normalizationCoefficient
      * (FFMI_CONSTANTS.normalizationReferenceHeightMetres - metres);

  return {
    kilograms,
    metres,
    leanKg,
    ffmi,
    normalizedFfmi,
    normalizationDifference: normalizedFfmi - ffmi,
  };
}
