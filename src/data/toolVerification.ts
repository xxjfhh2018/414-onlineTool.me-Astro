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
  versionLabel: 'Current published exam format',
  lastReviewed: '2026-08-10',
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
  'cross-stitch-calculator': { status:'verified', statusLabel:'Formula verified', versionLabel:'Fabric-count geometry', lastReviewed:'2026-08-12', sourceLabel:'DMC stitch-count guidance', sourceUrl:'https://www.dmc.com/US/en/stitch-your-photos/help_and_advice', reviewNote:'Retest over-one, over-two, and allowance handling whenever inputs change.', exclusions:['Does not estimate floss or choose a finishing allowance.'] },
  'dunk-calculator': { status:'estimate', statusLabel:'Reach geometry estimate', versionLabel:'10-foot regulation rim', lastReviewed:'2026-08-12', sourceLabel:'NBA Rule No. 1', sourceUrl:'https://official.nba.com/rule-no-1-court-dimensions-equipment/', reviewNote:'Retest imperial and metric reach geometry whenever measurement options change.', exclusions:['Does not predict ball control, approach timing, technique, fatigue, or injury risk.'] },
  'snowboard-size-calculator': { status:'estimate', statusLabel:'Starting-range estimate', versionLabel:'Adult planning bands reviewed August 2026', lastReviewed:'2026-08-12', sourceLabel:'Burton Snowboard Buying Guide', sourceUrl:'https://www.burton.com/en-us/blogs/the-burton-blog/snowboard-buying-guide', reviewNote:'Review annually and when manufacturer guidance changes.', exclusions:['Not an official universal size chart.', 'Each product weight range and waist width overrides this result.', 'Not intended for youth or volume-shifted sizing.'] },
  'calculator-bricks': { status:'estimate', statusLabel:'Planning estimate', versionLabel:'US modular brick face model', lastReviewed:'2026-08-12', sourceLabel:'BIA Technical Note 10', sourceUrl:'https://www.gobrick.com/media/file/10-dimensioning-and-estimating-brick-masonry.pdf', reviewNote:'Retest face module, openings, and waste whenever the takeoff model changes.', exclusions:['Does not calculate mortar, multiple wythes, structural design, bond-specific cuts, or supplier packaging.'] },
  'furnace-size-calculator': { status:'estimate', statusLabel:'Rough planning range', versionLabel:'Rule-of-thumb model · not Manual J', lastReviewed:'2026-08-12', sourceLabel:'DOE HVAC Proper Sizing', sourceUrl:'https://bsesc.energy.gov/energy-basics/hvac-proper-sizing-hvac-systems', reviewNote:'Review the transparent factors annually; never present this as Manual J or equipment selection.', exclusions:['Not ACCA Manual J or Manual S.', 'Do not purchase equipment from this result.', 'Does not model room-by-room envelope, infiltration, ducts, windows, or design temperatures.'] },
  'linear-feet-calculator': {
    status: 'verified', statusLabel: 'Formula verified', versionLabel: 'International foot: 0.3048 metre exactly', lastReviewed: '2026-08-11',
    sourceLabel: 'NIST revised unit conversion factors', sourceUrl: 'https://www.nist.gov/pml/us-surveyfoot/revised-unit-conversion-factors',
    reviewNote: 'Retest row handling and unit conversions whenever the multi-row implementation changes.', exclusions: ['Does not add waste, kerf, joins, or optimize supplier stock lengths.'],
  },
  'rebar-calculator': {
    status: 'estimate', statusLabel: 'Planning estimate', versionLabel: 'Rectangular orthogonal grid model', lastReviewed: '2026-08-11',
    sourceLabel: 'CRSI Placing Reinforcing Bars', sourceUrl: 'https://www.crsi.org/wp-content/uploads/CRSI-Placing_Reinforcing_Bars_10th-TOC.pdf',
    reviewNote: 'Retest directional counts, layers, and waste whenever the takeoff formula changes.', exclusions: ['Not structural design advice.', 'Excludes bar size, laps, hooks, chairs, openings, localized reinforcement, weight, and stock-length optimization.'],
  },
  'bowling-score-calculator': {
    status: 'verified', statusLabel: 'Rules verified', versionLabel: 'Standard ten-pin scoring', lastReviewed: '2026-08-11',
    sourceLabel: 'USBC Keeping Score', sourceUrl: 'https://bowl.com/keeping-score',
    reviewNote: 'Retest strikes, spares, open frames, and tenth-frame bonuses whenever score handling changes.', exclusions: ['Does not apply league handicap, match-play points, or alternative scoring systems.'],
  },
  'partial-fraction-decomposition-calculator': {
    status: 'verified', statusLabel: 'Formula verified', versionLabel: 'Linear numerator over quadratic denominator', lastReviewed: '2026-08-11',
    sourceLabel: 'OpenStax Partial Fractions', sourceUrl: 'https://openstax.org/books/college-algebra/pages/7-4-partial-fractions',
    reviewNote: 'Retest distinct, repeated, and irreducible quadratic cases whenever algebra logic changes.', exclusions: ['Does not support improper rational expressions, higher-degree denominators, or complex-linear output.'],
  },
  'tank-volume-calculator': {
    status: 'estimate', statusLabel: 'Planning estimate', versionLabel: 'Rectangular prism and upright cylinder model', lastReviewed: '2026-08-11',
    sourceLabel: 'OpenStax volume formulas', sourceUrl: 'https://openstax.org/books/prealgebra/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    reviewNote: 'Retest geometry, fill percentage, and unit conversions whenever supported shapes change.', exclusions: ['Excludes wall thickness, rounded ends, fittings, freeboard, dead volume, and horizontal-cylinder fill geometry.'],
  },
  'lsac-gpa-calculator': {
    status: 'estimate', statusLabel: 'Official scale · planning estimate', versionLabel: 'LSAC conversion table verified August 2026', lastReviewed: '2026-08-10',
    sourceLabel: 'LSAC Transcript Summarization', sourceUrl: 'https://www.lsac.org/applying-law-school/jd-application-process/cas/requesting/transcript-summarization',
    reviewNote: 'Review when LSAC changes transcript summarization or grade-conversion guidance.',
    exclusions: ['LSAC controls official transcript-specific exclusions and conversions.', 'International records, repeats, nonstandard grades, and academic forgiveness may need additional treatment.'],
  },
  'lsat-score-calculator': {
    status: 'verified', statusLabel: 'Exact disclosed-form lookup', versionLabel: 'April 2022 Form LTZB03', lastReviewed: '2026-08-10',
    sourceLabel: 'LSAC April 2022 Disclosure Booklet', sourceUrl: 'https://www.lsac.org/document-library/809',
    reviewNote: 'Keep this result explicitly tied to Form LTZB03; add future forms as separate retained versions.',
    exclusions: ['Not a universal or current LSAT raw-score curve.', 'Does not estimate percentile, admission probability, or an official score from another form.'],
  },
  'cinder-block-calculator': {
    status: 'estimate', statusLabel: 'Planning estimate', versionLabel: 'Nominal 8 × 16 in CMU face module', lastReviewed: '2026-08-10',
    sourceLabel: 'CMHA Concrete Masonry Products', sourceUrl: 'https://www.cmha.org/resource/cmu-tec-001/',
    reviewNote: 'Verify nominal size guidance if CMHA revises its technical note.', exclusions: ['Does not calculate mortar, grout, reinforcement, bond pattern, or supplier pallet quantities.'],
  },
  'vdot-calculator': {
    status: 'estimate', statusLabel: 'Performance estimate', versionLabel: 'Daniels–Gilbert race equations', lastReviewed: '2026-08-10',
    sourceLabel: "Daniels' Running Formula", sourceUrl: 'https://www.human-kinetics.co.uk/9781718203662/daniels-running-formula/',
    reviewNote: 'Retest equations and supported ranges whenever the implementation changes.', exclusions: ['Not a laboratory VO₂max or medical assessment.', 'Does not adjust for terrain, altitude, weather, wind, fatigue, or course error.'],
  },
  'watts-to-amps-calculator': {
    status: 'verified', statusLabel: 'Formula verified', versionLabel: 'Standard DC and AC real-power equations', lastReviewed: '2026-08-10',
    sourceLabel: 'Fluke Electrical Glossary', sourceUrl: 'https://www.fluke.com/en/learn/blog/electrical/electrical-glossary',
    reviewNote: 'Retest DC, single-phase, and balanced three-phase cases whenever formulas or input conventions change.', exclusions: ['Not a conductor, breaker, fuse, or safety-equipment sizing tool.', 'Three-phase mode assumes a balanced load and line-to-line voltage.'],
  },
  'swim-time-converter': {
    status: 'estimate',
    statusLabel: 'NCAA sample factors · estimate',
    versionLabel: '2025-26/2026-27 rules · updated Aug. 5, 2026',
    lastReviewed: '2026-08-10',
    sourceLabel: 'NCAA Swimming and Diving Rules Book',
    sourceUrl: 'https://ncaaorg.s3.amazonaws.com/championships/sports/swimdive/rules/PRXSW_RulesBook.pdf',
    reviewNote: 'Review when the NCAA rules book or applicable championship conversion guidance changes, and no later than September 2027.',
    exclusions: [
      'The NCAA rules book identifies these as sample conversion tables; championship qualification may use different factors.',
      'Reverse and SCM-to-LCM estimates invert or combine the published metric-to-SCY factors.',
      'Even splits are pacing aids, not predictions of actual race splits.',
    ],
  },
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
  'ap-calculus-ab-score-calculator': { ...apShared, versionLabel: 'May 2027 default · May 2026 retained', sourceLabel: 'College Board 2026–27 Calculus exam updates', sourceUrl: 'https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-bc-course-and-exam-description-clarifications-effective-fall-2026.pdf' },
  'ap-calculus-bc-score-calculator': { ...apShared, versionLabel: 'May 2027 exam format', sourceLabel: 'AP Calculus BC exam', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-calculus-bc/exam' },
  'ap-statistics-score-calculator': { ...apShared, versionLabel: 'May 2027 revised exam format', sourceLabel: 'AP Statistics 2027 revisions', sourceUrl: 'https://apcentral.collegeboard.org/courses/ap-statistics/future-revisions' },
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
  'audiobook-calculator': { status:'verified', statusLabel:'Formula verified', versionLabel:'Constant playback-rate formula', lastReviewed:'2026-08-13', sourceLabel:'Audible narration-speed guidance', sourceUrl:'https://help.audible.com/s/article/set-narration-speed?language=en_US', reviewNote:'Retest duration conversion, speeds below 1×, and supported bounds whenever the input model changes.', exclusions:['Does not include pauses, silence trimming, chapter gaps, or app-specific processing.'] },
  'rpm-calculator': { status:'verified', statusLabel:'Formula verified', versionLabel:'NIST rotational-frequency definition', lastReviewed:'2026-08-13', sourceLabel:'NIST Guide to the SI, Chapter 8', sourceUrl:'https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-8', reviewNote:'Retest all time units and zero-revolution handling whenever conversions change.', exclusions:['Average sampled rate only; not a tachometer, pulley, gear, torque, or slip model.'] },
  'foc-calculator': { status:'verified', statusLabel:'Formula verified', versionLabel:'AMO-standard F.O.C. balance formula', lastReviewed:'2026-08-13', sourceLabel:'Easton Archery F.O.C. FAQ', sourceUrl:'https://eastonarchery.com/faqs/', reviewNote:'Recheck Easton measurement definitions and hunting recommendation annually.', exclusions:['FOC alone does not determine spine, tune, penetration, or arrow safety.'] },
  'circle-skirt-calculator': { status:'verified', statusLabel:'Geometry verified', versionLabel:'Circle-sector drafting model', lastReviewed:'2026-08-13', sourceLabel:'Seamwork circle-skirt tutorial', sourceUrl:'https://www.seamwork.com/sewing-tutorials/block-paper-scissors-37', reviewNote:'Retest each fullness fraction and ensure construction allowances remain excluded.', exclusions:['Does not include seam allowance, hem allowance, ease, waistband, closure, bias stretch, or fabric layout.'] },
  'linear-interpolation-calculator': { status:'verified', statusLabel:'Formula verified', versionLabel:'Two-point linear interpolation', lastReviewed:'2026-08-13', sourceLabel:'NIST DLMF §3.3', sourceUrl:'https://dlmf.nist.gov/3.3', reviewNote:'Retest midpoint, endpoint, extrapolation, and duplicate-x states whenever the formula changes.', exclusions:['Assumes a straight-line relationship and does not propagate input uncertainty.'] },
};
