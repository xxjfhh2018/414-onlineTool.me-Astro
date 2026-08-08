export interface ToolVerification {
  status: 'verified' | 'estimate' | 'demo';
  statusLabel: string;
  versionLabel: string;
  lastReviewed: string;
  sourceLabel: string;
  sourceUrl: string;
  reviewNote: string;
  exclusions: string[];
}

const apShared = {
  status: 'estimate' as const,
  statusLabel: 'Official format · estimated cutoffs',
  versionLabel: 'May 2027 exam format',
  lastReviewed: '2026-08-08',
  reviewNote: 'Review before the May 2027 exam and whenever College Board changes an exam format or scoring guidance.',
  exclusions: [
    'The 1–5 cut scores are editable planning estimates, not official conversion tables.',
    'Secure form difficulty, equating, and College Board standard-setting are not reproduced.',
    'Results are for practice planning and do not predict an official released score.',
  ],
};

const taxShared = {
  status: 'estimate' as const,
  statusLabel: 'Planning estimate',
  versionLabel: 'Tax year 2026',
  lastReviewed: '2026-08-08',
  sourceLabel: '2026 IRS Publication 15-T',
  sourceUrl: 'https://www.irs.gov/publications/p15t',
  reviewNote: 'Review before tax year 2027 and after any federal or state withholding-law change.',
  exclusions: [
    'Not a payroll, tax-return, or legal determination.',
    'Does not cover every credit, reciprocal agreement, local payroll program, nonresident rule, bonus, tip, overtime, or multi-job situation.',
    'State and local results use the selected planning model; compare them with the linked official state guidance.',
  ],
};

export const toolVerification: Record<string, ToolVerification> = {
  'palworld-breeding-calculator': {
    status: 'verified',
    statusLabel: 'Dataset verified',
    versionLabel: 'Palworld 1.0.0 data · PC 1.0.1 compatibility checked',
    lastReviewed: '2026-08-08',
    sourceLabel: 'PalCalc pinned dataset revision',
    sourceUrl: 'https://github.com/tylercamp/palcalc/tree/8b7e2f779e47fddae16ddcb973e828ba20c02b80',
    reviewNote: 'Rebuild and rerun the breeding regression suite after every Palworld patch that changes Pals or breeding rules.',
    exclusions: [
      'This is an independent fan-made calculator, not an official Pocketpair tool.',
      'The shortest path minimizes breeding generations; it does not optimize passive inheritance, gender odds, egg time, or resource cost.',
      'Results apply only to the supported game-data version shown above.',
    ],
  },
  'bah-calculator': {
    status: 'demo',
    statusLabel: 'Demonstration only',
    versionLabel: 'Simplified model · no current DoD rate table',
    lastReviewed: '2026-08-08',
    sourceLabel: 'Official DoD BAH lookup',
    sourceUrl: 'https://www.travel.dod.mil/Allowances/Basic-Allowance-for-Housing/BAH-Rate-Lookup/',
    reviewNote: 'Do not promote this page as a current BAH calculator until official MHA and annual rate tables are integrated and tested.',
    exclusions: [
      'ZIP code is validated but is not mapped to a Military Housing Area.',
      'The result does not use current annual DoD BAH rates.',
      'Do not use the demonstration result for orders, housing, benefits, or financial decisions.',
    ],
  },
  'ap-score-calculator': { ...apShared, versionLabel: 'User-defined AP practice format', sourceLabel: 'College Board score setting', sourceUrl: 'https://apcentral.collegeboard.org/courses/how-ap-develops-courses-and-exams/score-setting-and-scoring' },
  'apush-score-calculator': { ...apShared, sourceLabel: 'AP U.S. History exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-united-states-history/exam' },
  'ap-lang-score-calculator': { ...apShared, versionLabel: 'Current published exam format', sourceLabel: 'AP English Language exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/exam' },
  'ap-biology-score-calculator': { ...apShared, versionLabel: 'Current published exam format', sourceLabel: 'AP Biology exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-biology/exam' },
  'ap-chemistry-score-calculator': { ...apShared, versionLabel: 'Current published exam format', sourceLabel: 'AP Chemistry exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-chemistry/exam' },
  'ap-calculus-ab-score-calculator': { ...apShared, sourceLabel: 'AP Calculus AB exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam' },
  'ap-calculus-bc-score-calculator': { ...apShared, sourceLabel: 'AP Calculus BC exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-calculus-bc/exam' },
  'ap-statistics-score-calculator': { ...apShared, sourceLabel: 'AP Statistics 2027 revisions', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-statistics/future-revisions' },
  'ap-psychology-score-calculator': { ...apShared, versionLabel: 'Current published exam format', sourceLabel: 'AP Psychology exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-psychology/exam' },
  'ap-world-history-score-calculator': { ...apShared, sourceLabel: 'AP World History exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-world-history/exam' },
  'paycheck-calculator': taxShared,
  'arkansas-paycheck-calculator': taxShared,
  'michigan-paycheck-calculator': taxShared,
  'washington-paycheck-calculator': taxShared,
  'indiana-paycheck-calculator': taxShared,
  'maryland-paycheck-calculator': taxShared,
  'virginia-paycheck-calculator': taxShared,
  'illinois-paycheck-calculator': taxShared,
  'missouri-paycheck-calculator': taxShared,
};
