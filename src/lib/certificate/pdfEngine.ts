/**
 * ALKOTA PROJECT 01 — DEVELOPMENT BUILD CERTIFICATE ENGINE
 * 
 * Generates vector print-ready PDF certificate layout, HTML print document,
 * and JSON payload for Project 01 Development Build Certificates.
 */

import { SITE_URL } from "@/lib/env";

export interface CertificateData {
  buildReference: string;
  fitReference: string;
  revision: string;
  dateCreated: string;
  finish: "GLACIER" | "CARBON";
  sizeDirection: string;
  components: {
    chassis: string;
    fork: string;
    shock: string;
    frontBrake: string;
    rearBrake: string;
    drivetrain: string;
    wheels: string;
    tyres: string;
    cockpit: string;
    grips: string;
  };
  pricingStatus: string;
  buildUrl: string;
}

export function createCertificateData(
  buildRef: string = "P01-CFG-A8F2E4",
  fitRef: string = "P01-FIT-7C91D3",
  finish: "GLACIER" | "CARBON" = "CARBON",
  size: string = "L"
): CertificateData {
  return {
    buildReference: buildRef,
    fitReference: fitRef,
    revision: "R00",
    dateCreated: new Date().toISOString().split("T")[0],
    finish,
    sizeDirection: `Size ${size} (${size === "L" ? "R00 Master Baseline" : "Development Indication"})`,
    components: {
      chassis: "Alkota Project 01 Full Carbon Development Chassis",
      fork: "FOX 38 Factory 160 mm GRIP X2 Damper (Kashima)",
      shock: "FOX Float X2 Factory 205x65 Trunnion (150 mm Target)",
      frontBrake: "Hope EVO V6Ti 6-Piston Titanium Hardware",
      rearBrake: "Hope TR4 4-Piston CNC Rear (Asymmetric)",
      drivetrain: "SRAM XX Eagle AXS Transmission (Full Mount)",
      wheels: "DT Swiss EXC 1200 Carbon 29\" Wheelset",
      tyres: "Maxxis Assegai 2.5 Front / Minion DHR II 2.4 Rear Tan Wall",
      cockpit: "Renthal Fatbar Carbon 35 / 800 mm Width",
      grips: "Ergon GE1 Evo Enduro Grips",
    },
    pricingStatus: "FINAL PRICING TO BE CONFIRMED",
    buildUrl: `${SITE_URL}/configure?build=${buildRef}`,
  };
}

/**
 * Returns print HTML markup for rendering or saving as PDF
 */
export function generateCertificateHTML(data: CertificateData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ALKOTA-P01-BUILD-${data.buildReference}</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    body {
      margin: 0;
      padding: 40px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #0D0D0E;
      color: #FFFFFF;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cert-container {
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 36px;
      position: relative;
      min-height: 1000px;
      box-sizing: border-box;
      background: radial-gradient(circle at top right, rgba(30, 144, 255, 0.08), transparent 60%);
    }
    .header {
      border-bottom: 2px solid #1E90FF;
      padding-bottom: 20px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #FFFFFF;
    }
    .doc-type {
      font-family: monospace;
      font-size: 11px;
      color: #1E90FF;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: bold;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 28px;
      font-family: monospace;
      font-size: 10px;
    }
    .meta-box {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 10px;
    }
    .meta-label { color: #8E8E93; font-size: 8px; text-transform: uppercase; display: block; margin-bottom: 4px; }
    .meta-value { color: #FFFFFF; font-weight: bold; font-size: 11px; }
    .highlight-value { color: #1E90FF; }
    .spec-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 28px;
      font-size: 11px;
    }
    .spec-table th {
      text-align: left;
      font-family: monospace;
      font-size: 9px;
      color: #1E90FF;
      text-transform: uppercase;
      padding: 8px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .spec-table td {
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .spec-label { font-family: monospace; color: #8E8E93; text-transform: uppercase; width: 30%; font-size: 10px; }
    .spec-val { font-weight: 600; color: #FFFFFF; }
    .disclaimer-box {
      border: 1px solid rgba(30, 144, 255, 0.4);
      background: rgba(30, 144, 255, 0.08);
      padding: 16px;
      font-size: 10px;
      line-height: 1.5;
      color: #D1D1D6;
      margin-top: 24px;
    }
    .disclaimer-title {
      font-family: monospace;
      color: #1E90FF;
      font-weight: bold;
      margin-bottom: 6px;
      letter-spacing: 1px;
    }
    .footer {
      margin-top: 36px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: monospace;
      font-size: 9px;
      color: #8E8E93;
    }
  </style>
</head>
<body>
  <div class="cert-container">
    <div class="header">
      <div>
        <div class="brand-title">ALKOTA CYCLES</div>
        <div style="font-size: 12px; color: #8E8E93; margin-top: 4px;">PERFORMANCE ENGINEERING · BARNOLDSWICK UK</div>
      </div>
      <div style="text-align: right;">
        <div class="doc-type">DEVELOPMENT BUILD CERTIFICATE</div>
        <div style="font-family: monospace; font-size: 10px; color: #8E8E93; margin-top: 2px;">PROJECT 01 PROGRAMME</div>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-box">
        <span class="meta-label">BUILD REFERENCE</span>
        <span class="meta-value highlight-value">${data.buildReference}</span>
      </div>
      <div class="meta-box">
        <span class="meta-label">FIT REFERENCE</span>
        <span class="meta-value">${data.fitReference}</span>
      </div>
      <div class="meta-box">
        <span class="meta-label">PROJECT REVISION</span>
        <span class="meta-value">${data.revision}</span>
      </div>
      <div class="meta-box">
        <span class="meta-label">DATE CREATED</span>
        <span class="meta-value">${data.dateCreated}</span>
      </div>
    </div>

    <table class="spec-table">
      <thead>
        <tr>
          <th>SYSTEM CATEGORY</th>
          <th>DEVELOPMENT SPECIFICATION</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="spec-label">LAUNCH FINISH</td>
          <td class="spec-val">${data.finish === "GLACIER" ? "GLACIER WHITE (ARCHITECTURAL PAINTED)" : "NAKED CARBON (STRUCTURAL RAW UD)"}</td>
        </tr>
        <tr>
          <td class="spec-label">DEVELOPMENT SIZE DIRECTION</td>
          <td class="spec-val">${data.sizeDirection}</td>
        </tr>
        <tr>
          <td class="spec-label">FRAME CHASSIS</td>
          <td class="spec-val">${data.components.chassis}</td>
        </tr>
        <tr>
          <td class="spec-label">FRONT SUSPENSION (160 MM)</td>
          <td class="spec-val">${data.components.fork}</td>
        </tr>
        <tr>
          <td class="spec-label">REAR SUSPENSION (150 MM TARGET)</td>
          <td class="spec-val">${data.components.shock}</td>
        </tr>
        <tr>
          <td class="spec-label">FRONT BRAKE (6-PISTON)</td>
          <td class="spec-val">${data.components.frontBrake}</td>
        </tr>
        <tr>
          <td class="spec-label">REAR BRAKE (4-PISTON)</td>
          <td class="spec-val">${data.components.rearBrake}</td>
        </tr>
        <tr>
          <td class="spec-label">TRANSMISSION</td>
          <td class="spec-val">${data.components.drivetrain}</td>
        </tr>
        <tr>
          <td class="spec-label">WHEELSET (29/29 PRIMARY)</td>
          <td class="spec-val">${data.components.wheels}</td>
        </tr>
        <tr>
          <td class="spec-label">TYRE SPECIFICATION</td>
          <td class="spec-val">${data.components.tyres}</td>
        </tr>
        <tr>
          <td class="spec-label">COCKPIT & GRIPS</td>
          <td class="spec-val">${data.components.cockpit} / ${data.components.grips}</td>
        </tr>
        <tr>
          <td class="spec-label">PRICING STATUS</td>
          <td class="spec-val">${data.pricingStatus}</td>
        </tr>
      </tbody>
    </table>

    <div class="disclaimer-box">
      <div class="disclaimer-title">DEVELOPMENT PROGRAMME DISCLAIMER</div>
      This configuration represents a pre-production Project 01 development build created against revision ${data.revision}. Final specification, fit, component availability, pricing, and production timing remain subject to engineering validation and production release. This document does not constitute a production order or guarantee of vehicle delivery.
    </div>

    <div class="footer">
      <div>ALKOTA PERFORMANCE ENGINEERING · SINGLE SOURCE OF TRUTH BASELINE ${data.revision}</div>
      <div>BUILD SPECIFICATION URL: ${data.buildUrl}</div>
    </div>
  </div>
</body>
</html>`;
}
