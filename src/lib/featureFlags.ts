// ALKOTA Feature Flags
// Centralised commercial feature toggles — not in route files to avoid Next.js type conflicts

/**
 * Controls whether the pre-order reservation system is live.
 * When false: registration form records data but makes no commercial commitment.
 * When true: full Stripe-connected reservation flow is active.
 */
export const ENABLE_PROJECT01_RESERVATIONS = false;
