/**
 * ALKOTA CYCLES — CONFIGURATOR ENGINE TYPES
 * src/lib/configurator/types.ts
 */

export type WeightSource = 'manufacturer_published' | 'measured' | 'estimated' | 'unknown';
export type GroupType = 'single_select' | 'multi_select' | 'quantity' | 'boolean';
export type OptionAvailability = 'available' | 'low_stock' | 'made_to_order' | 'discontinued' | 'coming_soon';
export type RuleType = 'requires' | 'excludes' | 'restricts_to' | 'auto_select' | 'sets_default' | 'market_only' | 'min_quantity' | 'max_quantity';
export type VersionStatus = 'draft' | 'published' | 'superseded';
export type ModelStatus = 'draft' | 'published' | 'archived';
export type FinishOption = 'GLACIER' | 'CARBON' | 'LAB' | 'GRAPHITE' | 'GLACIER_WHITE' | 'RAW_CARBON' | 'COBALT_SPEC' | 'RAW_TITANIUM';

export interface OptionPrice {
  currency: 'GBP' | 'USD';
  delta_minor: number;
  tax_inclusive: boolean;
}

export interface ConfiguratorOption {
  id: string;
  key: string;
  label: string;
  description?: string;
  sku?: string;
  manufacturer?: string;
  manufacturer_part?: string;
  swatch_hex?: string;
  media_id?: string;
  layer_media_id?: string;
  layer_media_url?: string;
  weight_grams: number | null;
  weight_source: WeightSource;
  lead_time_days?: number;
  is_default: boolean;
  is_active: boolean;
  availability: OptionAvailability;
  markets: string[];
  sort_position: number;
  prices: Record<string, OptionPrice>; // currency -> OptionPrice
}

export interface OptionGroup {
  id: string;
  key: string;
  label: string;
  help_text?: string;
  group_type: GroupType;
  is_required: boolean;
  min_select: number;
  max_select: number;
  step_position: number;
  affects_visual: boolean;
  media_layer?: string;
  is_active: boolean;
  options: ConfiguratorOption[];
}

export interface RuleTrigger {
  option_ids?: string[];
  option_keys?: string[];
  group_keys?: string[];
  markets?: string[];
}

export interface RuleEffect {
  option_ids?: string[];
  option_keys?: string[];
  group_key?: string;
  value?: string | number | boolean;
}

export interface ConfiguratorRule {
  id: string;
  name: string;
  rule_type: RuleType;
  trigger: RuleTrigger;
  effect: RuleEffect;
  message: string;
  priority: number;
  is_active: boolean;
}

export interface FrameGeometryMeasurement {
  reach_mm?: number;
  stack_mm?: number;
  head_tube_angle_deg?: number;
  seat_tube_angle_deg?: number;
  chainstay_length_mm?: number;
  wheelbase_mm?: number;
  bb_drop_mm?: number;
  fork_rake_mm?: number;
  standover_height_mm?: number;
  [key: string]: number | undefined;
}

export interface FrameGeometryRow {
  id: string;
  model_id: string;
  size_option_id: string;
  measurements: FrameGeometryMeasurement;
  source: 'measured' | 'cad' | 'unknown';
  verified_by?: string;
  verified_at?: string;
}

export interface RiderFitBandRow {
  id: string;
  model_id: string;
  size_option_id: string;
  min_height_cm: number;
  max_height_cm: number;
  min_inseam_cm?: number;
  max_inseam_cm?: number;
  source?: string;
  verified_at?: string;
}

export interface ConfiguratorPreset {
  id: string;
  key: string;
  label: string;
  description?: string;
  selections: Record<string, string | number | boolean>; // group_key -> option_key or value
  hero_media_id?: string;
  badge?: string;
  sort_position: number;
  is_active: boolean;
}

export interface ConfiguratorVersionSnapshot {
  id: string;
  model_id: string;
  model_slug: string;
  model_name: string;
  version: number;
  base_price_minor: number;
  currency_defaults: Record<string, string>;
  markets: string[];
  groups: OptionGroup[];
  rules: ConfiguratorRule[];
  presets: ConfiguratorPreset[];
  geometry: FrameGeometryRow[];
  fit_bands: RiderFitBandRow[];
  published_at?: string;
}

export interface Violation {
  ruleId: string;
  ruleType: RuleType;
  message: string;
  groupKey: string;
  optionKey?: string;
  lockedConflict?: boolean;
}

export interface EngineResult {
  resolvedSelections: Record<string, string>; // groupKey -> optionKey
  availability: Record<string, 'available' | 'disabled' | 'unavailable_in_market'>; // optionId or `${groupKey}:${optionKey}` -> status
  violations: Violation[];
  pricing: {
    subtotalMinor: number;
    deltas: Array<{ groupKey: string; optionKey: string; deltaMinor: number; label: string }>;
    currency: string;
    taxInclusive: boolean;
  };
  weight: {
    totalGrams: number | null;
    reason: string | null;
  };
  isValid: boolean;
  isComplete: boolean;
  ruleTrace: Array<{ iteration: number; ruleId: string; ruleName: string; ruleType: RuleType; action: string }>;
}
