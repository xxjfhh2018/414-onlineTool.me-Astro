const finite = (value, label) => {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new RangeError(`Enter a valid ${label}.`);
  return number;
};

export function calculateAudiobook({ hours = 0, minutes = 0, playbackSpeed }) {
  const h = finite(hours, 'hour value');
  const m = finite(minutes, 'minute value');
  const speed = finite(playbackSpeed, 'playback speed');
  if (h < 0 || m < 0 || m >= 60 || speed < 0.25 || speed > 4 || h + m === 0) {
    throw new RangeError('Enter a duration above zero, minutes from 0 to 59, and a speed from 0.25× to 4×.');
  }
  const originalMinutes = h * 60 + m;
  const adjustedMinutes = originalMinutes / speed;
  return { originalMinutes, adjustedMinutes, timeSavedMinutes: originalMinutes - adjustedMinutes, speed };
}

export function calculateRpm({ revolutions, time, timeUnit = 'seconds' }) {
  const rev = finite(revolutions, 'revolution count');
  const duration = finite(time, 'time');
  const minuteFactors = { seconds: 1 / 60, minutes: 1, hours: 60 };
  if (rev < 0 || duration <= 0 || !minuteFactors[timeUnit]) throw new RangeError('Enter zero or more revolutions, a time above zero, and a supported time unit.');
  const elapsedMinutes = duration * minuteFactors[timeUnit];
  const rpm = rev / elapsedMinutes;
  return { rpm, hertz: rpm / 60, radiansPerSecond: rpm * 2 * Math.PI / 60, secondsPerRevolution: rpm === 0 ? Infinity : 60 / rpm };
}

export function calculateFoc({ arrowLength, balancePoint }) {
  const length = finite(arrowLength, 'arrow length');
  const balance = finite(balancePoint, 'balance point');
  if (length <= 0 || balance < 0 || balance > length) throw new RangeError('Arrow length must be above zero, and the balance point must fall between the nock groove and shaft end.');
  const midpoint = length / 2;
  const forwardDistance = balance - midpoint;
  return { focPercent: 100 * forwardDistance / length, midpoint, forwardDistance };
}

const fullnessFractions = { full: 1, 'three-quarter': 0.75, half: 0.5, quarter: 0.25 };
export function calculateCircleSkirt({ waistCircumference, skirtLength, fullness = 'full' }) {
  const waist = finite(waistCircumference, 'waist circumference');
  const length = finite(skirtLength, 'skirt length');
  const fraction = fullnessFractions[fullness];
  if (waist <= 0 || length <= 0 || !fraction) throw new RangeError('Enter positive waist and skirt-length measurements and choose a supported fullness.');
  const waistRadius = waist / (2 * Math.PI * fraction);
  return { waistRadius, outerRadius: waistRadius + length, fullnessFraction: fraction, arcAngle: 360 * fraction };
}

export function calculateLinearInterpolation({ x1, y1, x2, y2, targetX }) {
  const ax = finite(x1, 'first x value');
  const ay = finite(y1, 'first y value');
  const bx = finite(x2, 'second x value');
  const by = finite(y2, 'second y value');
  const x = finite(targetX, 'target x value');
  if (ax === bx) throw new RangeError('The two x values must be different.');
  const position = (x - ax) / (bx - ax);
  const slope = (by - ay) / (bx - ax);
  return { y: ay + position * (by - ay), slope, position, isExtrapolation: position < 0 || position > 1 };
}
