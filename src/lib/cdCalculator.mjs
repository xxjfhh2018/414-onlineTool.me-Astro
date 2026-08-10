export function validateCdGrowthInput({ principal, termMonths, annualRatePercent, compoundsPerYear }) {
  return [principal, termMonths, annualRatePercent, compoundsPerYear].every(Number.isFinite)
    && principal > 0
    && termMonths > 0
    && annualRatePercent >= 0
    && compoundsPerYear > 0;
}

export function calculateCdGrowth({ principal, termMonths, annualRatePercent, compoundsPerYear }) {
  const input = {
    principal: Number(principal),
    termMonths: Number(termMonths),
    annualRatePercent: Number(annualRatePercent),
    compoundsPerYear: Number(compoundsPerYear),
  };
  if (!validateCdGrowthInput(input)) {
    throw new RangeError('CD growth inputs are outside the supported range.');
  }

  const years = input.termMonths / 12;
  const annualRate = input.annualRatePercent / 100;
  const maturityValue = input.principal
    * Math.pow(1 + annualRate / input.compoundsPerYear, input.compoundsPerYear * years);
  const interestEarned = maturityValue - input.principal;
  const effectiveAnnualYield = (Math.pow(maturityValue / input.principal, 1 / years) - 1) * 100;
  const growthPercent = interestEarned / input.principal * 100;

  return {
    years,
    maturityValue,
    interestEarned,
    effectiveAnnualYield,
    growthPercent,
  };
}
