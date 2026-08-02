# Nusuk User Story — Template Skeleton and Calibration Example

Source: Abu Saleh's approved "User Story Template with Examples" document. Match this depth and tone.

## Skeleton

```
## [Story Title]

**User Story**
*As a [user type/persona], I want to [do something], so that [achieve goal or solve problem].*

**Context / Problem**
Describe the real gap or business need.

**Why Now?** (optional)

**Personas Affected** (optional)

**Proposed Solution** (optional)

**Acceptance Criteria (Gherkin Format)**
- **[Scenario Name]**
  Given [context],
  When [action],
  Then [expected result].
(multiple scenarios, including edge cases and validations)

**Validations and Business Rules**
- Testable one-liners.

**Edge Cases**
- Scenario fragments.

**Dependencies**
- Systems, modules, vendors — with owner when known.

**Risks / Assumptions** (optional)

**Flow or Screens** (optional — attach mocks or journey links)
```

## Calibration example (full depth)

**User Story**
*As a tourist, I want to buy a single pass that gives me access to multiple attractions, so that I can save money and avoid buying separate tickets.*

**Context / Problem**
Tourists face the challenge of managing multiple tickets, payment confirmations, and entry requirements for each attraction. This is time-consuming and overwhelming, especially for non-locals or families. No bundled solution exists, leading to high drop-off and reduced discovery of lesser-known attractions.

**Why Now?**
The tourism board is launching a seasonal promotion and multiple partners are offering combined access; the multi-pass is intended to increase satisfaction and boost entry rates to cultural attractions.

**Personas Affected**
- Tourists (solo or with family)
- Local experience seekers
- Pilgrims looking for historical/cultural add-ons

**Proposed Solution**
A unified Multi-Pass: select 3–5 attractions in one checkout and receive a scannable QR code valid for the chosen dates.

**Acceptance Criteria (Gherkin Format)**
- **Standard Purchase Flow** — Given I am a logged-in user, When I select 3 or more eligible attractions and a valid date range, Then I can purchase a multi-pass and receive a QR code in the app.
- **Limit Validation** — Given I select more than 5 attractions, When I try to proceed to checkout, Then I see an error: "Maximum 5 attractions per pass."
- **Companion Info Requirement** — Given I buy the pass for 2+ people, When I proceed to checkout, Then I am prompted for companion names and nationalities.
- **Attraction Eligibility Check** — Given a selected attraction is not part of the program, When I try to add it, Then I receive: "This attraction is not available for multi-pass selection."
- **Failed Payment or QR Generation** — Given payment succeeds but pass generation fails, Then I receive an error and a refund is initiated automatically.
- **Redemption Validation On-Site** — Given I hold a valid QR pass on the selected date, When I show it at entry, Then the system validates it and marks it used.

**Validations and Business Rules**
- Minimum 3, maximum 5 attractions to activate the offer.
- A visit date range must be selected.
- Payment cannot proceed unless all companion details are complete.
- User must acknowledge terms and non-transferability at checkout.
- Passes are non-transferable, tied to purchaser or named companion.
- Children under 6 enter free at designated attractions.
- Maximum 3 multi-passes per user per day.
- Non-refundable unless a system issue prevents redemption.
- Eligible for seasonal discounts if activated before a set date.

**Edge Cases**
- Selection started but checkout abandoned.
- A selected attraction becomes unavailable (maintenance).
- QR used outside the selected date range.
- QR already used or duplicated (fraud prevention).
- User's phone dies before redemption (support desk fallback).

**Dependencies**
- Each attraction's entry validation system.
- Payment gateway and QR generation service.
- Companion name/nationality validation for reporting.
- Mobile app and web checkout synchronization.

**Risks / Assumptions**
- Users may select ineligible combinations (dynamic filter needed).
- Attractions must update availability in real time.
- Support staff need QR troubleshooting training.

## Patterns to copy from the source examples

- Scenario names are short and diagnostic (**Limit Validation**, **Supervisor Approval**, **Unsubscribe from Alerts**).
- Rules carry concrete numbers (max 5, 20MB, 3 revision cycles, 14-day expiry) — in Nusuk stories, unstated numbers get **[assumption]**.
- Edge cases show operational reality: timeouts and escalation, delegation of approval rights, retry logic, throttling under spikes, support fallbacks.
- Dependencies name real systems (authentication, notification service, inventory, audit trail) — in Nusuk stories add the owner (Elm / SP / government) when known.
