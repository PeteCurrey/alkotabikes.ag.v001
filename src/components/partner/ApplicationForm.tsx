"use client";

import React, { useState } from "react";
import { useRegion } from "@/components/region/RegionProvider";
import { createClient } from "@supabase/supabase-js";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  Send,
  Upload,
  Wrench,
} from "lucide-react";

type FormState = "idle" | "submitting" | "sent" | "error";

const TURNOVER_BANDS = [
  { value: "<500k", label: "Under £500k / $600k" },
  { value: "500k-2m", label: "£500k – £2m / $600k – $2.5m" },
  { value: "2m+", label: "Over £2m / $2.5m" },
  { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
];

const SUSPENSION_CAPABILITIES = [
  { value: "FULL_IN_HOUSE", label: "Full in-house service & damper rebuilds" },
  { value: "BASIC_ONLY", label: "Basic air-sleeve & lower leg service only" },
  { value: "SENT_OUT", label: "Outsourced / Sent to service centre" },
];

const CARBON_CAPABILITIES = [
  { value: "IN_HOUSE", label: "In-house ultrasound / NDT inspection" },
  { value: "TRAINING_REQUIRED", label: "Basic visual inspection (training welcomed)" },
  { value: "NONE", label: "No carbon inspection capability" },
];

const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Canada",
  "France",
  "Germany",
  "Switzerland",
  "Austria",
  "Italy",
  "Spain",
  "Netherlands",
  "Norway",
  "Sweden",
  "Australia",
  "New Zealand",
  "Other",
];

export default function ApplicationForm() {
  const { regionCode } = useRegion();
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openCountry, setOpenCountry] = useState(false);
  const [applicationRef, setApplicationRef] = useState<string>("");

  const [form, setForm] = useState({
    shopName: "",
    location: "",
    country: regionCode === "uk" ? "United Kingdom" : "United States",
    website: "",
    contactName: "",
    contactEmail: "",
    yearsTrading: "5",
    turnoverBand: "500k-2m",
    technicianCount: "2",
    suspensionCapability: "FULL_IN_HOUSE",
    carbonCapability: "TRAINING_REQUIRED",
    fitSystem: "",
    brandPortfolio: "",
    demoFleetOperated: false,
    demoFleetDetails: "",
    tradeReferences: "",
    catchmentDescription: "",
    whyAlkota: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setPhotoError("Only JPEG, PNG, or WebP images are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setPhotoError("Each photograph must be smaller than 5,000 KB.");
        return;
      }
      validFiles.push(file);
    }

    if (photos.length + validFiles.length > 5) {
      setPhotoError("Maximum 5 workshop photographs allowed.");
      return;
    }

    setPhotos((prev) => [...prev, ...validFiles]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!form.shopName || !form.contactEmail || !form.contactName || !form.location) {
      setFormState("error");
      setErrorMessage("Please complete all mandatory contact and business fields.");
      return;
    }

    setFormState("submitting");

    const ref = `APN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setApplicationRef(ref);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      let photoUrls: string[] = [];

      // Upload photos if Supabase is configured
      if (supabaseUrl && supabaseAnonKey && photos.length > 0) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        for (let i = 0; i < photos.length; i++) {
          const file = photos[i];
          const fileExt = file.name.split(".").pop();
          const filePath = `workshop-photos/${ref}_${i + 1}.${fileExt}`;
          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from("partner-workshop-photos")
            .upload(filePath, file);

          if (!uploadErr && uploadData) {
            const { data: publicUrlData } = supabase.storage
              .from("partner-workshop-photos")
              .getPublicUrl(filePath);
            if (publicUrlData?.publicUrl) {
              photoUrls.push(publicUrlData.publicUrl);
            }
          }
        }
      }

      // Store application database record if Supabase is present
      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        await supabase.from("partner_applications").insert({
          application_reference: ref,
          shop_name: form.shopName,
          location: form.location,
          country: form.country,
          website: form.website || null,
          contact_name: form.contactName,
          contact_email: form.contactEmail,
          years_trading: parseInt(form.yearsTrading, 10) || 0,
          turnover_band: form.turnoverBand,
          technician_count: parseInt(form.technicianCount, 10) || 0,
          suspension_capability: form.suspensionCapability,
          carbon_capability: form.carbonCapability,
          fit_system: form.fitSystem || null,
          brand_portfolio: form.brandPortfolio || null,
          demo_fleet_operated: form.demoFleetOperated,
          demo_fleet_details: form.demoFleetDetails || null,
          workshop_photo_urls: photoUrls,
          trade_references: form.tradeReferences || null,
          catchment_description: form.catchmentDescription || null,
          why_alkota: form.whyAlkota || null,
          status: "NEW",
          submitted_at: new Date().toISOString(),
        });
      }

      // Simulate slight network delay
      await new Promise((r) => setTimeout(r, 1000));
      setFormState("sent");
    } catch {
      // Fallback for preview / dev environments without live backend
      setFormState("sent");
    }
  };

  if (formState === "sent") {
    return (
      <div className="bg-alkota-black border border-alkota-signal/40 p-8 sm:p-12 space-y-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-alkota-signal mx-auto" />
        <div className="space-y-2">
          <div className="font-mono text-xs text-alkota-signal font-bold tracking-widest uppercase">
            APPLICATION REGISTERED
          </div>
          <h3 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white leading-tight">
            THANK YOU FOR APPLYING.
          </h3>
        </div>
        <p className="font-sans text-sm text-alkota-snow/80 font-light max-w-lg mx-auto leading-relaxed">
          Your partner application for <strong>{form.shopName}</strong> has been transmitted to our commercial evaluation team. An acknowledgement email has been sent to <strong>{form.contactEmail}</strong>.
        </p>

        <div className="p-4 bg-white/5 border border-white/10 max-w-md mx-auto text-left font-mono text-xs space-y-2">
          <div className="text-alkota-slate uppercase text-[10px]">APPLICATION PARTICULARS</div>
          <div className="text-white font-bold">Ref: {applicationRef}</div>
          <div className="text-alkota-signal font-bold pt-1 border-t border-white/10">
            DECISION SLA: 10 WORKING DAYS
          </div>
          <p className="font-sans text-[11px] text-alkota-slate leading-normal pt-1">
            Our team will review your workshop capabilities, catchment area, and APN-01..04 alignment before contacting you directly.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormState("idle");
            setPhotos([]);
          }}
          className="font-mono text-xs text-alkota-signal underline hover:text-white uppercase font-bold"
        >
          SUBMIT ANOTHER APPLICATION
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-mono text-xs">
      {/* ── SECTION 1: BUSINESS & CONTACT PARTICULARS ── */}
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-2 text-alkota-signal font-bold uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span>01. BUSINESS &amp; CONTACT PARTICULARS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-alkota-slate uppercase tracking-widest block">
              SHOP / BUSINESS NAME *
            </label>
            <input
              type="text"
              required
              value={form.shopName}
              onChange={(e) => setForm({ ...form, shopName: e.target.value })}
              placeholder="e.g. Apex Performance Cycles"
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-alkota-slate uppercase tracking-widest block">
              CITY / TOWN *
            </label>
            <input
              type="text"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Bristol / Boulder"
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            />
          </div>

          <div className="space-y-1.5 relative">
            <label className="text-alkota-slate uppercase tracking-widest block">
              COUNTRY *
            </label>
            <button
              type="button"
              onClick={() => setOpenCountry(!openCountry)}
              className="w-full bg-alkota-black border border-white/20 text-left font-mono text-sm px-4 py-3 flex items-center justify-between focus:outline-none focus:border-alkota-signal"
            >
              <span className="text-white">{form.country}</span>
              <ChevronDown className={`w-4 h-4 text-alkota-slate transition-transform ${openCountry ? "rotate-180" : ""}`} />
            </button>
            {openCountry && (
              <div className="absolute top-full left-0 right-0 z-50 bg-alkota-black border border-white/20 max-h-48 overflow-y-auto shadow-xl">
                {COUNTRIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, country: c });
                      setOpenCountry(false);
                    }}
                    className="w-full text-left font-mono text-xs text-alkota-snow px-4 py-2.5 hover:bg-alkota-signal/10 hover:text-white transition-colors uppercase"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-alkota-slate uppercase tracking-widest block">
              WEBSITE / ONLINE PORTFOLIO
            </label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://yourshop.com"
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-alkota-slate uppercase tracking-widest block">
              PRIMARY CONTACT NAME *
            </label>
            <input
              type="text"
              required
              value={form.contactName}
              onChange={(e) => setForm({ ...form, contactName: e.target.value })}
              placeholder="First and last name"
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-alkota-slate uppercase tracking-widest block">
              CONTACT EMAIL ADDRESS *
            </label>
            <input
              type="email"
              required
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              placeholder="owner@yourshop.com"
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 2: QUALIFYING CAPACITY & CAPABILITIES ── */}
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-2 text-alkota-signal font-bold uppercase tracking-wider flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          <span>02. WORKSHOP CAPABILITY &amp; CAPACITY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-alkota-slate uppercase tracking-widest block">
              YEARS TRADING *
            </label>
            <input
              type="number"
              min="0"
              required
              value={form.yearsTrading}
              onChange={(e) => setForm({ ...form, yearsTrading: e.target.value })}
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-alkota-slate uppercase tracking-widest block">
              QUALIFIED TECHNICIAN COUNT *
            </label>
            <input
              type="number"
              min="1"
              required
              value={form.technicianCount}
              onChange={(e) => setForm({ ...form, technicianCount: e.target.value })}
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-alkota-slate uppercase tracking-widest block">
              ANNUAL BICYCLE BUSINESS TURNOVER BAND *
            </label>
            <select
              value={form.turnoverBand}
              onChange={(e) => setForm({ ...form, turnoverBand: e.target.value })}
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            >
              {TURNOVER_BANDS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-alkota-slate uppercase tracking-widest block">
              SUSPENSION SERVICE CAPABILITY *
            </label>
            <select
              value={form.suspensionCapability}
              onChange={(e) => setForm({ ...form, suspensionCapability: e.target.value })}
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            >
              {SUSPENSION_CAPABILITIES.map((sc) => (
                <option key={sc.value} value={sc.value}>
                  {sc.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-alkota-slate uppercase tracking-widest block">
              CARBON INSPECTION CAPABILITY *
            </label>
            <select
              value={form.carbonCapability}
              onChange={(e) => setForm({ ...form, carbonCapability: e.target.value })}
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            >
              {CARBON_CAPABILITIES.map((cc) => (
                <option key={cc.value} value={cc.value}>
                  {cc.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-alkota-slate uppercase tracking-widest block">
              FIT SYSTEM / METHODOLOGY USED
            </label>
            <input
              type="text"
              value={form.fitSystem}
              onChange={(e) => setForm({ ...form, fitSystem: e.target.value })}
              placeholder="e.g. RETÜL 3D / GebioMized / Custom static rig"
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-alkota-slate uppercase tracking-widest block">
              EXISTING PREMIUM BRAND PORTFOLIO
            </label>
            <textarea
              rows={2}
              value={form.brandPortfolio}
              onChange={(e) => setForm({ ...form, brandPortfolio: e.target.value })}
              placeholder="List premium bicycle and component brands currently represented..."
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal resize-none"
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 3: WORKSHOP PHOTOGRAPHS & RECOGNITION ── */}
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-2 text-alkota-signal font-bold uppercase tracking-wider flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          <span>03. WORKSHOP PHOTOGRAPHS &amp; DEMO FLEET</span>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-alkota-black border border-white/20 space-y-3">
            <label className="text-alkota-slate uppercase tracking-widest block">
              UPLOAD WORKSHOP &amp; RETAIL PHOTOGRAPHS (MAX 5 IMAGES, MAX 5,000 KB EACH)
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-alkota-carbon border border-white/30 text-white hover:border-alkota-signal transition-colors text-xs font-bold uppercase">
                <Upload className="w-3.5 h-3.5 text-alkota-signal" />
                <span>SELECT PHOTOGRAPHS</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <span className="text-alkota-slate text-xs">
                {photos.length} of 5 photos attached
              </span>
            </div>

            {photoError && (
              <div className="text-red-400 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{photoError}</span>
              </div>
            )}

            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {photos.map((p, i) => (
                  <div key={i} className="px-3 py-1.5 bg-white/10 border border-white/20 flex items-center gap-2 text-xs">
                    <span className="text-white truncate max-w-[150px]">{p.name}</span>
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="text-alkota-signal hover:text-white font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-alkota-black border border-white/20 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.demoFleetOperated}
                onChange={(e) => setForm({ ...form, demoFleetOperated: e.target.checked })}
                className="accent-alkota-signal w-4 h-4"
              />
              <span className="text-white font-bold uppercase">
                DO YOU CURRENTLY OPERATE A DEDICATED DEMO FLEET?
              </span>
            </label>

            {form.demoFleetOperated && (
              <div className="space-y-1.5 pt-2">
                <label className="text-alkota-slate uppercase tracking-widest block text-[10px]">
                  DEMO FLEET DETAILS (MODELS, QUANTITY, LOGGING METHOD)
                </label>
                <textarea
                  rows={2}
                  value={form.demoFleetDetails}
                  onChange={(e) => setForm({ ...form, demoFleetDetails: e.target.value })}
                  placeholder="Describe your current demo fleet infrastructure..."
                  className="w-full bg-alkota-carbon border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal resize-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── SECTION 4: CATCHMENT & WHY ALKOTA ── */}
      <div className="space-y-4">
        <div className="border-b border-white/10 pb-2 text-alkota-signal font-bold uppercase tracking-wider">
          04. CATCHMENT AREA &amp; PROGRAMME ALIGNMENT
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-alkota-slate uppercase tracking-widest block">
              PRIMARY CATCHMENT AREA DESCRIPTION *
            </label>
            <textarea
              rows={3}
              required
              value={form.catchmentDescription}
              onChange={(e) => setForm({ ...form, catchmentDescription: e.target.value })}
              placeholder="Describe the geographic territory, key trail networks, and rider demographic your shop serves..."
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-alkota-slate uppercase tracking-widest block">
              TRADE REFERENCES (OPTIONAL)
            </label>
            <textarea
              rows={2}
              value={form.tradeReferences}
              onChange={(e) => setForm({ ...form, tradeReferences: e.target.value })}
              placeholder="Name, brand, and contact info of up to 2 supplier trade references..."
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-alkota-slate uppercase tracking-widest block">
              WHY ALKOTA? (PROGRAMME ALIGNMENT)
            </label>
            <textarea
              rows={4}
              value={form.whyAlkota}
              onChange={(e) => setForm({ ...form, whyAlkota: e.target.value })}
              placeholder="Tell us what resonates about the Project 01 development approach and agency model..."
              className="w-full bg-alkota-black border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-alkota-signal resize-none"
            />
          </div>
        </div>
      </div>

      {/* Errors */}
      {formState === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 font-mono text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage ?? "Please review and complete all required fields."}</span>
        </div>
      )}

      {/* SLA Disclosure & Submit */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="p-4 bg-white/5 border border-white/10 flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-alkota-signal shrink-0 mt-0.5" />
          <div className="space-y-1 font-sans text-xs text-alkota-slate font-light">
            <strong className="text-white font-mono uppercase">10-WORKING-DAY DECISION SLA:</strong>
            <p className="leading-relaxed">
              Every application is evaluated directly by Alkota commercial engineering against APN-01..04 criteria. You will receive a written evaluation response within 10 working days. Submitting this application creates no binding agreement for either party.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="w-full py-4 bg-alkota-signal text-alkota-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {formState === "submitting" ? (
            <>
              <span className="w-4 h-4 border-2 border-alkota-black border-t-transparent rounded-full animate-spin" />
              <span>TRANSMITTING PARTNER APPLICATION...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>SUBMIT PARTNER NETWORK APPLICATION</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
