const finite = (value, label) => {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new RangeError(`Enter a valid ${label}.`);
  return number;
};

const integer = (value, label, min, max) => {
  const number = finite(value, label);
  if (!Number.isInteger(number) || number < min || number > max) {
    throw new RangeError(`${label} must be a whole number from ${min} to ${max}.`);
  }
  return number;
};

function parseDecimal(value) {
  const input = String(value).trim().replace(/−/g, '-');
  const match = input.match(/^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/);
  if (!match) throw new RangeError('Enter a decimal number, optionally using scientific notation.');
  const sign = match[1] === '-' ? '-' : '';
  const integerPart = match[2] ?? '0';
  const fractionPart = match[3] ?? match[4] ?? '';
  const exponent = Number(match[5] ?? 0);
  if (!Number.isInteger(exponent) || Math.abs(exponent) > 1000) throw new RangeError('Use a scientific-notation exponent from −1000 to 1000.');
  const rawDigits = integerPart + fractionPart;
  const firstNonzero = rawDigits.search(/[1-9]/);
  if (firstNonzero < 0) return { sign:'', digits:'0', exponent:0, inputSignificantFigures:Math.max(1, fractionPart.length) };
  const digits = rawDigits.slice(firstNonzero);
  return {
    sign,
    digits,
    exponent: integerPart.length + exponent - firstNonzero - digits.length,
    inputSignificantFigures: digits.length,
  };
}

function decimalFromDigits(sign, digits, exponent) {
  const position = digits.length + exponent;
  if (position <= 0) return `${sign}0.${'0'.repeat(-position)}${digits}`;
  if (position >= digits.length) return `${sign}${digits}${'0'.repeat(position - digits.length)}`;
  return `${sign}${digits.slice(0, position)}.${digits.slice(position)}`;
}

function scientificFromDigits(sign, digits, exponent) {
  const coefficient = digits.length === 1 ? digits : `${digits[0]}.${digits.slice(1)}`;
  return `${sign}${coefficient} × 10^${digits.length - 1 + exponent}`;
}

export function roundToSignificantFigures({ value, significantFigures }) {
  const target = integer(significantFigures, 'Significant figures', 1, 15);
  const parsed = parseDecimal(value);
  if (parsed.digits === '0') {
    const digits = `0${target > 1 ? `.${'0'.repeat(target - 1)}` : ''}`;
    return { rounded:digits, scientific:`${digits} × 10^0`, inputSignificantFigures:parsed.inputSignificantFigures, roundingRule:'half-even' };
  }

  let digits = parsed.digits;
  let exponent = parsed.exponent;
  if (digits.length > target) {
    const removed = digits.length - target;
    const kept = digits.slice(0, target);
    const discarded = digits.slice(target);
    const first = Number(discarded[0]);
    const restNonzero = /[1-9]/.test(discarded.slice(1));
    const lastKeptOdd = Number(kept.at(-1)) % 2 === 1;
    const roundUp = first > 5 || (first === 5 && (restNonzero || lastKeptOdd));
    let coefficient = BigInt(kept) + (roundUp ? 1n : 0n);
    exponent += removed;
    digits = coefficient.toString();
    if (digits.length > target) {
      digits = `1${'0'.repeat(target - 1)}`;
      exponent += 1;
    }
  } else if (digits.length < target) {
    const added = target - digits.length;
    digits += '0'.repeat(added);
    exponent -= added;
  }

  return {
    rounded: decimalFromDigits(parsed.sign, digits, exponent),
    scientific: scientificFromDigits(parsed.sign, digits, exponent),
    inputSignificantFigures: parsed.inputSignificantFigures,
    roundingRule:'half-even',
  };
}

function combination(n, k) {
  const use = Math.min(k, n - k);
  let result = 1;
  for (let index = 1; index <= use; index += 1) result = result * (n - use + index) / index;
  return result;
}

function binomialProbability(n, k, p) {
  if (p === 0) return k === 0 ? 1 : 0;
  if (p === 1) return k === n ? 1 : 0;
  return Math.exp(Math.log(combination(n, k)) + k * Math.log(p) + (n - k) * Math.log1p(-p));
}

export function calculateBinomialDistribution({ trials, successes, probabilityPercent, event = 'exact' }) {
  const n = integer(trials, 'Number of trials', 1, 1000);
  const x = integer(successes, 'Number of successes', 0, n);
  const percent = finite(probabilityPercent, 'Success probability');
  if (percent < 0 || percent > 100) throw new RangeError('Success probability must be from 0% to 100%.');
  if (!['exact','at-most','at-least'].includes(event)) throw new RangeError('Choose exact, at most, or at least.');
  const p = percent / 100;
  let atMost = 0;
  let atLeast = 0;
  for (let k = 0; k <= n; k += 1) {
    const probability = binomialProbability(n, k, p);
    if (k <= x) atMost += probability;
    if (k >= x) atLeast += probability;
  }
  const exact = binomialProbability(n, x, p);
  const selected = event === 'exact' ? exact : event === 'at-most' ? atMost : atLeast;
  return { selected, exact, atMost, atLeast, mean:n * p, standardDeviation:Math.sqrt(n * p * (1 - p)), event, n, x };
}

export function calculatePercentage({ mode = 'of', first, second }) {
  const a = finite(first, 'first value');
  const b = finite(second, 'second value');
  if (!['of','what-percent','change'].includes(mode)) throw new RangeError('Choose a supported percentage calculation.');
  if (mode === 'of') return { result:b * a / 100, difference:null, mode };
  if (mode === 'what-percent') {
    if (b === 0) throw new RangeError('The comparison value cannot be zero.');
    return { result:a / b * 100, difference:a - b, mode };
  }
  if (a === 0) throw new RangeError('The starting value cannot be zero for percentage change.');
  return { result:(b - a) / a * 100, difference:b - a, mode };
}

function formatNumber(value) {
  if (Math.abs(value) < 1e-12) return '0';
  if (Math.abs(value) >= 1e12 || Math.abs(value) < 1e-8) return value.toExponential(8).replace(/\.0+e/,'e').replace(/(\.\d*?)0+e/,'$1e');
  return Number(value.toPrecision(12)).toString();
}

export function expandBinomial({ a, b, exponent, k = '' }) {
  const first = finite(a, 'x coefficient');
  const second = finite(b, 'constant');
  const n = integer(exponent, 'Exponent', 0, 20);
  if (Math.abs(first) > 1e6 || Math.abs(second) > 1e6) throw new RangeError('Use coefficients between −1,000,000 and 1,000,000.');
  const selectedK = k === '' || k == null ? null : integer(k, 'Term index k', 0, n);
  const terms = [];
  const coefficients = [];
  for (let index = 0; index <= n; index += 1) {
    const power = n - index;
    const coefficient = combination(n, index) * first ** power * second ** index;
    coefficients.push(coefficient);
    if (Math.abs(coefficient) < 1e-12) continue;
    const negative = coefficient < 0;
    const absolute = Math.abs(coefficient);
    const coefficientText = power > 0 && Math.abs(absolute - 1) < 1e-12 ? '' : formatNumber(absolute);
    const variableText = power === 0 ? '' : power === 1 ? 'x' : `x^${power}`;
    const body = `${coefficientText}${variableText}` || '1';
    terms.push({ negative, body });
  }
  const expansion = terms.length ? terms.map((term,index) => `${index === 0 ? (term.negative ? '−' : '') : (term.negative ? ' − ' : ' + ')}${term.body}`).join('') : '0';
  return {
    expansion,
    coefficients,
    selectedCoefficient:selectedK === null ? null : coefficients[selectedK],
    selectedK,
    termCount:terms.length,
  };
}

export function parseStatisticsValues(value) {
  const text = Array.isArray(value) ? value.join(',') : String(value ?? '').trim();
  if (!text) throw new RangeError('Enter at least one number.');
  const parts = text.split(/[\s,;]+/).filter(Boolean);
  if (parts.length > 10000) throw new RangeError('Use no more than 10,000 values at a time.');
  const values = parts.map(part => Number(part));
  if (values.some(number => !Number.isFinite(number))) throw new RangeError('Every list item must be a valid number.');
  return values;
}

const median = sorted => {
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

export function calculateStatistics(value) {
  const values = parseStatisticsValues(value);
  const sorted = [...values].sort((a,b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((total, number) => total + number, 0);
  const mean = sum / count;
  const medianValue = median(sorted);
  const lower = sorted.slice(0, Math.floor(count / 2));
  const upper = sorted.slice(Math.ceil(count / 2));
  const q1 = lower.length ? median(lower) : sorted[0];
  const q3 = upper.length ? median(upper) : sorted.at(-1);
  const squared = sorted.reduce((total, number) => total + (number - mean) ** 2, 0);
  const populationVariance = squared / count;
  const sampleVariance = count > 1 ? squared / (count - 1) : null;
  const frequencies = new Map();
  for (const number of sorted) frequencies.set(number, (frequencies.get(number) ?? 0) + 1);
  const maxFrequency = Math.max(...frequencies.values());
  const modes = maxFrequency === 1 ? [] : [...frequencies].filter(([,frequency]) => frequency === maxFrequency).map(([number]) => number);
  return {
    count, sum, mean, median:medianValue, modes, min:sorted[0], max:sorted.at(-1), range:sorted.at(-1) - sorted[0],
    q1, q3, iqr:q3 - q1, populationVariance, populationStandardDeviation:Math.sqrt(populationVariance),
    sampleVariance, sampleStandardDeviation:sampleVariance === null ? null : Math.sqrt(sampleVariance),
  };
}
