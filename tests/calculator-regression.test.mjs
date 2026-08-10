import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { calculateCdInterest, calculateMoneyDuration, calculateWeightedComposite, estimateApScore, evaluateDynastyTrade } from '../src/lib/calculatorCore.mjs';
import { buildEvenSplits, convertSwimTime, formatSwimTime, parseSwimTime } from '../src/lib/swimTimeConverter.mjs';
import { FFMI_CONSTANTS, calculateFfmi, validateFfmiInput } from '../src/lib/ffmiCalculator.mjs';
import { calculateCdGrowth, validateCdGrowthInput } from '../src/lib/cdCalculator.mjs';
import { calculatePointsGrade, calculateRequiredFinal, calculateWeightedGrade } from '../src/lib/gradeCalculator.mjs';
import { calculateGpa } from '../src/lib/gpaCalculator.mjs';
import { AP_SCORE_CONFIGS, calculateApPracticeScore, getApVersion, validateApVersion } from '../src/lib/apScoreVersions.mjs';
import { advancePomodoro, createPomodoroState, formatPomodoroTime, pausePomodoro, pomodoroElapsedPercent, resetPomodoro, startPomodoro, validatePomodoroSettings } from '../src/lib/pomodoroTimer.mjs';
import { calculateCinderBlocks, calculateLsacGpa, calculateLsatScore, calculateVdot, calculateWattsToAmps } from '../src/lib/dailyBatchCalculators.mjs';

const closeTo = (actual, expected, tolerance = 0.005) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

test('FFMI formula preserves the existing metric example and displayed precision', () => {
  const result = calculateFfmi({ unitSystem: 'metric', weight: 82, height: 180, bodyFat: 15 });
  closeTo(result.leanKg, 69.7, 1e-10);
  closeTo(result.ffmi, 21.512345679012345, 1e-10);
  closeTo(result.normalizedFfmi, 21.512345679012345, 1e-10);
  assert.equal(result.ffmi.toFixed(2), '21.51');
  assert.equal(result.leanKg.toFixed(1), '69.7');
  assert.equal(result.normalizedFfmi.toFixed(2), '21.51');
});

test('FFMI formula preserves US conversion, normalization, and supported boundaries', () => {
  const result = calculateFfmi({ unitSystem: 'us', weight: 181, height: 70.9, bodyFat: 15 });
  closeTo(result.ffmi, 21.518071068904092, 1e-10);
  closeTo(result.normalizedFfmi, 21.512653068904093, 1e-10);
  assert.equal((result.leanKg * FFMI_CONSTANTS.poundsPerKilogram).toFixed(1), '153.8');
  assert.equal(validateFfmiInput({ unitSystem: 'metric', weight: 80, height: 180, bodyFat: 0 }), true);
  assert.equal(validateFfmiInput({ unitSystem: 'metric', weight: 351, height: 180, bodyFat: 15 }), false);
  assert.throws(() => calculateFfmi({ unitSystem: 'metric', weight: 351, height: 180, bodyFat: 15 }), RangeError);
});

test('CD Formula template preserves the existing compound-growth result', () => {
  const result = calculateCdGrowth({ principal: 10000, termMonths: 12, annualRatePercent: 4.5, compoundsPerYear: 12 });
  closeTo(result.maturityValue, 10459.398250405895, 1e-10);
  closeTo(result.interestEarned, 459.39825040589494, 1e-10);
  closeTo(result.effectiveAnnualYield, 4.593982504058958, 1e-10);
  assert.equal(result.maturityValue.toFixed(2), '10459.40');
  assert.equal(result.interestEarned.toFixed(2), '459.40');
  assert.equal(result.effectiveAnnualYield.toFixed(2), '4.59');
});

test('CD Formula template handles zero rate and invalid deposit states', () => {
  const zeroRate = calculateCdGrowth({ principal: 10000, termMonths: 60, annualRatePercent: 0, compoundsPerYear: 12 });
  assert.equal(zeroRate.maturityValue, 10000);
  assert.equal(zeroRate.interestEarned, 0);
  assert.equal(zeroRate.effectiveAnnualYield, 0);
  assert.equal(validateCdGrowthInput({ principal: 0, termMonths: 12, annualRatePercent: 4.5, compoundsPerYear: 12 }), false);
  assert.throws(() => calculateCdGrowth({ principal: 0, termMonths: 12, annualRatePercent: 4.5, compoundsPerYear: 12 }), RangeError);
});

test('Multi-row Grade template handles blank, half-complete, partial-weight, and final-grade rows', () => {
  const points = calculatePointsGrade([{ earned: 80, possible: 100 }, { earned: '', possible: '' }, { earned: 45, possible: 50 }]);
  closeTo(points.grade, 83.3333333333);
  assert.throws(() => calculatePointsGrade([{ earned: 80, possible: '' }]), /Complete both/);
  const weighted = calculateWeightedGrade([{ grade: 90, weight: 30 }, { grade: 80, weight: 20 }]);
  assert.equal(weighted.totalWeight, 50);
  assert.equal(weighted.weightedPoints, 43);
  assert.equal(weighted.normalizedGrade, 86);
  assert.equal(weighted.isCompleteWeight, false);
  closeTo(calculateRequiredFinal({ currentGrade: 87, targetGrade: 90, finalWeightPercent: 30 }).required, 97, 1e-10);
});

test('Multi-row GPA reuse preserves credit weighting, bonuses, and paired prior fields', () => {
  const result = calculateGpa([{ grade: 'A', credits: 3, level: 'regular' }, { grade: 'B', credits: 1, level: 'ap' }]);
  assert.equal(result.unweightedGpa, 3.75);
  assert.equal(result.weightedGpa, 4);
  const cumulative = calculateGpa([{ grade: 'A', credits: 3, level: 'regular' }], { gpa: 3.5, credits: 9 });
  assert.equal(cumulative.cumulativeGpa, 3.625);
  assert.throws(() => calculateGpa([{ grade: 'A', credits: 1, level: 'regular' }], { gpa: 3.5, credits: '' }), /both prior GPA/);
});

test('Versioned Lookup AP data keeps versions, sources, weights, and cutoffs internally consistent', () => {
  for (const [course, config] of Object.entries(AP_SCORE_CONFIGS)) {
    assert.ok(config.versions[config.currentVersion], `${course} current version is missing`);
    for (const [versionId, version] of Object.entries(config.versions)) {
      assert.equal(validateApVersion(version), true, `${course}/${versionId} is invalid`);
      assert.match(version.source.url, /^https:\/\/apcentral\.collegeboard\.org\//);
    }
  }
  const currentAb = getApVersion('ap-calculus-ab-score-calculator');
  const legacyAb = getApVersion('ap-calculus-ab-score-calculator', 'may-2026');
  assert.equal(currentAb.versionId, 'may-2027');
  assert.equal(currentAb.version.sections[0].possible, 42);
  assert.equal(legacyAb.version.sections[0].possible, 45);
});

test('Versioned Lookup AP calculation uses the selected version and visible cutoffs', () => {
  const { version } = getApVersion('ap-calculus-ab-score-calculator', 'may-2027');
  const result = calculateApPracticeScore({ version, earnedPoints: [21, 27] });
  assert.equal(result.normalized, 50);
  assert.equal(result.predictedScore, 3);
  assert.throws(() => calculateApPracticeScore({ version, earnedPoints: [43, 27] }), RangeError);
  assert.throws(() => calculateApPracticeScore({ version, earnedPoints: [21, 27], cutScoreOverrides: [60, 70, 40, 30] }), /descend/);
});

test('AP Biology uses the official 60 MCQ / 34 FRQ structure', () => {
  const result = calculateWeightedComposite([
    { label: 'MCQ', earned: 48, possible: 60, weight: 50 },
    { label: 'FRQ', earned: 25, possible: 34, weight: 50 },
  ]);
  closeTo(result.composite, 76.76470588);
  assert.equal(estimateApScore(result.composite, [78, 63, 48, 34]), 4);
});

test('May 2027 AP Calculus format gives equal section weight', () => {
  const result = calculateWeightedComposite([
    { label: 'MCQ', earned: 21, possible: 42, weight: 50 },
    { label: 'FRQ', earned: 27, possible: 54, weight: 50 },
  ]);
  assert.equal(result.composite, 50);
  assert.deepEqual(result.contributions.map(item => item.contribution), [25, 25]);
});

test('CD example calculates APY growth and entered penalty separately', () => {
  const result = calculateCdInterest({ deposit: 10000, apyPercent: 4.5, termMonths: 12, penaltyMonths: 3 });
  closeTo(result.maturity, 10450);
  closeTo(result.interest, 450);
  closeTo(result.penalty, 112.5);
  closeTo(result.afterPenalty, 10337.5);
});

test('money duration handles exact monthly depletion', () => {
  assert.equal(calculateMoneyDuration({ startingBalance: 12000, monthlySpending: 1000 }).months, 12);
  assert.equal(calculateMoneyDuration({ startingBalance: 12000, monthlySpending: 1200 }).months, 10);
  assert.equal(calculateMoneyDuration({ startingBalance: 12000, monthlySpending: 1000, monthlyIncome: 1000 }).status, 'no-depletion');
});

test('dynasty trade verdict follows the value received and preserves the 10% fair threshold', () => {
  assert.deepEqual(evaluateDynastyTrade(100, 94), {
    percentage: 6,
    verdict: 'Fair Trade',
    gapContext: 'numerically close',
  });
  assert.equal(evaluateDynastyTrade(80, 100).verdict, 'Favors You');
  assert.equal(evaluateDynastyTrade(100, 80).verdict, 'Favors Other Side');
  assert.equal(evaluateDynastyTrade(100, 80).gapContext, 'noticeable value difference');
  assert.equal(evaluateDynastyTrade(100, 70).gapContext, 'strong value difference');
});

test('Palworld 1.0 dataset provenance, counts, and known breeding pairs remain unchanged', async () => {
  const raw = await readFile(new URL('../public/data/palworld-breeding-1.0.json', import.meta.url));
  const data = JSON.parse(raw);
  assert.equal(data.schemaVersion, 1);
  assert.equal(data.dataset.game_version, '1.0.0');
  assert.equal(data.dataset.public_game_version, '1.0.1');
  assert.equal(data.dataset.compatibility_status, 'verified');
  assert.equal(data.dataset.source_revision, '8b7e2f779e47fddae16ddcb973e828ba20c02b80');
  assert.equal(data.dataset.source_sha256, '9f558802ed3fa14b52c352d18a05cd40b295e636ccca249376293e80dc1643c4');
  assert.equal(data.pals.length, 299);
  assert.equal(data.recipes.length, 44851);
  assert.equal(data.recipes.filter(recipe => recipe[3] === 1).length, 248);

  const names = new Map(data.pals);
  const pair = (a, b) => data.recipes.filter(recipe => recipe[0] === [a, b].sort()[0] && recipe[1] === [a, b].sort()[1]).map(recipe => names.get(recipe[2])).sort();
  assert.deepEqual(pair('chikipi', 'cremis'), ['Foxparks']);
  assert.deepEqual(pair('foxparks', 'hangyu'), ['Cremis']);
  assert.deepEqual(pair('cattiva', 'daedream'), ['Swee']);
  assert.deepEqual(pair('relaxaurus', 'sparkit'), ['Relaxaurus Lux']);

});

test('swim time conversion matches NCAA sample factors and reverse conversion', () => {
  const publishedExample = convertSwimTime({ timeSeconds: 136.71, eventKey: '200-breast', sex: 'men', fromCourse: 'LCM', toCourse: 'SCY' });
  assert.equal(publishedExample.convertedSeconds, 117.29);
  assert.equal(formatSwimTime(publishedExample.convertedSeconds), '1:57.29');

  const lcmToScy = convertSwimTime({ timeSeconds: 60, eventKey: '100-free', sex: 'men', fromCourse: 'LCM', toCourse: 'SCY' });
  assert.equal(lcmToScy.convertedSeconds, 51.78);
  assert.equal(formatSwimTime(lcmToScy.convertedSeconds), '0:51.78');

  const scyToLcm = convertSwimTime({ timeSeconds: 51.78, eventKey: '100-free', sex: 'men', fromCourse: 'SCY', toCourse: 'LCM' });
  assert.equal(scyToLcm.convertedSeconds, 60);
  assert.equal(convertSwimTime({ timeSeconds: 60, eventKey: '100-free', sex: 'women', fromCourse: 'SCM', toCourse: 'SCY' }).convertedSeconds, 53.76);
});

test('swim time parser, validation, and even splits cover boundary states', () => {
  assert.equal(parseSwimTime('1:02.35'), 62.35);
  assert.equal(parseSwimTime('58.42'), 58.42);
  assert.ok(Number.isNaN(parseSwimTime('1:60.00')));
  assert.throws(() => convertSwimTime({ timeSeconds: 0, eventKey: '100-free', sex: 'men', fromCourse: 'LCM', toCourse: 'SCY' }), RangeError);
  assert.deepEqual(buildEvenSplits(60, 100, 50), [
    { distance: 50, splitSeconds: 30, cumulativeSeconds: 30 },
    { distance: 100, splitSeconds: 30, cumulativeSeconds: 60 },
  ]);
});

test('Custom Pomodoro scaffold derives countdown time from timestamps and preserves pause state', () => {
  let state = createPomodoroState({ workMinutes: 25, breakMinutes: 5 });
  assert.equal(state.remainingSeconds, 1500);
  assert.equal(formatPomodoroTime(state.remainingSeconds), '25:00');
  assert.equal(pomodoroElapsedPercent(state), 0);

  state = startPomodoro(state, 1_000);
  state = advancePomodoro(state, 61_000);
  assert.equal(state.remainingSeconds, 1440);
  assert.equal(formatPomodoroTime(state.remainingSeconds), '24:00');
  state = pausePomodoro(state, 61_500);
  assert.equal(state.remainingSeconds, 1440);
  assert.equal(state.status, 'Paused');
  assert.equal(state.running, false);
});

test('Custom Pomodoro scaffold validates settings and prepares each next interval without autoplay', () => {
  let state = createPomodoroState({ workMinutes: 1, breakMinutes: 1 });
  state = advancePomodoro(startPomodoro(state, 0), 60_000);
  assert.equal(state.mode, 'break');
  assert.equal(state.remainingSeconds, 60);
  assert.equal(state.completedFocusSessions, 1);
  assert.equal(state.status, 'Focus complete — break ready');
  assert.equal(state.running, false);

  state = advancePomodoro(startPomodoro(state, 60_000), 120_000);
  assert.equal(state.mode, 'focus');
  assert.equal(state.completedFocusSessions, 1);
  assert.equal(state.status, 'Break complete — focus ready');
  assert.equal(resetPomodoro(state).completedFocusSessions, 1);
  assert.equal(validatePomodoroSettings({ workMinutes: 0, breakMinutes: 5 }), false);
  assert.throws(() => createPomodoroState({ workMinutes: 0, breakMinutes: 5 }), RangeError);
});

test('LSAC GPA uses the published conversion values and credit weighting', () => {
  const result = calculateLsacGpa([{ grade: 'A+', credits: 3 }, { grade: 'B', credits: 4 }, { grade: 'C-', credits: 2 }]);
  closeTo(result.qualityPoints, 28.33, 1e-10);
  closeTo(result.gpa, 28.33 / 9, 1e-10);
  assert.equal(result.courseCount, 3);
  assert.throws(() => calculateLsacGpa([{ grade: 'A', credits: 0 }]), RangeError);
});

test('April 2022 LSAT lookup preserves official disclosed conversion boundaries', () => {
  assert.equal(calculateLsatScore(75).scaledScore, 180);
  assert.equal(calculateLsatScore(50).scaledScore, 156);
  assert.equal(calculateLsatScore(14).scaledScore, 120);
  assert.equal(calculateLsatScore(0).scaledScore, 120);
  assert.throws(() => calculateLsatScore(75.5), RangeError);
});

test('cinder block calculator applies modular face area and waste before rounding up', () => {
  const result = calculateCinderBlocks({ lengthFeet: 20, heightFeet: 8, wastePercent: 5 });
  closeTo(result.baseBlocks, 180, 1e-10);
  assert.equal(result.totalBlocks, 189);
  assert.throws(() => calculateCinderBlocks({ lengthFeet: 10, heightFeet: 8, openingsSquareFeet: 80 }), RangeError);
});

test('VDOT calculator reproduces a 20-minute 5K estimate and pace outputs', () => {
  const result = calculateVdot({ distanceMetres: 5000, minutes: 20 });
  closeTo(result.vdot, 49.806233428, 0.00001);
  closeTo(result.pacePerKmSeconds, 240, 1e-10);
  assert.throws(() => calculateVdot({ distanceMetres: 100, minutes: 1 }), RangeError);
});

test('watts-to-amps calculator covers DC, single-phase, and balanced three-phase power', () => {
  closeTo(calculateWattsToAmps({ phase: 'dc', watts: 1200, volts: 120 }).amps, 10, 1e-10);
  closeTo(calculateWattsToAmps({ phase: 'single', watts: 1800, volts: 120, powerFactor: 0.9 }).amps, 16.6666667, 1e-7);
  closeTo(calculateWattsToAmps({ phase: 'three', watts: 10000, volts: 400, powerFactor: 0.8 }).amps, 18.0421959, 1e-7);
  assert.throws(() => calculateWattsToAmps({ phase: 'single', watts: 1000, volts: 120, powerFactor: 0 }), RangeError);
});

test('every published tool has a centralized registry entry', async () => {
  const toolFiles = (await readdir(new URL('../src/content/tools/', import.meta.url)))
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
  const registrySource = await readFile(new URL('../src/data/toolRegistry.ts', import.meta.url), 'utf8');
  for (const slug of toolFiles) {
    assert.match(registrySource, new RegExp(`['"]${slug}['"]\\s*:`), `Missing registry entry for ${slug}`);
  }
});
