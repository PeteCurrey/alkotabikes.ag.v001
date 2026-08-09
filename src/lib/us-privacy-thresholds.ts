/**
 * ALKOTA CYCLES — US PRIVACY THRESHOLDS
 * lib/us-privacy-thresholds.ts
 *
 * Records per-state comprehensive privacy law thresholds and Alkota's dated
 * applicability assessment. Architecture supports compliance; a single US
 * Privacy Notice honouring the common core rights is proportionate at this
 * stage of the business.
 *
 * Review dates are set to 12 months from assessment date. US state privacy law
 * is evolving rapidly — this file must be reviewed before any US commercial launch.
 *
 * ASSESSMENT DATE: 2026-08
 * NEXT REVIEW: 2027-08
 */

export type ApplicabilityStatus =
  | "NOT_APPLICABLE" // threshold not met; assessment documented
  | "MONITOR"        // approaching threshold; watch
  | "APPLICABLE"     // threshold met; compliance required
  | "UNASSESSED";    // no assessment conducted

export interface StatePrivacyThreshold {
  state: string;
  stateCode: string;
  /** Law name and citation */
  law: string;
  /** Effective date of the law */
  effectiveDate: string;
  /** Consumer threshold (number of residents' data processed/year), or null if not data-volume based */
  consumerThreshold: number | null;
  /** Revenue threshold in USD, or null */
  revenueThreshold: number | null;
  /** Revenue from data sales threshold as % of revenue, or null */
  dataSalesRevenuePercent: number | null;
  /** Alkota's current applicability status */
  status: ApplicabilityStatus;
  /** Rationale for the status assessment */
  rationale: string;
  /** Date of this assessment */
  assessedDate: string;
  /** Date to review this assessment */
  reviewDate: string;
  /** Whether this state requires honouring the Global Privacy Control signal */
  requiresGPC: boolean;
  /** Whether this state has a "Do Not Sell" opt-out right */
  hasDNS: boolean;
  /** Whether this state has a "Do Not Share" for cross-context behavioural advertising right */
  hasDNSh: boolean;
  /** Notes */
  notes?: string;
}

export const US_PRIVACY_THRESHOLDS: StatePrivacyThreshold[] = [
  {
    state: "California",
    stateCode: "CA",
    law: "California Consumer Privacy Act (CCPA) as amended by CPRA — Cal. Civ. Code §1798.100 et seq.",
    effectiveDate: "2020-01-01",
    consumerThreshold: 100000,
    revenueThreshold: 25_000_000,
    dataSalesRevenuePercent: 50,
    status: "NOT_APPLICABLE",
    rationale:
      "Alkota Cycles is a pre-production start-up. Annual gross revenue is well below $25 million. Consumer data processed is well below 100,000 California residents. Data sales revenue is nil. No threshold is met. Status to be reassessed annually and upon any material revenue event.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: true,
    hasDNS: true,
    hasDNSh: true,
    notes:
      "Despite non-applicability, Alkota honours the GPC signal and provides a DNS/DNSh link as a matter of best practice and to future-proof the architecture.",
  },
  {
    state: "Virginia",
    stateCode: "VA",
    law: "Virginia Consumer Data Protection Act (VCDPA) — Va. Code Ann. §59.1-575 et seq.",
    effectiveDate: "2023-01-01",
    consumerThreshold: 100000,
    revenueThreshold: null,
    dataSalesRevenuePercent: 50,
    status: "NOT_APPLICABLE",
    rationale:
      "Consumer data processed is well below 100,000 Virginia residents. Data sales revenue is nil.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: false,
    hasDNS: true,
    hasDNSh: true,
  },
  {
    state: "Colorado",
    stateCode: "CO",
    law: "Colorado Privacy Act (CPA) — C.R.S. §6-1-1301 et seq.",
    effectiveDate: "2023-07-01",
    consumerThreshold: 100000,
    revenueThreshold: null,
    dataSalesRevenuePercent: 25,
    status: "NOT_APPLICABLE",
    rationale:
      "Consumer data processed is well below 100,000 Colorado residents. Data sales revenue is nil.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: true,
    hasDNS: true,
    hasDNSh: true,
  },
  {
    state: "Connecticut",
    stateCode: "CT",
    law: "Connecticut Data Privacy Act (CTDPA) — Conn. Gen. Stat. §42-515 et seq.",
    effectiveDate: "2023-07-01",
    consumerThreshold: 100000,
    revenueThreshold: null,
    dataSalesRevenuePercent: 25,
    status: "NOT_APPLICABLE",
    rationale:
      "Consumer data processed is well below 100,000 Connecticut residents. Data sales revenue is nil.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: true,
    hasDNS: true,
    hasDNSh: true,
  },
  {
    state: "Utah",
    stateCode: "UT",
    law: "Utah Consumer Privacy Act (UCPA) — Utah Code Ann. §13-61-101 et seq.",
    effectiveDate: "2023-12-31",
    consumerThreshold: 100000,
    revenueThreshold: 25_000_000,
    dataSalesRevenuePercent: 50,
    status: "NOT_APPLICABLE",
    rationale:
      "Annual gross revenue is well below $25 million. Consumer data processed is well below 100,000 Utah residents.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: false,
    hasDNS: true,
    hasDNSh: false,
  },
  {
    state: "Texas",
    stateCode: "TX",
    law: "Texas Data Privacy and Security Act (TDPSA) — Tex. Bus. & Com. Code Ch. 541",
    effectiveDate: "2024-07-01",
    consumerThreshold: null,
    revenueThreshold: null,
    dataSalesRevenuePercent: null,
    status: "MONITOR",
    rationale:
      "TDPSA applies to any entity conducting business in Texas that processes personal data, with no specific consumer volume or revenue threshold (small-business exemption applies only to entities with fewer than 100 full-time employees AND no data sales). Alkota has no employees at present. Status requires legal review before US commercial launch.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: true,
    hasDNS: true,
    hasDNSh: true,
    notes:
      "Small-business exemption must be confirmed with counsel before US launch.",
  },
  {
    state: "Montana",
    stateCode: "MT",
    law: "Montana Consumer Data Privacy Act (MCDPA) — Mont. Code Ann. §30-14-3001 et seq.",
    effectiveDate: "2024-10-01",
    consumerThreshold: 50000,
    revenueThreshold: null,
    dataSalesRevenuePercent: 25,
    status: "NOT_APPLICABLE",
    rationale:
      "Consumer data processed is well below 50,000 Montana residents. Data sales revenue is nil.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: false,
    hasDNS: true,
    hasDNSh: true,
  },
  {
    state: "Oregon",
    stateCode: "OR",
    law: "Oregon Consumer Privacy Act (OCPA) — ORS Ch. 646A",
    effectiveDate: "2024-07-01",
    consumerThreshold: 100000,
    revenueThreshold: null,
    dataSalesRevenuePercent: 25,
    status: "NOT_APPLICABLE",
    rationale:
      "Consumer data processed is well below 100,000 Oregon residents. Data sales revenue is nil.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: false,
    hasDNS: true,
    hasDNSh: true,
  },
  {
    state: "Florida",
    stateCode: "FL",
    law: "Florida Digital Bill of Rights (FDBR) — Fla. Stat. §501.701 et seq.",
    effectiveDate: "2024-07-01",
    consumerThreshold: 1_000_000,
    revenueThreshold: 1_000_000_000,
    dataSalesRevenuePercent: 50,
    status: "NOT_APPLICABLE",
    rationale:
      "Annual gross revenue is well below $1 billion. FDBR thresholds are the highest of any state law.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: false,
    hasDNS: true,
    hasDNSh: true,
  },
  {
    state: "Delaware",
    stateCode: "DE",
    law: "Delaware Personal Data Privacy Act (DPDPA) — 6 Del. C. §12D-101 et seq.",
    effectiveDate: "2025-01-01",
    consumerThreshold: 35000,
    revenueThreshold: null,
    dataSalesRevenuePercent: 20,
    status: "NOT_APPLICABLE",
    rationale:
      "Consumer data processed is well below 35,000 Delaware residents. Data sales revenue is nil.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: false,
    hasDNS: true,
    hasDNSh: true,
  },
  {
    state: "New Hampshire",
    stateCode: "NH",
    law: "New Hampshire Privacy Act (NHPA) — RSA 507-H",
    effectiveDate: "2025-01-01",
    consumerThreshold: 35000,
    revenueThreshold: null,
    dataSalesRevenuePercent: 25,
    status: "NOT_APPLICABLE",
    rationale:
      "Consumer data processed is well below 35,000 New Hampshire residents. Data sales revenue is nil.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: false,
    hasDNS: true,
    hasDNSh: true,
  },
  {
    state: "New Jersey",
    stateCode: "NJ",
    law: "New Jersey Data Privacy Act (NJDPA) — P.L. 2023, c. 266",
    effectiveDate: "2025-01-15",
    consumerThreshold: 100000,
    revenueThreshold: null,
    dataSalesRevenuePercent: 25,
    status: "NOT_APPLICABLE",
    rationale:
      "Consumer data processed is well below 100,000 New Jersey residents. Data sales revenue is nil.",
    assessedDate: "2026-08-01",
    reviewDate: "2027-08-01",
    requiresGPC: true,
    hasDNS: true,
    hasDNSh: true,
  },
];

/**
 * Returns all states where Alkota must honour the GPC signal regardless
 * of overall law applicability.
 */
export function statesRequiringGPC(): StatePrivacyThreshold[] {
  return US_PRIVACY_THRESHOLDS.filter((s) => s.requiresGPC);
}

/**
 * Returns all states currently assessed as MONITOR — requiring legal
 * review before US commercial launch.
 */
export function statesRequiringReview(): StatePrivacyThreshold[] {
  return US_PRIVACY_THRESHOLDS.filter((s) => s.status === "MONITOR" || s.status === "UNASSESSED");
}
