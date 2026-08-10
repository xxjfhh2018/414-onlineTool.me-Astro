export const SWIM_COURSES = {
  SCY: { label: 'SCY — 25-yard pool', unit: 'yd' },
  SCM: { label: 'SCM — 25-meter pool', unit: 'm' },
  LCM: { label: 'LCM — 50-meter pool', unit: 'm' },
};

export const SWIM_EVENTS = [
  { key: '50-free', label: '50 Freestyle', distances: { SCY: 50, SCM: 50, LCM: 50 }, scmToScy: 0.896, lcmToScy: { men: 0.860, women: 0.871 } },
  { key: '100-free', label: '100 Freestyle', distances: { SCY: 100, SCM: 100, LCM: 100 }, scmToScy: 0.896, lcmToScy: { men: 0.863, women: 0.874 } },
  { key: '200-free', label: '200 Freestyle', distances: { SCY: 200, SCM: 200, LCM: 200 }, scmToScy: 0.896, lcmToScy: { men: 0.865, women: 0.874 } },
  { key: '400-500-free', label: '400 m / 500 yd Freestyle', distances: { SCY: 500, SCM: 400, LCM: 400 }, scmToScy: 1.143, lcmToScy: { men: 1.105, women: 1.112 } },
  { key: '800-1000-free', label: '800 m / 1,000 yd Freestyle', distances: { SCY: 1000, SCM: 800, LCM: 800 }, scmToScy: 1.143, lcmToScy: { men: 1.105, women: 1.120 } },
  { key: '1500-1650-free', label: '1,500 m / 1,650 yd Freestyle', distances: { SCY: 1650, SCM: 1500, LCM: 1500 }, scmToScy: 1.003, lcmToScy: { men: 0.965, women: 0.975 } },
  { key: '100-fly', label: '100 Butterfly', distances: { SCY: 100, SCM: 100, LCM: 100 }, scmToScy: 0.896, lcmToScy: { men: 0.868, women: 0.877 } },
  { key: '200-fly', label: '200 Butterfly', distances: { SCY: 200, SCM: 200, LCM: 200 }, scmToScy: 0.896, lcmToScy: { men: 0.866, women: 0.881 } },
  { key: '100-back', label: '100 Backstroke', distances: { SCY: 100, SCM: 100, LCM: 100 }, scmToScy: 0.896, lcmToScy: { men: 0.835, women: 0.853 } },
  { key: '200-back', label: '200 Backstroke', distances: { SCY: 200, SCM: 200, LCM: 200 }, scmToScy: 0.896, lcmToScy: { men: 0.849, women: 0.857 } },
  { key: '100-breast', label: '100 Breaststroke', distances: { SCY: 100, SCM: 100, LCM: 100 }, scmToScy: 0.896, lcmToScy: { men: 0.856, women: 0.870 } },
  { key: '200-breast', label: '200 Breaststroke', distances: { SCY: 200, SCM: 200, LCM: 200 }, scmToScy: 0.896, lcmToScy: { men: 0.858, women: 0.878 } },
  { key: '200-im', label: '200 Individual Medley', distances: { SCY: 200, SCM: 200, LCM: 200 }, scmToScy: 0.896, lcmToScy: { men: 0.857, women: 0.867 } },
  { key: '400-im', label: '400 Individual Medley', distances: { SCY: 400, SCM: 400, LCM: 400 }, scmToScy: 0.896, lcmToScy: { men: 0.865, women: 0.876 } },
];

const eventMap = new Map(SWIM_EVENTS.map(event => [event.key, event]));

export function parseSwimTime(value) {
  const input = String(value ?? '').trim();
  if (!input) return null;
  if (!/^\d+(?::\d{1,2})?(?::\d{1,2})?(?:\.\d{1,2})?$/.test(input)) return NaN;
  const parts = input.split(':').map(Number);
  if (parts.some(part => !Number.isFinite(part))) return NaN;
  if (parts.length > 1 && parts.slice(1).some(part => part >= 60)) return NaN;
  const seconds = parts.reduce((total, part) => total * 60 + part, 0);
  return seconds > 0 ? seconds : NaN;
}

export function truncateToHundredth(value) {
  return Math.floor((value + 1e-9) * 100) / 100;
}

export function formatSwimTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '—';
  const hundredths = Math.round(seconds * 100);
  const wholeSeconds = Math.floor(hundredths / 100);
  const fraction = hundredths % 100;
  const minutes = Math.floor(wholeSeconds / 60);
  const remainder = wholeSeconds % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}.${String(fraction).padStart(2, '0')}`;
}

function toScyFactor(event, course, sex) {
  if (course === 'SCY') return 1;
  if (course === 'SCM') return event.scmToScy;
  return event.lcmToScy[sex];
}

export function convertSwimTime({ timeSeconds, eventKey, sex, fromCourse, toCourse }) {
  if (!Number.isFinite(timeSeconds) || timeSeconds <= 0) throw new RangeError('Swim time must be greater than zero.');
  if (!['men', 'women'].includes(sex)) throw new RangeError('Select men or women.');
  if (!SWIM_COURSES[fromCourse] || !SWIM_COURSES[toCourse]) throw new RangeError('Select valid pool courses.');
  const event = eventMap.get(eventKey);
  if (!event) throw new RangeError('Select a supported event.');

  const sourceFactor = toScyFactor(event, fromCourse, sex);
  const targetFactor = toScyFactor(event, toCourse, sex);
  const rawSeconds = timeSeconds * sourceFactor / targetFactor;
  const convertedSeconds = truncateToHundredth(rawSeconds);

  return {
    convertedSeconds,
    multiplier: sourceFactor / targetFactor,
    sourceFactor,
    targetFactor,
    sourceDistance: event.distances[fromCourse],
    targetDistance: event.distances[toCourse],
    sourceUnit: SWIM_COURSES[fromCourse].unit,
    targetUnit: SWIM_COURSES[toCourse].unit,
    event,
  };
}

export function buildEvenSplits(totalSeconds, distance, interval) {
  if (![totalSeconds, distance, interval].every(Number.isFinite) || totalSeconds <= 0 || distance <= 0 || interval <= 0) {
    throw new RangeError('Split inputs must be greater than zero.');
  }
  const rows = [];
  for (let mark = interval; mark < distance; mark += interval) {
    rows.push({ distance: mark, splitSeconds: totalSeconds * interval / distance, cumulativeSeconds: totalSeconds * mark / distance });
  }
  const finalSegment = distance % interval || interval;
  rows.push({ distance, splitSeconds: totalSeconds * finalSegment / distance, cumulativeSeconds: totalSeconds });
  return rows;
}
