import type { CalculatorTemplateType } from '../types/calculator';
import WordCounter from '../components/tools/WordCounter.astro';
import RemoveEmptyLines from '../components/tools/RemoveEmptyLines.astro';
import RemoveDuplicateEmail from '../components/tools/RemoveDuplicateEmail.astro';
import CompareTwoLists from '../components/tools/CompareTwoLists.astro';
import PomodoroTimer from '../components/tools/PomodoroTimer.astro';
import TallyCounter from '../components/tools/TallyCounter.astro';
import RandomTeamGenerator from '../components/tools/RandomTeamGenerator.astro';
import BACCalculator from '../components/tools/BACCalculator.astro';
import BAHCalculator from '../components/tools/BAHCalculator.astro';
import CDCalculator from '../components/tools/CDCalculator.astro';
import DynastyTradeCalculator from '../components/tools/DynastyTradeCalculator.astro';
import ScoreBoard from '../components/tools/ScoreBoard.astro';
import QRCodeGenerator from '../components/tools/QRCodeGenerator.astro';
import QRCodeReader from '../components/tools/QRCodeReader.astro';
import TI84Calculator from '../components/tools/TI84Calculator.astro';
import PalworldBreedingCalculator from '../components/tools/PalworldBreedingCalculator.astro';
import GradeCalculator from '../components/tools/GradeCalculator.astro';
import GPACalculator from '../components/tools/GPACalculator.astro';
import APScoreCalculator from '../components/tools/APScoreCalculator.astro';
import MaterialCalculatorHub from '../components/tools/MaterialCalculatorHub.astro';
import MaterialQuantityCalculator from '../components/tools/MaterialQuantityCalculator.astro';
import FFMICalculator from '../components/tools/FFMICalculator.astro';
import FFMIResearchReference from '../components/tools/FFMIResearchReference.astro';
import BodyTypeCalculator from '../components/tools/BodyTypeCalculator.astro';
import PuppyWeightCalculator from '../components/tools/PuppyWeightCalculator.astro';
import CDInterestCalculator from '../components/tools/CDInterestCalculator.astro';
import PaycheckCalculator from '../components/tools/PaycheckCalculator.astro';
import MoneyLastCalculator from '../components/tools/MoneyLastCalculator.astro';
import SwimTimeConverter from '../components/tools/SwimTimeConverter.astro';
import LSACGPACalculator from '../components/tools/LSACGPACalculator.astro';
import LSATScoreCalculator from '../components/tools/LSATScoreCalculator.astro';
import CinderBlockCalculator from '../components/tools/CinderBlockCalculator.astro';
import VDOTCalculator from '../components/tools/VDOTCalculator.astro';
import WattsToAmpsCalculator from '../components/tools/WattsToAmpsCalculator.astro';
import LinearFeetCalculator from '../components/tools/LinearFeetCalculator.astro';
import RebarCalculator from '../components/tools/RebarCalculator.astro';
import BowlingScoreCalculator from '../components/tools/BowlingScoreCalculator.astro';
import PartialFractionCalculator from '../components/tools/PartialFractionCalculator.astro';
import TankVolumeCalculator from '../components/tools/TankVolumeCalculator.astro';
import DailyBatch260812Calculator from '../components/tools/DailyBatch260812Calculator.astro';
import DailyBatch260813Calculator from '../components/tools/DailyBatch260813Calculator.astro';
import DailyBatch260814Calculator from '../components/tools/DailyBatch260814Calculator.astro';
import DailyBatch260815Calculator from '../components/tools/DailyBatch260815Calculator.astro';

export type ApplicationCategory =
  | 'UtilitiesApplication'
  | 'EducationalApplication'
  | 'FinanceApplication'
  | 'GameApplication'
  | 'SportsApplication';

export interface ToolRegistryEntry {
  component: any;
  referenceComponent?: any;
  template: CalculatorTemplateType;
  applicationCategory?: ApplicationCategory;
}

export const toolRegistry: Record<string, ToolRegistryEntry> = {
  'word-counter': { component: WordCounter, template: 'custom' },
  'remove-empty-lines': { component: RemoveEmptyLines, template: 'custom' },
  'remove-duplicate-email': { component: RemoveDuplicateEmail, template: 'custom' },
  'compare-two-lists': { component: CompareTwoLists, template: 'custom' },
  'pomodoro-timer': { component: PomodoroTimer, template: 'custom' },
  'tally-counter': { component: TallyCounter, template: 'custom' },
  'random-team-generator': { component: RandomTeamGenerator, template: 'custom' },
  'bac-calculator': { component: BACCalculator, template: 'formula' },
  'bah-calculator': { component: BAHCalculator, template: 'versioned-lookup' },
  'cd-calculator': { component: CDCalculator, template: 'formula', applicationCategory: 'FinanceApplication' },
  'dynasty-trade-calculator': { component: DynastyTradeCalculator, template: 'formula', applicationCategory: 'GameApplication' },
  'score-board': { component: ScoreBoard, template: 'custom' },
  'qr-code-generator': { component: QRCodeGenerator, template: 'custom' },
  'qr-code-reader': { component: QRCodeReader, template: 'custom' },
  'ti-84-calculator': { component: TI84Calculator, template: 'custom', applicationCategory: 'EducationalApplication' },
  'palworld-breeding-calculator': { component: PalworldBreedingCalculator, template: 'versioned-lookup', applicationCategory: 'GameApplication' },
  'grade-calculator': { component: GradeCalculator, template: 'multi-row', applicationCategory: 'EducationalApplication' },
  'gpa-calculator': { component: GPACalculator, template: 'multi-row', applicationCategory: 'EducationalApplication' },
  'ap-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'apush-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'ap-lang-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'ap-biology-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'ap-chemistry-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'ap-calculus-ab-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'ap-calculus-bc-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'ap-statistics-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'ap-psychology-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'ap-world-history-score-calculator': { component: APScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'material-calculator': { component: MaterialCalculatorHub, template: 'custom' },
  'asphalt-calculator': { component: MaterialQuantityCalculator, template: 'formula' },
  'sand-calculator': { component: MaterialQuantityCalculator, template: 'formula' },
  'gravel-calculator': { component: MaterialQuantityCalculator, template: 'formula' },
  'topsoil-calculator': { component: MaterialQuantityCalculator, template: 'formula' },
  'concrete-calculator': { component: MaterialQuantityCalculator, template: 'formula' },
  'ffmi-calculator': { component: FFMICalculator, referenceComponent: FFMIResearchReference, template: 'formula' },
  'body-type-calculator': { component: BodyTypeCalculator, template: 'formula' },
  'puppy-weight-calculator': { component: PuppyWeightCalculator, template: 'formula' },
  'cd-interest-calculator': { component: CDInterestCalculator, template: 'formula', applicationCategory: 'FinanceApplication' },
  'paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'arkansas-paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'michigan-paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'washington-paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'indiana-paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'maryland-paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'virginia-paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'illinois-paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'missouri-paycheck-calculator': { component: PaycheckCalculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'money-last-calculator': { component: MoneyLastCalculator, template: 'formula', applicationCategory: 'FinanceApplication' },
  'swim-time-converter': { component: SwimTimeConverter, template: 'converter', applicationCategory: 'SportsApplication' },
  'lsac-gpa-calculator': { component: LSACGPACalculator, template: 'multi-row', applicationCategory: 'EducationalApplication' },
  'lsat-score-calculator': { component: LSATScoreCalculator, template: 'versioned-lookup', applicationCategory: 'EducationalApplication' },
  'cinder-block-calculator': { component: CinderBlockCalculator, template: 'formula' },
  'vdot-calculator': { component: VDOTCalculator, template: 'formula', applicationCategory: 'SportsApplication' },
  'watts-to-amps-calculator': { component: WattsToAmpsCalculator, template: 'formula' },
  'linear-feet-calculator': { component: LinearFeetCalculator, template: 'multi-row' },
  'rebar-calculator': { component: RebarCalculator, template: 'formula' },
  'bowling-score-calculator': { component: BowlingScoreCalculator, template: 'custom', applicationCategory: 'SportsApplication' },
  'partial-fraction-decomposition-calculator': { component: PartialFractionCalculator, template: 'formula', applicationCategory: 'EducationalApplication' },
  'tank-volume-calculator': { component: TankVolumeCalculator, template: 'formula' },
  'cross-stitch-calculator': { component: DailyBatch260812Calculator, template: 'formula' },
  'dunk-calculator': { component: DailyBatch260812Calculator, template: 'formula', applicationCategory: 'SportsApplication' },
  'snowboard-size-calculator': { component: DailyBatch260812Calculator, template: 'versioned-lookup', applicationCategory: 'SportsApplication' },
  'calculator-bricks': { component: DailyBatch260812Calculator, template: 'formula' },
  'furnace-size-calculator': { component: DailyBatch260812Calculator, template: 'formula' },
  'audiobook-calculator': { component: DailyBatch260813Calculator, template: 'formula' },
  'rpm-calculator': { component: DailyBatch260813Calculator, template: 'formula' },
  'foc-calculator': { component: DailyBatch260813Calculator, template: 'formula', applicationCategory: 'SportsApplication' },
  'circle-skirt-calculator': { component: DailyBatch260813Calculator, template: 'formula' },
  'linear-interpolation-calculator': { component: DailyBatch260813Calculator, template: 'formula', applicationCategory: 'EducationalApplication' },
  'roth-401k-calculator': { component: DailyBatch260814Calculator, template: 'versioned-lookup', applicationCategory: 'FinanceApplication' },
  'schd-calculator': { component: DailyBatch260814Calculator, template: 'formula', applicationCategory: 'FinanceApplication' },
  'tire-pressure-calculator': { component: DailyBatch260814Calculator, template: 'formula' },
  'partial-derivative-calculator': { component: DailyBatch260814Calculator, template: 'custom', applicationCategory: 'EducationalApplication' },
  'edpi-calculator': { component: DailyBatch260814Calculator, template: 'formula', applicationCategory: 'GameApplication' },
  'sig-fig-calculator': { component: DailyBatch260815Calculator, template: 'formula', applicationCategory: 'EducationalApplication' },
  'binomial-distribution-calculator': { component: DailyBatch260815Calculator, template: 'formula', applicationCategory: 'EducationalApplication' },
  'percentage-calculator': { component: DailyBatch260815Calculator, template: 'formula', applicationCategory: 'EducationalApplication' },
  'binomial-calculator': { component: DailyBatch260815Calculator, template: 'formula', applicationCategory: 'EducationalApplication' },
  'statistics-calculator': { component: DailyBatch260815Calculator, template: 'multi-row', applicationCategory: 'EducationalApplication' },
};
