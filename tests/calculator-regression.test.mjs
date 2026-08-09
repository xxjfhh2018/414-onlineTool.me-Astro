import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { calculateCdInterest, calculateMoneyDuration, calculateWeightedComposite, estimateApScore, evaluateDynastyTrade } from '../src/lib/calculatorCore.mjs';

const closeTo = (actual, expected, tolerance = 0.005) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

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
