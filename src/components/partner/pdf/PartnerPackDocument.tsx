import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  PARTNER_TERMS_BY_REGION,
  PARTNER_TERMS_CURRENT_VERSION,
  type PartnerTierTerms,
} from "@/config/partnerTerms";
import type { RegionCode } from "@/lib/regions";

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    padding: 35,
    backgroundColor: "#0d0d0d", // alkota-carbon
    color: "#f5f5f5",          // alkota-white
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.4,
  },
  header: {
    flexDirection: "row",
    justify: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
    paddingBottom: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: "#ffffff",
    textTransform: "uppercase",
  },
  headerSubtitle: {
    fontSize: 8,
    color: "#ff3b00", // alkota-signal
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  coverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 40,
  },
  coverTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 32,
    color: "#ffffff",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  coverSignal: {
    color: "#ff3b00",
  },
  coverSubtitle: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 30,
  },
  partnerBox: {
    padding: 15,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "#ff3b00",
    width: "100%",
    marginTop: 20,
  },
  partnerBoxTitle: {
    fontSize: 8,
    color: "#ff3b00",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  partnerBoxName: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: "#ffffff",
    textTransform: "uppercase",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ff3b00",
    paddingBottom: 4,
  },
  paragraph: {
    marginBottom: 10,
    color: "#cccccc",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    marginVertical: 15,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    padding: 6,
  },
  tableHeader: {
    backgroundColor: "#1a1a1a",
    fontFamily: "Helvetica-Bold",
    color: "#ff3b00",
  },
  tableCol: {
    flex: 1,
  },
  tableColWide: {
    flex: 2,
  },
  draftBanner: {
    padding: 8,
    backgroundColor: "rgba(255, 191, 0, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 191, 0, 0.4)",
    color: "#ffbf00",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 35,
    right: 35,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: 8,
    flexDirection: "row",
    justify: "space-between",
    fontSize: 7,
    color: "#777777",
  },
});

interface PartnerPackProps {
  region: RegionCode;
  partnerName?: string;
  partnerTier?: string;
  partnerRef?: string;
  userSuppliedRRP?: number; // minor units, GBP pence
}

export function PartnerPackDocument({
  region = "uk",
  partnerName,
  partnerTier,
  partnerRef,
  userSuppliedRRP,
}: PartnerPackProps) {
  const termsMap = PARTNER_TERMS_BY_REGION[region];
  const foundation = termsMap?.FOUNDATION;
  const certified = termsMap?.CERTIFIED;
  const isDraft = foundation?.status === "DRAFT" || certified?.status === "DRAFT";

  const generatedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Document title="Alkota Cycles Partner Pack" author="Alkota Cycles Commercial Engineering">
      {/* ── PAGE 1: COVER ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ALKOTA CYCLES</Text>
          <Text style={styles.headerSubtitle}>PARTNER COMMERCIAL PACK</Text>
        </View>

        <View style={styles.coverContainer}>
          <Text style={styles.coverTitle}>
            THE AGENCY <Text style={styles.coverSignal}>PROPOSITION.</Text>
          </Text>
          <Text style={styles.coverSubtitle}>
            Commercial Framework, Earnings Model &amp; Selection Criteria for the Alkota Partner Network.
          </Text>

          {partnerName && (
            <View style={styles.partnerBox}>
              <Text style={styles.partnerBoxTitle}>PREPARED FOR AUTHORISED PARTNER</Text>
              <Text style={styles.partnerBoxName}>{partnerName}</Text>
              <Text style={{ fontSize: 8, color: "#888888", marginTop: 4 }}>
                Reference: {partnerRef ?? "APN-PENDING"} | Tier: {partnerTier ?? "Certified Partner"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text>Document Version: v{PARTNER_TERMS_CURRENT_VERSION} ({generatedDate})</Text>
          <Text>Indicative &amp; non-contractual until a written agreement is executed.</Text>
        </View>
      </Page>

      {/* ── PAGE 2: PROPOSITION & COMMERCIAL TERMS ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ALKOTA AGENCY MODEL</Text>
          <Text style={styles.headerSubtitle}>PAGE 02 / 04</Text>
        </View>

        {isDraft && (
          <View style={styles.draftBanner}>
            <Text>INDICATIVE, NON-CONTRACTUAL DRAFT TERMS — DEVELOPMENT SPECIFICATION</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>01. THE AGENCY PROPOSITION</Text>
        <Text style={styles.paragraph}>
          Alkota Cycles operates a genuine Agency Model rather than traditional distribution. Alkota retains ownership of the bicycle until it reaches the rider. The partner introduces, fits, builds, hands over, and services — receiving commission plus fixed fees.
        </Text>
        <Text style={styles.paragraph}>
          • Zero Inventory Risk: You never buy stock or take floorplan interest risk.{"\n"}
          • One Price Everywhere: Uniform RRP across online and physical retail channels.{"\n"}
          • Catchment Territory Protection: Earn full commission on all orders originating in your designated catchment radius.
        </Text>

        <Text style={styles.sectionTitle}>02. SINGLE-SOURCE COMMERCIAL SCHEDULE</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableColWide}>COMMERCIAL PARAMETER</Text>
            <Text style={styles.tableCol}>FOUNDATION</Text>
            <Text style={styles.tableCol}>CERTIFIED</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColWide}>Agency Commission (% of ex-VAT RRP)</Text>
            <Text style={styles.tableCol}>{foundation?.commissionPercent ?? 17}%</Text>
            <Text style={styles.tableCol}>{certified?.commissionPercent ?? 20}%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColWide}>Fit, Build &amp; Handover Fee</Text>
            <Text style={styles.tableCol}>£{((foundation?.fitBuildHandoverFeeMinor ?? 35000) / 100).toFixed(2)}</Text>
            <Text style={styles.tableCol}>£{((certified?.fitBuildHandoverFeeMinor ?? 50000) / 100).toFixed(2)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColWide}>First Service Reimbursement</Text>
            <Text style={styles.tableCol}>£{((foundation?.firstServiceReimbursementMinor ?? 7500) / 100).toFixed(2)}</Text>
            <Text style={styles.tableCol}>£{((certified?.firstServiceReimbursementMinor ?? 10000) / 100).toFixed(2)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColWide}>Warranty Labour Reimbursement Rate</Text>
            <Text style={styles.tableCol}>£{((foundation?.warrantyLabourRateMinor ?? 7500) / 100).toFixed(2)} / hr</Text>
            <Text style={styles.tableCol}>£{((certified?.warrantyLabourRateMinor ?? 8500) / 100).toFixed(2)} / hr</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableColWide}>Default Catchment Radius</Text>
            <Text style={styles.tableCol}>{foundation?.catchmentRadiusMiles ?? 30} Miles</Text>
            <Text style={styles.tableCol}>{certified?.catchmentRadiusMiles ?? 40} Miles</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Alkota Cycles | Single Source Commercial Schedule ({region.toUpperCase()})</Text>
          <Text>Indicative &amp; non-contractual until a written agreement is executed.</Text>
        </View>
      </Page>

      {/* ── PAGE 3: EARNINGS EXAMPLE & SELECTION CRITERIA ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EARNINGS &amp; SELECTION CRITERIA</Text>
          <Text style={styles.headerSubtitle}>PAGE 03 / 04</Text>
        </View>

        <Text style={styles.sectionTitle}>03. WORKED EARNINGS BREAKDOWN</Text>
        {userSuppliedRRP && userSuppliedRRP > 0 ? (
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableColWide}>EARNINGS COMPONENT (ASSUMED £{(userSuppliedRRP / 100).toFixed(2)} EX-VAT)</Text>
              <Text style={styles.tableCol}>AMOUNT PER UNIT</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColWide}>Agency Commission (20% Certified)</Text>
              <Text style={styles.tableCol}>£{((userSuppliedRRP * 0.2) / 100).toFixed(2)}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColWide}>Fit, Build &amp; Handover Fee</Text>
              <Text style={styles.tableCol}>£500.00</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColWide}>First Service Reimbursement</Text>
              <Text style={styles.tableCol}>£100.00</Text>
            </View>
            <View style={[styles.tableRow, { backgroundColor: "rgba(255,59,0,0.1)" }]}>
              <Text style={[styles.tableColWide, { fontFamily: "Helvetica-Bold", color: "#ff3b00" }]}>
                TOTAL REVENUE / UNIT HANDLED
              </Text>
              <Text style={[styles.tableCol, { fontFamily: "Helvetica-Bold", color: "#ff3b00" }]}>
                £{(((userSuppliedRRP * 0.2) + 60000) / 100).toFixed(2)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ padding: 12, backgroundColor: "#151515", borderWidth: 1, borderColor: "#333333", marginBottom: 15 }}>
            <Text style={{ color: "#ff3b00", fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
              UNPUBLISHED PRICING NOTICE
            </Text>
            <Text style={{ color: "#aaaaaa" }}>
              Alkota Cycles has not published production pricing for Project 01. To view a worked earnings breakdown, supply an assumed ex-VAT RRP parameter when generating this pack.
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>04. APN-01..04 SELECTION CRITERIA</Text>
        <Text style={styles.paragraph}>
          • APN-01 (Technical Competence): Full suspension service, geometry fit, carbon frame inspection, drivetrain specification.{"\n"}
          • APN-02 (Customer Philosophy): Long-term relationship over transaction, ownership support.{"\n"}
          • APN-03 (Fit Capability): Structured rider assessment, reach/stack analysis, contact point optimization.{"\n"}
          • APN-04 (Brand Alignment): Premium engineering-led retail environment, dedicated demo machine presentation.
        </Text>

        <View style={styles.footer}>
          <Text>Alkota Cycles | Selection &amp; Commercial Criteria</Text>
          <Text>Indicative &amp; non-contractual until a written agreement is executed.</Text>
        </View>
      </Page>

      {/* ── PAGE 4: COMMITMENTS & APPLICATION ── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MUTUAL COMMITMENTS &amp; APPLICATION</Text>
          <Text style={styles.headerSubtitle}>PAGE 04 / 04</Text>
        </View>

        <Text style={styles.sectionTitle}>05. MUTUAL PROGRAMME COMMITMENTS</Text>
        <Text style={styles.paragraph}>
          Alkota Commits To:{"\n"}
          1. Supply dedicated pre-production demo machines on agreed rotation.{"\n"}
          2. Guarantee exclusive catchment territory radius.{"\n"}
          3. Process warranty claims under a 24-hour evaluation SLA.{"\n"}
          4. Provide comprehensive technical PDI training and certification.
        </Text>
        <Text style={styles.paragraph}>
          Partner Commits To:{"\n"}
          1. Maintain trained, certified technicians for PDI assembly and fit.{"\n"}
          2. Operate active customer demo sessions and log ride conversions.{"\n"}
          3. Maintain premium single-brand presentation for Alkota bikes.
        </Text>

        <Text style={styles.sectionTitle}>06. APPLICATION &amp; EVALUATION ROUTE</Text>
        <Text style={styles.paragraph}>
          Apply online at alkotacycles.com/uk/partners#apply. Every application is evaluated directly by Alkota commercial engineering. You will receive a written evaluation decision within 10 working days.
        </Text>

        <View style={styles.footer}>
          <Text>Alkota Cycles | Partner Pack End</Text>
          <Text>Indicative &amp; non-contractual until a written agreement is executed.</Text>
        </View>
      </Page>
    </Document>
  );
}
