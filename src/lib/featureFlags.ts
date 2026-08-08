// ALKOTA Feature Flags
// Centralised commercial feature toggles — not in route files to avoid Next.js type conflicts
// All flags default to false. Each must be explicitly enabled once gates are passed.

// ─── Phase 02: Reservation System ────────────────────────────────────────────

/**
 * Master gate for live paid reservations.
 * When false: full customer journey is testable in sandbox mode only.
 * When true: real Stripe payments are active.
 * Requires all 9 payment release gate checks to pass before enabling.
 */
export const PROJECT01_PAID_RESERVATIONS_ENABLED = false;

/** Legacy alias — do not use in new code */
export const ENABLE_PROJECT01_RESERVATIONS = PROJECT01_PAID_RESERVATIONS_ENABLED;

/**
 * Reservation mode controls who can begin a reservation.
 * CLOSED: no reservations accepted (default).
 * INVITE_ONLY: only customers with a valid invite token can proceed.
 * PUBLIC: open to all eligible registered customers.
 */
export const RESERVATION_MODE: "CLOSED" | "INVITE_ONLY" | "PUBLIC" = "CLOSED";

// ─── Phase 03: Production Allocation + Build Tracker ─────────────────────────

/** Enables allocation creation from reserved customers. */
export const PROJECT01_ALLOCATION_ENABLED = false;

/** Enables customer-facing Build Tracker at /my-alkota/build/[allocation] */
export const BUILD_TRACKER_ENABLED = false;

/** Enables customer Build Lock confirmation flow in My Alkota */
export const BUILD_LOCK_CUSTOMER_CONFIRMATION_ENABLED = false;

/** Enables owner activation on delivery */
export const OWNER_ACTIVATION_ENABLED = false;

/** Controls whether Build Tracker is publicly marketed. */
export const BUILD_TRACKER_PUBLICLY_ANNOUNCED = false;

// ─── Partner Network Phase 02 ─────────────────────────────────────────────────

/** Enables authenticated dealer portal dashboard sections. */
export const PARTNER_PORTAL_ACTIVE = false;

/** Enables lead sharing with partners (requires customer consent). */
export const PARTNER_LEADS_ENABLED = false;

/** Enables dealer allocation visibility in partner portal. */
export const PARTNER_ALLOCATIONS_ENABLED = false;

/** Enables demo programme (demo unit allocation, booking). */
export const DEMO_PROGRAMME_ENABLED = false;

/** Controls whether /demo booking is publicly linked. */
export const DEMO_BOOKING_PUBLIC = false;

/** Controls whether /dealers/find partner locator is publicly linked. */
export const PARTNER_LOCATOR_PUBLIC = false;

/** Enables speculative wholesale stock ordering by dealers. */
export const DEALER_STOCK_ORDERING_ENABLED = false;
