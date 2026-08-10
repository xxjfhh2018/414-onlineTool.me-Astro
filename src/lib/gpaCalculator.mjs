export const GPA_GRADE_POINTS = Object.freeze({ 'A+': 4, A: 4, 'A-': 3.7, 'B+': 3.3, B: 3, 'B-': 2.7, 'C+': 2.3, C: 2, 'C-': 1.7, 'D+': 1.3, D: 1, 'D-': 0.7, F: 0 });
export const GPA_LEVEL_BONUSES = Object.freeze({ regular: 0, honors: 0.5, ap: 1 });

export function calculateGpa(rows, prior = {}) {
  let creditsTotal = 0;
  let unweightedPoints = 0;
  let weightedPoints = 0;
  let courses = 0;
  for (const row of rows) {
    const grade = row.grade ?? '';
    if (!grade) continue;
    const credits = Number(row.credits);
    const level = row.level || 'regular';
    if (!(grade in GPA_GRADE_POINTS) || !Number.isFinite(credits) || credits <= 0 || !(level in GPA_LEVEL_BONUSES)) {
      throw new RangeError('Select a valid grade and enter credits greater than zero for every started course.');
    }
    creditsTotal += credits;
    unweightedPoints += GPA_GRADE_POINTS[grade] * credits;
    weightedPoints += (GPA_GRADE_POINTS[grade] + GPA_LEVEL_BONUSES[level]) * credits;
    courses += 1;
  }
  if (!courses) return null;

  const priorGpaBlank = prior.gpa === '' || prior.gpa === null || prior.gpa === undefined;
  const priorCreditsBlank = prior.credits === '' || prior.credits === null || prior.credits === undefined;
  if (priorGpaBlank !== priorCreditsBlank) throw new RangeError('Enter both prior GPA and prior credits, or leave both blank.');
  let cumulativeGpa = null;
  let cumulativeCredits = null;
  if (!priorGpaBlank) {
    const priorGpa = Number(prior.gpa);
    const priorCredits = Number(prior.credits);
    if (!Number.isFinite(priorGpa) || priorGpa < 0 || priorGpa > 4 || !Number.isFinite(priorCredits) || priorCredits <= 0) {
      throw new RangeError('Prior GPA must be from 0 to 4, and prior credits must be greater than zero.');
    }
    cumulativeCredits = priorCredits + creditsTotal;
    cumulativeGpa = (priorGpa * priorCredits + unweightedPoints) / cumulativeCredits;
  }
  return {
    creditsTotal,
    unweightedGpa: unweightedPoints / creditsTotal,
    weightedGpa: weightedPoints / creditsTotal,
    cumulativeGpa,
    cumulativeCredits,
    courses,
  };
}
