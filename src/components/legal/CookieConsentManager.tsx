"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Shield, Cookie, X, Check, Lock } from "lucide-react";

export interface CookiePreferences {
  strictlyNecessary: boolean; // Always true
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: string;
  region?: string;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  strictlyNecessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
  version: "1.0.0",
  timestamp: "",
};

const STORAGE_KEY = "alkota_cookie_consent_v1";

interface CookieConsentContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  isSettingsOpen: boolean;
  openCookieSettings: () => void;
  closeCookieSettings: () => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  saveCustomChoices: (choices: Omit<CookiePreferences, "strictlyNecessary" | "version" | "timestamp">) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({
          ...parsed,
          strictlyNecessary: true,
        });
        setHasConsented(true);
      }
    } catch {
      // Default fallback
    }

    // Global event listener for openCookieSettings()
    const handleGlobalOpen = () => setIsSettingsOpen(true);
    window.addEventListener("alkota:open-cookie-settings", handleGlobalOpen);
    return () => {
      window.removeEventListener("alkota:open-cookie-settings", handleGlobalOpen);
    };
  }, []);

  const saveConsent = (newPrefs: CookiePreferences) => {
    const updated: CookiePreferences = {
      ...newPrefs,
      strictlyNecessary: true,
      timestamp: new Date().toISOString(),
    };
    setPreferences(updated);
    setHasConsented(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save cookie preferences", e);
    }
  };

  const openCookieSettings = () => setIsSettingsOpen(true);
  const closeCookieSettings = () => setIsSettingsOpen(false);

  const acceptAll = () => {
    saveConsent({
      strictlyNecessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
    setIsSettingsOpen(false);
  };

  const rejectOptional = () => {
    saveConsent({
      strictlyNecessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
    setIsSettingsOpen(false);
  };

  const saveCustomChoices = (choices: Omit<CookiePreferences, "strictlyNecessary" | "version" | "timestamp">) => {
    saveConsent({
      strictlyNecessary: true,
      preferences: choices.preferences,
      analytics: choices.analytics,
      marketing: choices.marketing,
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
    setIsSettingsOpen(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsented,
        isSettingsOpen,
        openCookieSettings,
        closeCookieSettings,
        acceptAll,
        rejectOptional,
        saveCustomChoices,
      }}
    >
      {children}
      {mounted && <CookieConsentUI />}
    </CookieConsentContext.Provider>
  );
}

/**
 * Global helper function to trigger the cookie settings modal from anywhere in the app
 */
export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("alkota:open-cookie-settings"));
  }
}

function CookieConsentUI() {
  const {
    preferences,
    hasConsented,
    isSettingsOpen,
    closeCookieSettings,
    acceptAll,
    rejectOptional,
    saveCustomChoices,
    openCookieSettings,
  } = useCookieConsent();

  const [tempPrefs, setTempPrefs] = useState({
    preferences: preferences.preferences,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
  });

  useEffect(() => {
    setTempPrefs({
      preferences: preferences.preferences,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });
  }, [preferences, isSettingsOpen]);

  const showBanner = !hasConsented && !isSettingsOpen;

  return (
    <>
      {/* ── FIRST VISIT BANNER ──────────────────────────────────────────────── */}
      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie Privacy Banner"
          className="fixed bottom-0 inset-x-0 z-[100] bg-alkota-carbon text-alkota-snow border-t border-white/20 p-6 shadow-2xl backdrop-blur-md font-sans"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-alkota-signal font-mono text-xs tracking-wider uppercase font-bold">
                <Cookie className="w-4 h-4" />
                <span>YOUR PRIVACY. YOUR CHOICE.</span>
              </div>
              <p className="text-xs sm:text-sm text-alkota-snow/90 leading-relaxed font-sans">
                We use essential technologies to keep Alkota secure and make the site work. With your permission,
                we can also use optional analytics, preference and marketing technologies to understand how the site
                is used and improve the experience. You can accept them, reject them or choose individually.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={acceptAll}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-alkota-white text-alkota-black hover:bg-alkota-signal transition-colors font-mono text-xs font-bold uppercase tracking-wider text-center"
              >
                ACCEPT ALL
              </button>
              <button
                type="button"
                onClick={rejectOptional}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-white/10 hover:bg-white/20 text-alkota-white border border-white/20 transition-colors font-mono text-xs font-bold uppercase tracking-wider text-center"
              >
                REJECT OPTIONAL
              </button>
              <button
                type="button"
                onClick={openCookieSettings}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-transparent hover:bg-white/5 text-alkota-slate hover:text-alkota-white border border-white/10 transition-colors font-mono text-xs font-semibold uppercase tracking-wider text-center"
              >
                MANAGE CHOICES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PREFERENCE CENTRE MODAL ─────────────────────────────────────────── */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-alkota-carbon border border-white/20 text-alkota-snow w-full max-w-2xl rounded-none p-6 sm:p-8 space-y-6 shadow-2xl my-8 font-sans">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-alkota-signal" />
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-alkota-white">
                  COOKIE SETTINGS
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCookieSettings}
                className="p-2 text-alkota-slate hover:text-alkota-white transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-alkota-slate leading-relaxed font-sans">
              Control how Alkota uses non-essential storage technologies on your device. Strictly necessary tools cannot
              be disabled as they are required for security, account authentication, and core site performance.
            </p>

            <div className="space-y-4 font-sans">
              {/* Strictly Necessary */}
              <div className="p-4 bg-alkota-black border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-alkota-white">
                    <Lock className="w-3.5 h-3.5 text-alkota-signal" />
                    <span>STRICTLY NECESSARY</span>
                  </div>
                  <span className="text-[11px] font-mono uppercase bg-white/10 text-alkota-signal px-2 py-0.5 border border-alkota-signal/30">
                    ALWAYS ACTIVE
                  </span>
                </div>
                <p className="text-xs text-alkota-slate">
                  Required for security, accounts, requested transactions and core site operation.
                </p>
              </div>

              {/* Preferences */}
              <div className="p-4 bg-alkota-black border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-alkota-white">PREFERENCES</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempPrefs.preferences}
                      onChange={(e) => setTempPrefs({ ...tempPrefs, preferences: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-alkota-signal"></div>
                  </label>
                </div>
                <p className="text-xs text-alkota-slate">
                  Remembers non-essential choices, customized layout options, and saved configurations.
                </p>
              </div>

              {/* Analytics */}
              <div className="p-4 bg-alkota-black border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-alkota-white">ANALYTICS</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempPrefs.analytics}
                      onChange={(e) => setTempPrefs({ ...tempPrefs, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-alkota-signal"></div>
                  </label>
                </div>
                <p className="text-xs text-alkota-slate">
                  Helps us measure site traffic, popular engineering topics, and aggregate user interactions to improve the platform.
                </p>
              </div>

              {/* Marketing */}
              <div className="p-4 bg-alkota-black border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-alkota-white">MARKETING</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempPrefs.marketing}
                      onChange={(e) => setTempPrefs({ ...tempPrefs, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-alkota-signal"></div>
                  </label>
                </div>
                <p className="text-xs text-alkota-slate">
                  Used to measure external campaign performance and deliver relevant development announcements.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3 font-mono">
              <button
                type="button"
                onClick={rejectOptional}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-alkota-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10"
              >
                REJECT OPTIONAL
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-alkota-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10"
              >
                ACCEPT ALL
              </button>
              <button
                type="button"
                onClick={() => saveCustomChoices(tempPrefs)}
                className="px-5 py-2 bg-alkota-white text-alkota-black hover:bg-alkota-signal text-xs font-bold uppercase tracking-wider transition-colors"
              >
                SAVE CHOICES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
