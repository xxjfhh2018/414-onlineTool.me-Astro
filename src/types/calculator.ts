export type CalculatorTemplateType =
  | 'formula'
  | 'converter'
  | 'multi-row'
  | 'versioned-lookup'
  | 'custom';

export type CalculatorResultLabel =
  | 'Exact calculation'
  | 'Planning estimate'
  | 'Estimated equivalent'
  | 'Demonstration'
  | 'Version-specific result';

export type CalculatorInputKind =
  | 'number'
  | 'select'
  | 'time'
  | 'date'
  | 'text'
  | 'toggle';

export interface CalculatorSelectOption {
  label: string;
  value: string | number;
}

export interface CalculatorInputDefinition {
  id: string;
  label: string;
  kind: CalculatorInputKind;
  unit?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  readOnly?: boolean;
  advanced?: boolean;
  options?: CalculatorSelectOption[];
}

export interface CalculatorOutputDefinition {
  id: string;
  label: string;
  unit?: string;
  decimals?: number;
  primary?: boolean;
  description?: string;
}

export interface CalculatorValidationRule {
  inputId: string;
  rule: 'required' | 'minimum' | 'maximum' | 'nonzero' | 'custom';
  value?: string | number;
  message: string;
}

export interface CalculatorTestCase {
  name: string;
  kind: 'normal' | 'boundary' | 'invalid' | 'exceptional' | 'published-example';
  inputs: Record<string, string | number | boolean>;
  expected: Record<string, string | number | boolean>;
  tolerance?: number;
  notes?: string;
}

export interface CalculatorSource {
  name: string;
  url: string;
  publisher?: string;
  accessedDate?: string;
}

export interface CalculatorProvenance {
  resultLabel: CalculatorResultLabel;
  sources: CalculatorSource[];
  version?: string;
  applicableDate?: string;
  lastVerified: string;
  updateResponsibility: string;
  assumptions: string[];
}

export interface CalculatorSpecification {
  slug: string;
  template: CalculatorTemplateType;
  inputs: CalculatorInputDefinition[];
  outputs: CalculatorOutputDefinition[];
  formula: string;
  calculationSteps: string[];
  rounding: string;
  validation: CalculatorValidationRule[];
  exceptionalStates: string[];
  provenance: CalculatorProvenance;
  testCases: CalculatorTestCase[];
}
