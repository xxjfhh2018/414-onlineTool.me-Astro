export function calculateWeightedComposite(sections) {
  if (!Array.isArray(sections) || sections.length === 0) throw new RangeError('At least one section is required.');
  let composite = 0;
  let totalWeight = 0;
  const contributions = sections.map(({ label = 'Section', earned, possible, weight }) => {
    if (![earned, possible, weight].every(Number.isFinite) || earned < 0 || possible <= 0 || earned > possible || weight < 0) {
      throw new RangeError('Section scores and weights are invalid.');
    }
    const percentage = earned / possible * 100;
    const contribution = percentage * weight / 100;
    composite += contribution;
    totalWeight += weight;
    return { label, percentage, contribution };
  });
  return { composite, totalWeight, contributions };
}

export function estimateApScore(composite, cutScores) {
  if (!Number.isFinite(composite) || !Array.isArray(cutScores) || cutScores.length !== 4) throw new RangeError('Invalid AP score inputs.');
  return composite >= cutScores[0] ? 5 : composite >= cutScores[1] ? 4 : composite >= cutScores[2] ? 3 : composite >= cutScores[3] ? 2 : 1;
}

export function calculateCdInterest({ deposit, apyPercent, termMonths, penaltyMonths = 0 }) {
  if (![deposit, apyPercent, termMonths, penaltyMonths].every(Number.isFinite) || deposit <= 0 || apyPercent < 0 || termMonths <= 0 || penaltyMonths < 0) {
    throw new RangeError('Invalid CD inputs.');
  }
  const apy = apyPercent / 100;
  const maturity = deposit * Math.pow(1 + apy, termMonths / 12);
  const interest = maturity - deposit;
  const penalty = deposit * apy * penaltyMonths / 12;
  return { maturity, interest, penalty, afterPenalty: Math.max(0, maturity - penalty) };
}

export function calculateMoneyDuration({ startingBalance, monthlySpending, monthlyIncome = 0, annualReturnPercent = 0, annualInflationPercent = 0, timing = 'end', limitMonths = 1200 }) {
  if (![startingBalance, monthlySpending, monthlyIncome, annualReturnPercent, annualInflationPercent, limitMonths].every(Number.isFinite) || startingBalance <= 0 || monthlySpending < 0 || monthlyIncome < 0 || limitMonths <= 0 || !['start', 'end'].includes(timing)) {
    throw new RangeError('Invalid duration inputs.');
  }
  const monthlyReturn = Math.pow(1 + annualReturnPercent / 100, 1 / 12) - 1;
  const monthlyInflation = Math.pow(1 + annualInflationPercent / 100, 1 / 12) - 1;
  if (monthlySpending <= monthlyIncome && monthlyReturn >= 0 && annualInflationPercent <= 0) {
    return { status: 'no-depletion', months: Infinity, endingBalance: startingBalance, monthlyReturn, monthlyInflation };
  }
  let balance = startingBalance;
  let spending = monthlySpending;
  let months = 0;
  while (balance > 0 && months < limitMonths) {
    const net = spending - monthlyIncome;
    if (timing === 'start') balance -= net;
    if (balance <= 0) break;
    balance *= 1 + monthlyReturn;
    if (timing === 'end') balance -= net;
    spending *= 1 + monthlyInflation;
    months += 1;
  }
  return { status: months >= limitMonths && balance > 0 ? 'limit' : 'depleted', months, endingBalance: balance, monthlyReturn, monthlyInflation };
}
