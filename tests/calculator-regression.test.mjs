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
import { calculateBowlingScore, calculateLinearFeet, calculateRebarGrid, calculateTankVolume, decomposePartialFraction } from '../src/lib/dailyBatch260811.mjs';
import { calculateBricks, calculateCrossStitch, calculateDunk, calculateFurnaceSize, calculateSnowboardSize } from '../src/lib/dailyBatch260812.mjs';
import { calculateAudiobook, calculateCircleSkirt, calculateFoc, calculateLinearInterpolation, calculateRpm } from '../src/lib/dailyBatch260813.mjs';
import { calculateEdpi, calculatePartialDerivative, calculateRoth401k, calculateSchdScenario, calculateTirePressureTemperature } from '../src/lib/dailyBatch260814.mjs';

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

test('linear feet calculator totals mixed item rows and exact unit conversions', () => {
  const result = calculateLinearFeet([{ quantity: 8, feet: 6, inches: 6 }, { quantity: 2, feet: 4, inches: 0 }]);
  closeTo(result.totalFeet, 60, 1e-10);
  closeTo(result.totalMetres, 18.288, 1e-10);
  assert.equal(result.pieceCount, 10);
  assert.throws(() => calculateLinearFeet([{ quantity: 1, feet: 2, inches: 12 }]), RangeError);
});

test('rebar grid calculator preserves spacing, cover, layers, and waste', () => {
  const result = calculateRebarGrid({ lengthFeet: 20, widthFeet: 10, spacingInches: 18, coverInches: 3, wastePercent: 10, layers: 1 });
  assert.equal(result.barsRunningLength, 8);
  assert.equal(result.barsRunningWidth, 14);
  closeTo(result.installedFeet, 289, 1e-10);
  assert.equal(result.purchaseFeet, 318);
  assert.throws(() => calculateRebarGrid({ lengthFeet: 1, widthFeet: 1, spacingInches: 12, coverInches: 6 }), RangeError);
});

test('bowling score calculator covers perfect, all-spare, open, and invalid games', () => {
  const perfect = Array.from({ length: 10 }, (_, index) => index === 9 ? [10, 10, 10] : [10]);
  assert.equal(calculateBowlingScore(perfect).total, 300);
  const spares = Array.from({ length: 10 }, (_, index) => index === 9 ? [5, 5, 5] : [5, 5]);
  assert.equal(calculateBowlingScore(spares).total, 150);
  assert.equal(calculateBowlingScore(Array.from({ length: 10 }, () => [9, 0])).total, 90);
  assert.throws(() => calculateBowlingScore([[8, 4]]), RangeError);
});

test('partial fraction calculator handles distinct, repeated, and irreducible quadratics', () => {
  const distinct = decomposePartialFraction({ numeratorX: 1, numeratorConstant: 0, denominatorX2: 1, denominatorX: -5, denominatorConstant: 6 });
  assert.equal(distinct.type, 'distinct-real');
  closeTo(distinct.root1, 3, 1e-10); closeTo(distinct.coefficient1, 3, 1e-10); closeTo(distinct.coefficient2, -2, 1e-10);
  const repeated = decomposePartialFraction({ numeratorX: 2, numeratorConstant: 3, denominatorX2: 1, denominatorX: -4, denominatorConstant: 4 });
  assert.equal(repeated.type, 'repeated-real'); closeTo(repeated.coefficient1, 2); closeTo(repeated.coefficient2, 7);
  assert.equal(decomposePartialFraction({ numeratorX: 1, numeratorConstant: 0, denominatorX2: 1, denominatorX: 0, denominatorConstant: 1 }).type, 'irreducible-real');
});

test('tank volume calculator covers rectangular and vertical cylindrical tanks', () => {
  const rectangular = calculateTankVolume({ shape: 'rectangular', unitSystem: 'us', length: 2, width: 3, height: 4, fillPercent: 50 });
  closeTo(rectangular.capacityCubic, 24); closeTo(rectangular.liquidDisplay, 89.766233766, 1e-9);
  const cylinder = calculateTankVolume({ shape: 'vertical-cylinder', unitSystem: 'us', diameter: 4, height: 10, fillPercent: 100 });
  closeTo(cylinder.capacityCubic, 40 * Math.PI, 1e-10); closeTo(cylinder.capacityDisplay, 940.029801799, 1e-7);
  assert.throws(() => calculateTankVolume({ shape: 'rectangular', unitSystem: 'us', length: 0, width: 3, height: 4 }), RangeError);
});

test('cross stitch calculator converts stitch count into design and cut size', () => {
  assert.deepEqual(calculateCrossStitch({ widthStitches: 140, heightStitches: 98, fabricCount: 14, threadsOver: 1, allowancePerSide: 3 }), { designWidthInches: 10, designHeightInches: 7, cutWidthInches: 16, cutHeightInches: 13, totalStitches: 13720 });
  assert.equal(calculateCrossStitch({ widthStitches: 140, heightStitches: 98, fabricCount: 28, threadsOver: 2, allowancePerSide: 0 }).designWidthInches, 10);
  assert.throws(() => calculateCrossStitch({ widthStitches: 10, heightStitches: 10, fabricCount: 0 }), RangeError);
});

test('dunk calculator preserves rim geometry and progress gap', () => {
  assert.deepEqual(calculateDunk({ standingReach: 96, currentVertical: 24, clearance: 6 }), { rim: 120, requiredVertical: 30, currentVertical: 24, gap: 6, clearance: 6, unit: 'in' });
  closeTo(calculateDunk({ unitSystem: 'metric', standingReach: 244, clearance: 0 }).requiredVertical, 60.8, 1e-10);
  assert.throws(() => calculateDunk({ standingReach: 0 }), RangeError);
});

test('snowboard calculator returns a transparent starting range and width note', () => {
  assert.deepEqual(calculateSnowboardSize({ weight: 72, height: 178, bootSizeUS: 9, terrain: 'all-mountain' }), { minCm: 150, maxCm: 158, midpointCm: 154, widthAdvice: 'A regular-width model is a reasonable starting point, but verify the product chart.', terrain: 'all-mountain' });
  assert.equal(calculateSnowboardSize({ weight: 72, height: 178, bootSizeUS: 11, terrain: 'powder' }).minCm, 153);
  assert.throws(() => calculateSnowboardSize({ weight: 10, height: 178, bootSizeUS: 9 }), RangeError);
});

test('brick calculator uses face module, openings, waste, and upward rounding', () => {
  const result = calculateBricks({ wallLengthFeet: 20, wallHeightFeet: 8, openingsSqFeet: 0, wastePercent: 5 });
  closeTo(result.bricksPerSqFoot, 6.857142857, 1e-6); assert.equal(result.purchaseBricks, 1152);
  assert.throws(() => calculateBricks({ wallLengthFeet: 10, wallHeightFeet: 8, openingsSqFeet: 80 }), RangeError);
});

test('furnace calculator exposes output load and AFUE-adjusted input range', () => {
  const result = calculateFurnaceSize({ areaSqFeet: 2000, climate: 'moderate', insulation: 'average', afuePercent: 90 });
  assert.equal(result.outputBtu, 70000); closeTo(result.inputBtu, 77777.77777777778, 1e-8); closeTo(result.lowInputBtu, 66111.11111111111, 1e-8); closeTo(result.highInputBtu, 89444.44444444444, 1e-8);
  assert.equal(calculateFurnaceSize({ areaSqFeet: 100, climate: 'mild', insulation: 'efficient', afuePercent: 100 }).inputBtu, 2000);
  assert.throws(() => calculateFurnaceSize({ areaSqFeet: 50 }), RangeError);
});

test('audiobook calculator adjusts duration at constant playback speed', () => {
  assert.deepEqual(calculateAudiobook({ hours: 10, minutes: 0, playbackSpeed: 1.5 }), { originalMinutes: 600, adjustedMinutes: 400, timeSavedMinutes: 200, speed: 1.5 });
  assert.equal(calculateAudiobook({ hours: 1, minutes: 0, playbackSpeed: 1 }).adjustedMinutes, 60);
  assert.throws(() => calculateAudiobook({ hours: 0, minutes: 0, playbackSpeed: 1 }), RangeError);
});

test('RPM calculator converts sampled revolutions across supported time units', () => {
  const result = calculateRpm({ revolutions: 120, time: 30, timeUnit: 'seconds' });
  assert.equal(result.rpm, 240); assert.equal(result.hertz, 4); closeTo(result.radiansPerSecond, 8 * Math.PI, 1e-10);
  assert.equal(calculateRpm({ revolutions: 0, time: 1, timeUnit: 'minutes' }).rpm, 0);
  assert.throws(() => calculateRpm({ revolutions: 10, time: 0, timeUnit: 'seconds' }), RangeError);
});

test('FOC calculator follows the Easton AMO-standard balance formula', () => {
  closeTo(calculateFoc({ arrowLength: 28, balancePoint: 17 }).focPercent, 10.7142857143, 1e-10);
  assert.equal(calculateFoc({ arrowLength: 30, balancePoint: 15 }).focPercent, 0);
  assert.throws(() => calculateFoc({ arrowLength: 28, balancePoint: 29 }), RangeError);
});

test('circle skirt calculator returns drafting radii for multiple fullness fractions', () => {
  const full = calculateCircleSkirt({ waistCircumference: 30, skirtLength: 24, fullness: 'full' });
  closeTo(full.waistRadius, 30 / (2 * Math.PI), 1e-10); closeTo(full.outerRadius, 24 + 30 / (2 * Math.PI), 1e-10);
  closeTo(calculateCircleSkirt({ waistCircumference: 30, skirtLength: 24, fullness: 'half' }).waistRadius, 30 / Math.PI, 1e-10);
  assert.throws(() => calculateCircleSkirt({ waistCircumference: 0, skirtLength: 24 }), RangeError);
});

test('linear interpolation reports slope, position, extrapolation, and duplicate-x errors', () => {
  assert.deepEqual(calculateLinearInterpolation({ x1: 10, y1: 100, x2: 20, y2: 200, targetX: 15 }), { y: 150, slope: 10, position: 0.5, isExtrapolation: false });
  assert.equal(calculateLinearInterpolation({ x1: 10, y1: 100, x2: 20, y2: 200, targetX: 25 }).isExtrapolation, true);
  assert.throws(() => calculateLinearInterpolation({ x1: 10, y1: 100, x2: 10, y2: 200, targetX: 10 }), RangeError);
});

test('Roth 401k projection compounds monthly and checks 2026 elective-deferral limits', () => {
  const zero=calculateRoth401k({currentBalance:10000,monthlyContribution:1000,years:1,annualReturnPercent:0,ageGroup:'under50'});assert.equal(zero.endingBalance,22000);assert.equal(zero.annualContribution,12000);assert.equal(zero.overLimit,false);
  assert.equal(calculateRoth401k({currentBalance:0,monthlyContribution:2500,years:1,annualReturnPercent:0,ageGroup:'under50'}).overLimit,true);
  assert.throws(()=>calculateRoth401k({monthlyContribution:100,years:0,annualReturnPercent:7}),RangeError);
});

test('SCHD scenario uses user-entered total return and yield without live data', () => {
  const zero=calculateSchdScenario({initialInvestment:10000,monthlyInvestment:0,years:1,annualTotalReturnPercent:0,forwardYieldPercent:3});assert.equal(zero.endingValue,10000);assert.equal(zero.estimatedAnnualDividends,300);
  assert.equal(calculateSchdScenario({initialInvestment:0,monthlyInvestment:100,years:1,annualTotalReturnPercent:0,forwardYieldPercent:0}).endingValue,1200);
  assert.throws(()=>calculateSchdScenario({initialInvestment:0,monthlyInvestment:0,years:1,annualTotalReturnPercent:8,forwardYieldPercent:3}),RangeError);
});

test('tire pressure temperature estimate uses absolute pressure and temperature', () => {
  closeTo(calculateTirePressureTemperature({unitSystem:'psi',measuredPressure:35,measuredTemperature:70,targetTemperature:70}).estimatedPressure,35,1e-10);
  assert.ok(calculateTirePressureTemperature({unitSystem:'psi',measuredPressure:35,measuredTemperature:70,targetTemperature:30}).pressureChange<0);
  closeTo(calculateTirePressureTemperature({unitSystem:'kpa',measuredPressure:241.316505,measuredTemperature:21.111111,targetTemperature:21.111111}).estimatedPressure,241.316505,1e-6);
  assert.throws(()=>calculateTirePressureTemperature({unitSystem:'psi',measuredPressure:-1,measuredTemperature:70,targetTemperature:30}),RangeError);
});

test('partial derivative parser differentiates supported x-y polynomials and rejects unsupported syntax', () => {
  assert.equal(calculatePartialDerivative({expression:'3*x^2*y+4*y^2-5*x',variable:'x'}).derivativeExpression,'6*x*y-5');
  assert.deepEqual(calculatePartialDerivative({expression:'3*x^2*y+4*y^2-5*x',variable:'y',xValue:2,yValue:3}),{derivativeExpression:'3*x^2+8*y',value:36,termCount:3});
  assert.equal(calculatePartialDerivative({expression:'5',variable:'x'}).derivativeExpression,'0');
  assert.throws(()=>calculatePartialDerivative({expression:'sin(x)',variable:'x'}),RangeError);
});

test('eDPI calculator preserves same-game effective sensitivity and target-DPI equivalence', () => {
  assert.deepEqual(calculateEdpi({mouseDpi:800,inGameSensitivity:0.5,targetDpi:1600}),{edpi:400,equivalentSensitivity:0.25});
  assert.equal(calculateEdpi({mouseDpi:800,inGameSensitivity:0}).edpi,0);
  assert.throws(()=>calculateEdpi({mouseDpi:0,inGameSensitivity:1}),RangeError);
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
