# ALKOTA CYCLES — CONFIGURATOR RULES ENGINE SPECIFICATION

## Overview

The Alkota Configurator Rules Engine is a deterministic, pure-function evaluation system (`evaluateConfiguration`) designed to ensure that bicycle specifications built by customers are physically compatible, legally compliant, and accurately priced across multiple global markets.

The engine executes with zero side effects or external dependencies, running identically in the browser for real-time UI feedback and on the server as the authoritative validator prior to saving builds or creating cart line items.

---

## Rule Types & Semantics

### 1. `requires`
- **Definition**: Selecting any trigger option makes at least one effect option mandatory in its target group.
- **Semantics**: If none of the required effect options is selected, the configuration becomes invalid and a violation is flagged with the human-readable explanation message. The engine does NOT silently auto-fill the choice.
- **Worked Example**:
  - *Trigger*: `fork:factory_170` (170mm Factory Fork)
  - *Effect*: `brakes:dh_4piston` (Heavy Duty 4-Piston Brakes)
  - *Rule Message*: "The 170mm Factory Fork requires Heavy Duty DH 4-Piston Brakes for safety and heat dissipation."
  - *Behavior*: If the user selects the 170mm fork while Standard 4-Piston Brakes are selected, a validation warning surfaces with the rule message requiring an explicit choice.

---

### 2. `excludes`
- **Definition**: The trigger and effect options cannot coexist in a valid configuration.
- **Semantics**: Selecting the trigger option disables the effect option(s) across the configurator. The effect option remains visible in the UI with a disabled state and the rule's message explaining why.
- **Worked Example**:
  - *Trigger*: `fork:factory_170`
  - *Effect*: `frame_size:small`
  - *Rule Message*: "The 170mm Factory Fork cannot be paired with Small (S1) chassis due to fork crown downtube clearance limits."
  - *Behavior*: When the user selects the 170mm Factory Fork, the Small (S1) frame size pill becomes disabled with a tooltip displaying the crown clearance explanation.

---

### 3. `restricts_to`
- **Definition**: Selecting the trigger option narrows a target option group to only the specified effect options.
- **Semantics**: All unlisted options in the target group become unavailable (disabled), but remain visible so the customer understands why choices changed.
- **Worked Example**:
  - *Trigger*: `wheel_format:mullet_29_275`
  - *Effect*: Group `rear_tire` restricted to `[275_minion, 275_kaiser]`
  - *Rule Message*: "Mullet wheel configuration restricts rear tire selection to 27.5-inch diameter options."
  - *Behavior*: Selecting the Mullet wheel format disables all 29-inch rear tire options while preserving their visibility in the rear tire group.

---

### 4. `auto_select`
- **Definition**: Trigger forces a specific selection in another group.
- **Semantics**: Subject to the **User Lock Rule**: If the target group has been explicitly selected/locked by the user, the engine does NOT silently overwrite the customer's choice. Instead, it generates a violation conflict allowing the customer to decide.
- **Worked Example**:
  - *Trigger*: `preset:factory_build`
  - *Effect*: `drivetrain:wireless_axs`
  - *Rule Message*: "Factory build preset defaults to Wireless AXS Transmission."
  - *Behavior*: Applying the Factory preset automatically selects Wireless AXS. If the user previously locked another drivetrain, a prompt appears: "Applying Factory Preset requires changing your Drivetrain selection."

---

### 5. `sets_default`
- **Definition**: Changes a group's default option, but only if the user has not touched that group.
- **Semantics**: If the user has made an explicit choice in the target group, `sets_default` has no effect.

---

### 6. `market_only`
- **Definition**: Option is selectable only in specified markets.
- **Semantics**: When evaluating in an unlisted market (e.g. US), the option availability becomes `unavailable_in_market` and cannot be selected.

---

### 7. `min_quantity` & `max_quantity`
- **Definition**: Enforces bounds on quantity-based option groups (e.g. additional volume spacers or spare derailleur hangers).

---

## Authoring & Cycle Protection

### Deterministic Fixpoint Loop
The engine evaluates rules in a loop capped at 20 iterations. Rules are evaluated strictly in order of **Priority (ascending)**, followed by **Rule ID (alphanumeric)**.

### Cycle Detection (`RuleCycleError`)
If 20 iterations pass without reaching a stable state (a fixpoint), the engine halts and throws a `RuleCycleError` listing the oscillating rule IDs. Publishing a draft version with an oscillating rule cycle is hard-blocked.

### Fabrication Trap Protection
Build total weight is rendered **ONLY** when every selected option in the configuration carries a non-null `weight_grams` with `weight_source` in `['manufacturer_published', 'measured']`. If any selected option has an `estimated` or `unknown` source, `totalGrams` returns `null` and the total weight panel is hidden entirely.
