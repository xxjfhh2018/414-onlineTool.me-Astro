const finite = (value, label) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new RangeError(`${label} must be a valid number.`);
  return parsed;
};

export const WATER_MOLAR_MASS = 18.015;

export function calculateMcatScore(input) {
  const sectionKeys = ['chemPhys', 'cars', 'bioBiochem', 'psychSoc'];
  const sections = sectionKeys.map(key => finite(input[key], 'Each MCAT section score'));
  if (sections.some(score => !Number.isInteger(score) || score < 118 || score > 132)) {
    throw new RangeError('Each scaled MCAT section score must be a whole number from 118 to 132.');
  }
  return {
    total: sections.reduce((sum, score) => sum + score, 0),
    sections,
    sectionAverage: sections.reduce((sum, score) => sum + score, 0) / 4,
    strongestSectionIndex: sections.indexOf(Math.max(...sections)),
    weakestSectionIndex: sections.indexOf(Math.min(...sections)),
  };
}

export function calculateHydrate(input) {
  const anhydrousMolarMass = finite(input.anhydrousMolarMass, 'Anhydrous molar mass');
  const waterMolecules = finite(input.waterMolecules, 'Water molecules');
  const sampleMass = input.sampleMass === '' || input.sampleMass == null ? null : finite(input.sampleMass, 'Sample mass');
  if (anhydrousMolarMass <= 0 || anhydrousMolarMass > 10000) throw new RangeError('Anhydrous molar mass must be greater than 0 and no more than 10,000 g/mol.');
  if (!Number.isInteger(waterMolecules) || waterMolecules < 1 || waterMolecules > 100) throw new RangeError('Water molecules must be a whole number from 1 to 100.');
  if (sampleMass !== null && (sampleMass <= 0 || sampleMass > 1000000)) throw new RangeError('Sample mass must be greater than 0 and no more than 1,000,000 g.');
  const waterMassPerMole = waterMolecules * WATER_MOLAR_MASS;
  const hydrateMolarMass = anhydrousMolarMass + waterMassPerMole;
  const percentWater = waterMassPerMole / hydrateMolarMass * 100;
  return {
    hydrateMolarMass,
    waterMassPerMole,
    percentWater,
    sampleWaterMass: sampleMass === null ? null : sampleMass * percentWater / 100,
    sampleAnhydrousMass: sampleMass === null ? null : sampleMass * (1 - percentWater / 100),
  };
}
