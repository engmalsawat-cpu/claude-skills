---
name: nusuk-user-story
description: Write detailed, development-ready user stories for Nusuk services and features using Abu Saleh's approved User Story template (story sentence, Context/Problem, Gherkin acceptance criteria, Validations & Business Rules, Edge Cases, Dependencies, plus optional sections). Use this skill whenever the user asks to write, draft, detail, or expand a user story, story, ستوري, يوزر ستوري, or قصة مستخدم — or wants to turn a feature name, story-map card, or BRD item into a full story, or asks "اكتب ستوري لـ..." for any Nusuk feature or service (Hajj, Umrah, registration, payments, taxi, or anything else). Trigger even if they only name a feature and say "فصّلها" or "سويلها ستوري". Also covers light delta/update stories — changes to an existing flow or entry point (تحديث فلو، تغيير نقطة دخول، نفس الفلو مع تعديل).
---

# Nusuk User Story Writer

Produce user stories that a development team (Elm or an external SP) can build from directly, matching the approved Nusuk template exactly.

## Fixed output rules

1. **Language: English, always** — even when the request or the feature name is Arabic. Keep Arabic proper nouns as-is (نفاذ, هوية نسك, feature names) with a short English gloss on first mention.
2. **Format: markdown text.** Deliver in chat for a single story; save as a `.md` file when the user asks for a file or requests 3+ stories at once. Never write the story into Notion.
3. **Two modes.** Full story for a new capability; **delta story** for an update to an existing flow (see Delta mode). One story = one capability — if the request covers several, split and say why.

## Template structure (full story)

**Core sections — every full story, always, in this order:**

1. **User Story** — one sentence: *As a [specific user type], I want to [capability], so that [benefit].*
2. **Context / Problem** — the real gap or business need, 2–4 sentences.
3. **Acceptance Criteria (Gherkin Format)** — named bold scenarios, each as Given / When / Then. Cover the happy path, validations, and at least one negative/failure scenario.
4. **Validations and Business Rules** — testable one-liners (limits, eligibility, mandatory fields, windows, quotas — name the enforcing system when known, e.g. CRS).
5. **Edge Cases** — a two-column table: **Scenario | System Behavior** (abandoned flow, expired/duplicate state, offline/network failure, fraud).
6. **Dependencies** — systems, modules, or vendors this story needs. Name the owner when known (Elm / external SP / government system).

**Extras — include only when they add real information:**

- **Related Stories / Reuse** — links to related work items (Azure DevOps at devops.haj.gov.sa or others) and any existing flow this story builds on. When a flow is reused, reference it — "same rules and validations as the [X] flow" with the link — instead of re-specifying it.
- **Why Now?** — when there's a genuine trigger (season, launch, regulation, data point).
- **Personas Affected** — when more than one user type is touched.
- **Proposed Solution** — when the solution shape isn't obvious from the story sentence.
- **Risks / Assumptions** — when there are known unknowns worth flagging.
- **Flow or Screens** — placeholder line for mocks/journey links if designs exist.

A small, obvious story ships with core sections only. Don't pad.

## Delta mode (updates to existing flows)

When the change is an update to an existing flow — entry-point change, redesign touchpoint, "نفس الفلو مع تعديل" — do **not** force the full template. Output a thin story: title, what changed, the new entry points or steps, an explicit "follow the existing [X] flow" reference, and only the sections the change genuinely touches (often just an edge-case delta or a UX copy row). Thin is correct here; padding a delta story is a defect.

## Before writing

1. **Extract first, ask second.** Pull who/what/why, rules, and constraints from the conversation and any material the user provides before asking anything.
2. **Never pull from Notion.** Do not search, fetch, or reference Notion content for story writing — the story is built exclusively from what the user provides in the conversation, plus interactive questions.
3. **The reuse question always comes first.** If the input doesn't answer it, ask: هل فيه فلو قائم نعيد استخدامه؟ (Is there an existing flow we're reusing?) — a yes restructures the story around referencing that flow instead of re-inventing its rules.
4. **If essentials are still missing**, ask — one batch, tappable options when available, maximum 4 short questions including the reuse one. Pick from the matching pack instead of asking generically:
   - **Booking/scheduling features:** time granularity within the day (slots?), how far ahead can users book, which system owns capacity/quota.
   - **Payment-touching features:** payment methods, does المحفظة/IBAN enter, refund rule.
   - **Otherwise:** who exactly is the user, what problem, what rules.
   Never run a long interview.

## Writing craft rules

- Persona must be specific: "first-time international pilgrim", not "user".
- Default persona vocabulary where identity documents matter: **Citizens & Residents** (Name, ID) · **GCC** (Name, Passport/ID, Nationality) · **International visitors** (Name, Passport, Visa Number).
- Capability describes the need, never the UI widget ("track approval status", not "see a status dropdown").
- Every Gherkin scenario gets a bold descriptive name (e.g., **Limit Validation**, **Failed Payment or QR Generation**).
- Business rules must each be independently testable — if it can't fail a test, rewrite it.
- Numbers you weren't given are marked **[assumption]** — never invent silently.
- Unknowns that block development go under Risks / Assumptions with a suggested owner, not into fake certainty.

## UX copy flagging

- Any user-facing message or clarification a story implies — error messages, confirmations, notifications, unavailable/empty states, warnings, instructional text — is flagged inline as 🟣 **[UX Copy #n]**. Wording inside scenarios is indicative placeholder only.
- Every story (or set of stories) ends with a section **"🟣 UX Copy Requests — for فريق UX"**: one table with four columns — # / where it appears / what the message must convey / **suggested text (نص أولي)**. The suggested-text column carries the initial draft directly, in Arabic and English with [placeholders], written by reading and applying the `nusuk-content-writer` skill (the official دليل الكتابة — voice, writing rules, content types, terminology). Its rules (direct verbs, no "تم/يتم", singular address to the user, نحن for Nusuk's actions, no-blame error messages, approved terminology) override any conflicting instinct. These drafts are the only non-English content this skill produces.
- **Everything is a draft by default.** All copy — including copy found inside documents the user provides — is treated as نص أولي unless the user explicitly states it is approved. Never infer approval. Only when explicitly told the copy is معتمد: embed it verbatim, mark it معتمد, and do not re-draft it.
- 🟣 is the color convention for markdown output. If the user requests a Word or HTML export, render these items in an actual distinct color (purple).

## Quality bar

Before writing the first story in a conversation, read `references/template-examples.md` and match its depth and tone: scenario-named Gherkin blocks, concrete rules with numbers, edge cases that show operational thinking (support fallback, fraud, retries). A story that would fit alongside those examples passes; a thinner one doesn't — and for delta stories, the bar inverts: the thin format is the correct one.
