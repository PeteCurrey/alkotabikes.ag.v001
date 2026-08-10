import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const ref = searchParams.get("ref") || searchParams.get("buildRef") || "A01-L-29-R00";
  const size = searchParams.get("size") || "L";
  const wheelFormat = searchParams.get("wheel") || searchParams.get("wheelFormat") || "29/29";
  const finish = (searchParams.get("finish") || "CARBON").toUpperCase();

  const finishName = finish === "GLACIER" ? "GLACIER WHITE" : "NAKED CARBON";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0D0F",
          color: "#F4F6F7",
          padding: "60px",
          fontFamily: "monospace",
          border: "2px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "rgba(100, 119, 137, 0.2)",
                border: "1px solid rgba(100, 119, 137, 0.5)",
                color: "#647789",
                fontSize: "14px",
                padding: "6px 14px",
                letterSpacing: "2px",
                fontWeight: "bold",
              }}
            >
              PROJECT 01 CONFIGURATION
            </div>
            <div
              style={{
                color: "#737C84",
                fontSize: "14px",
                letterSpacing: "2px",
              }}
            >
              R00 DEVELOPMENT BASELINE
            </div>
          </div>
          <div style={{ color: "#647789", fontSize: "16px", fontWeight: "bold", letterSpacing: "3px" }}>
            ALKOTA CYCLES
          </div>
        </div>

        {/* Main Title & Reference */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "22px",
              color: "#647789",
              letterSpacing: "4px",
              fontWeight: "bold",
            }}
          >
            BUILD REFERENCE
          </div>
          <div
            style={{
              fontSize: "64px",
              color: "#FFFFFF",
              fontWeight: "bold",
              letterSpacing: "4px",
              lineHeight: 1,
            }}
          >
            {ref}
          </div>
        </div>

        {/* Spec Grid */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
            <div style={{ color: "#737C84", fontSize: "12px", letterSpacing: "2px" }}>
              FRAME SIZE
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: "bold" }}>
              SIZE {size}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
            <div style={{ color: "#737C84", fontSize: "12px", letterSpacing: "2px" }}>
              WHEEL PLATFORM
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: "bold" }}>
              {wheelFormat}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
            <div style={{ color: "#737C84", fontSize: "12px", letterSpacing: "2px" }}>
              FINISH PROFILE
            </div>
            <div style={{ color: "#647789", fontSize: "24px", fontWeight: "bold" }}>
              {finishName}
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#737C84",
            fontSize: "12px",
            letterSpacing: "1px",
          }}
        >
          <div>PRE-PRODUCTION DEVELOPMENT BASELINE • NOT A CONTRACTUAL SPECIFICATION</div>
          <div>ALKOTA PERFORMANCE ENGINEERING</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
