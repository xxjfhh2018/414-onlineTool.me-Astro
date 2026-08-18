import { calculateWeightedComposite, estimateApScore } from './calculatorCore.mjs';

const source = (name, url) => ({ name, url });
const current = (label, sections, cutScores, sourceData, applicableDate = 'Current published exam format') => ({ label, applicableDate, sections, cutScores, source: sourceData, estimateLabel: 'Planning estimate using editable cutoffs' });

export const AP_SCORE_CONFIGS = {
  'ap-score-calculator': {
    name: 'AP Exam',
    format: 'Enter the section scores from your practice exam to see your estimated AP result (1–5).',
    currentVersion: 'custom',
    versions: {
      custom: current('User-defined practice format', [{ label: 'Multiple Choice', possible: 100, weight: 50 }, { label: 'Free Response', possible: 100, weight: 50 }], [75, 60, 45, 30], source('College Board score setting', 'https://apcentral.collegeboard.org/courses/how-ap-develops-courses-and-exams/score-setting-and-scoring'), 'User-defined practice format'),
    },
  },
  'apush-score-calculator': {
    name: 'AP U.S. History', format: 'Enter your MCQ, SAQ, DBQ, and LEQ practice scores to see your estimated APUSH result (1–5).', currentVersion: 'current', versions: {
      current: current('Current published exam format', [{ label: 'Multiple Choice', possible: 55, weight: 40 }, { label: 'Short Answer', possible: 9, weight: 20 }, { label: 'Document-Based Question', possible: 7, weight: 25 }, { label: 'Long Essay', possible: 6, weight: 15 }], [75, 60, 45, 30], source('AP U.S. History exam', 'https://apcentral.collegeboard.org/courses/ap-united-states-history/exam')),
    },
  },
  'ap-lang-score-calculator': {
    name: 'AP English Language', format: 'Enter your MCQ and three essay scores to see your estimated AP Lang result (1–5).', currentVersion: 'current', versions: {
      current: current('Current published exam format', [{ label: 'Multiple Choice', possible: 45, weight: 45 }, { label: 'Synthesis Essay', possible: 6, weight: 18.3333 }, { label: 'Rhetorical Analysis Essay', possible: 6, weight: 18.3333 }, { label: 'Argument Essay', possible: 6, weight: 18.3334 }], [72, 57, 42, 27], source('AP English Language exam', 'https://apcentral.collegeboard.org/courses/ap-english-language-and-composition/exam')),
    },
  },
  'ap-biology-score-calculator': {
    name: 'AP Biology', format: 'Enter your MCQ and free-response points to see your estimated AP Biology result (1–5).', currentVersion: 'current', versions: {
      current: current('Current published exam format', [{ label: 'Multiple Choice', possible: 60, weight: 50 }, { label: 'Free Response', possible: 34, weight: 50 }], [78, 63, 48, 34], source('AP Biology exam', 'https://apcentral.collegeboard.org/courses/ap-biology/exam')),
    },
  },
  'ap-chemistry-score-calculator': {
    name: 'AP Chemistry', format: 'Enter your MCQ and free-response points to see your estimated AP Chemistry result (1–5).', currentVersion: 'current', versions: {
      current: current('Current published exam format', [{ label: 'Multiple Choice', possible: 60, weight: 50 }, { label: 'Free Response', possible: 46, weight: 50 }], [75, 60, 45, 30], source('AP Chemistry exam', 'https://apcentral.collegeboard.org/courses/ap-chemistry/exam')),
    },
  },
  'ap-calculus-ab-score-calculator': {
    name: 'AP Calculus AB', format: 'Enter your practice-exam scores to see your estimated AP Calculus AB score (1–5).', currentVersion: 'may-2027', versions: {
      'may-2027': current('May 2027 exam format', [{ label: 'Multiple Choice', possible: 42, weight: 50 }, { label: 'Free Response', possible: 54, weight: 50 }], [70, 58, 43, 32], source('College Board 2026–27 Calculus exam updates', 'https://apcentral.collegeboard.org/media/pdf/ap-calculus-ab-bc-course-and-exam-description-clarifications-effective-fall-2026.pdf'), 'Applies beginning with the May 2027 exam'),
      'may-2026': current('May 2026 exam format', [{ label: 'Multiple Choice', possible: 45, weight: 50 }, { label: 'Free Response', possible: 54, weight: 50 }], [70, 58, 43, 32], source('AP Calculus AB 2026 exam', 'https://apcentral.collegeboard.org/courses/ap-calculus-ab/exam'), 'Legacy format for the May 2026 exam'),
    },
  },
  'ap-calculus-bc-score-calculator': {
    name: 'AP Calculus BC', format: 'Enter your MCQ and FRQ points to see your estimated overall AP Calculus BC result (1–5).', currentVersion: 'may-2027', versions: {
      'may-2027': current('May 2027 exam format', [{ label: 'Multiple Choice', possible: 42, weight: 50 }, { label: 'Free Response', possible: 54, weight: 50 }], [65, 53, 40, 28], source('AP Calculus BC exam', 'https://apcentral.collegeboard.org/courses/ap-calculus-bc/exam'), 'Applies beginning with the May 2027 exam'),
    },
  },
  'ap-statistics-score-calculator': {
    name: 'AP Statistics', format: 'Enter your multiple-choice and free-response points to see your estimated AP Statistics result (1–5).', currentVersion: 'may-2027', versions: {
      'may-2027': current('May 2027 revised exam format', [{ label: 'Multiple Choice', possible: 42, weight: 50 }, { label: 'Free Response', possible: 40, weight: 50 }], [70, 55, 40, 25], source('AP Statistics 2027 revisions', 'https://apcentral.collegeboard.org/courses/ap-statistics/future-revisions'), 'Applies beginning with the May 2027 exam'),
    },
  },
  'ap-psychology-score-calculator': {
    name: 'AP Psychology', format: 'Enter your MCQ and free-response points to see your estimated AP Psychology result (1–5).', currentVersion: 'current', versions: {
      current: current('Current published exam format', [{ label: 'Multiple Choice', possible: 75, weight: 66.7 }, { label: 'Free Response', possible: 14, weight: 33.3 }], [75, 60, 45, 30], source('AP Psychology exam', 'https://apcentral.collegeboard.org/courses/ap-psychology/exam')),
    },
  },
  'ap-world-history-score-calculator': {
    name: 'AP World History: Modern', format: 'Enter your MCQ, SAQ, DBQ, and LEQ scores to see your estimated AP World History result (1–5).', currentVersion: 'current', versions: {
      current: current('Current published exam format', [{ label: 'Multiple Choice', possible: 55, weight: 40 }, { label: 'Short Answer', possible: 9, weight: 20 }, { label: 'Document-Based Question', possible: 7, weight: 25 }, { label: 'Long Essay', possible: 6, weight: 15 }], [75, 60, 45, 30], source('AP World History exam', 'https://apcentral.collegeboard.org/courses/ap-world-history/exam')),
    },
  },
  'ap-gov-calculator': {
    name: 'AP U.S. Government and Politics', format: 'Enter your MCQ and four free-response practice scores to see your estimated AP Gov result (1–5).', currentVersion: 'may-2027', versions: {
      'may-2027': current('May 2027 exam format', [{ label: 'Multiple Choice', possible: 55, weight: 50 }, { label: 'Concept Application', possible: 3, weight: 12.5 }, { label: 'Quantitative Analysis', possible: 4, weight: 12.5 }, { label: 'SCOTUS Comparison', possible: 4, weight: 12.5 }, { label: 'Argument Essay', possible: 6, weight: 12.5 }], [75, 60, 45, 30], source('AP U.S. Government and Politics exam', 'https://apcentral.collegeboard.org/courses/ap-united-states-government-and-politics/exam'), 'Applies to the May 2027 exam'),
    },
  },
  'ap-physics-1-score-calculator': {
    name: 'AP Physics 1', format: 'Enter your MCQ and four free-response practice scores to see your estimated AP Physics 1 result (1–5).', currentVersion: 'may-2027', versions: {
      'may-2027': current('May 2027 exam format', [{ label: 'Multiple Choice', possible: 42, weight: 50 }, { label: 'Mathematical Routines', possible: 10, weight: 12.5 }, { label: 'Translation Between Representations', possible: 12, weight: 15 }, { label: 'Experimental Design and Analysis', possible: 10, weight: 12.5 }, { label: 'Qualitative/Quantitative Translation', possible: 8, weight: 10 }], [72, 58, 43, 30], source('AP Physics 1 exam', 'https://apcentral.collegeboard.org/courses/ap-physics-1/exam'), 'Applies beginning with the May 2027 exam'),
      'may-2026': current('May 2026 exam format', [{ label: 'Multiple Choice', possible: 40, weight: 50 }, { label: 'Mathematical Routines', possible: 10, weight: 12.5 }, { label: 'Translation Between Representations', possible: 12, weight: 15 }, { label: 'Experimental Design and Analysis', possible: 10, weight: 12.5 }, { label: 'Qualitative/Quantitative Translation', possible: 8, weight: 10 }], [72, 58, 43, 30], source('AP Physics 1 exam', 'https://apcentral.collegeboard.org/courses/ap-physics-1/exam'), 'Legacy format for the May 2026 exam'),
    },
  },
  'apes-score-calculator': {
    name: 'AP Environmental Science', format: 'Enter your MCQ and three free-response practice scores to see your estimated APES result (1–5).', currentVersion: 'may-2027', versions: {
      'may-2027': current('May 2027 exam format', [{ label: 'Multiple Choice', possible: 80, weight: 60 }, { label: 'Design an Investigation', possible: 10, weight: 13.3333 }, { label: 'Analyze Quantitative Data', possible: 10, weight: 13.3333 }, { label: 'Environmental Calculations', possible: 10, weight: 13.3334 }], [75, 60, 45, 30], source('AP Environmental Science exam', 'https://apcentral.collegeboard.org/courses/ap-environmental-science/exam'), 'Applies to the May 2027 exam'),
    },
  },
};

export function getApVersion(course, versionId) {
  const courseConfig = AP_SCORE_CONFIGS[course] || AP_SCORE_CONFIGS['ap-score-calculator'];
  const resolvedVersionId = versionId && courseConfig.versions[versionId] ? versionId : courseConfig.currentVersion;
  return { courseConfig, versionId: resolvedVersionId, version: courseConfig.versions[resolvedVersionId] };
}

export function validateApVersion(version) {
  if (!version || !Array.isArray(version.sections) || version.sections.length === 0 || !Array.isArray(version.cutScores) || version.cutScores.length !== 4) return false;
  const totalWeight = version.sections.reduce((total, section) => total + section.weight, 0);
  return Math.abs(totalWeight - 100) < 0.01
    && version.sections.every(section => section.label && Number.isFinite(section.possible) && section.possible > 0 && Number.isFinite(section.weight) && section.weight > 0)
    && version.cutScores.every((cut, index) => Number.isFinite(cut) && cut >= 0 && cut <= 100 && (index === 0 || version.cutScores[index - 1] > cut))
    && Boolean(version.source?.name && version.source?.url && version.label && version.applicableDate);
}

export function calculateApPracticeScore({ version, earnedPoints, possibleOverrides, cutScoreOverrides }) {
  if (!validateApVersion(version) || !Array.isArray(earnedPoints) || earnedPoints.length !== version.sections.length) throw new RangeError('AP version data or section scores are invalid.');
  const sections = version.sections.map((section, index) => ({ label: section.label, earned: Number(earnedPoints[index]), possible: Number(possibleOverrides?.[index] ?? section.possible), weight: section.weight }));
  const calculation = calculateWeightedComposite(sections);
  const normalized = calculation.composite / calculation.totalWeight * 100;
  const cuts = (cutScoreOverrides || version.cutScores).map(Number);
  if (cuts.length !== 4 || cuts.some((cut, index) => !Number.isFinite(cut) || cut < 0 || cut > 100 || (index > 0 && cuts[index - 1] <= cut))) throw new RangeError('Cut scores must descend from score 5 through score 2.');
  return { ...calculation, normalized, predictedScore: estimateApScore(normalized, cuts), cuts, sections };
}
