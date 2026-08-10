const isBlank = value => value === '' || value === null || value === undefined;

export function commonLetterGrade(value) {
  return value >= 90 ? 'A' : value >= 80 ? 'B' : value >= 70 ? 'C' : value >= 60 ? 'D' : 'F';
}

export function calculatePointsGrade(rows) {
  let earnedTotal = 0;
  let possibleTotal = 0;
  let validRows = 0;
  for (const row of rows) {
    if (isBlank(row.earned) && isBlank(row.possible)) continue;
    if (isBlank(row.earned) || isBlank(row.possible)) {
      throw new RangeError('Complete both earned and possible points for each started row.');
    }
    const earned = Number(row.earned);
    const possible = Number(row.possible);
    if (!Number.isFinite(earned) || earned < 0 || !Number.isFinite(possible) || possible <= 0) {
      throw new RangeError('Points earned must be 0 or more, and points possible must be greater than 0.');
    }
    earnedTotal += earned;
    possibleTotal += possible;
    validRows += 1;
  }
  if (!validRows) return null;
  const grade = earnedTotal / possibleTotal * 100;
  return { earnedTotal, possibleTotal, grade, letterGrade: commonLetterGrade(grade), validRows };
}

export function calculateWeightedGrade(rows) {
  let weightedPoints = 0;
  let totalWeight = 0;
  let validRows = 0;
  for (const row of rows) {
    if (isBlank(row.grade) && isBlank(row.weight)) continue;
    if (isBlank(row.grade) || isBlank(row.weight)) {
      throw new RangeError('Complete both grade and weight for each started category.');
    }
    const grade = Number(row.grade);
    const weight = Number(row.weight);
    if (!Number.isFinite(grade) || grade < 0 || !Number.isFinite(weight) || weight <= 0) {
      throw new RangeError('Category grades must be 0 or more, and category weights must be greater than 0.');
    }
    weightedPoints += grade * weight / 100;
    totalWeight += weight;
    validRows += 1;
  }
  if (!validRows) return null;
  const normalizedGrade = weightedPoints / totalWeight * 100;
  return {
    weightedPoints,
    totalWeight,
    normalizedGrade,
    letterGrade: commonLetterGrade(normalizedGrade),
    isCompleteWeight: Math.abs(totalWeight - 100) < 0.001,
    validRows,
  };
}

export function calculateRequiredFinal({ currentGrade, targetGrade, finalWeightPercent }) {
  const current = Number(currentGrade);
  const target = Number(targetGrade);
  const weightPercent = Number(finalWeightPercent);
  if (![current, target, weightPercent].every(Number.isFinite) || current < 0 || target < 0 || weightPercent <= 0 || weightPercent > 100) {
    throw new RangeError('Enter valid percentages. Final exam weight must be greater than 0% and no more than 100%.');
  }
  const weight = weightPercent / 100;
  const required = (target - current * (1 - weight)) / weight;
  const maximumCourseGrade = current * (1 - weight) + 100 * weight;
  return { required, displayedRequired: Math.max(0, required), maximumCourseGrade };
}
