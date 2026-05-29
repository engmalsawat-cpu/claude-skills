---
name: arabic-docx-rtl
description: >-
  Use this skill whenever creating Arabic (or any right-to-left) Word .docx files
  with docx-js, to guarantee correct RTL rendering — bullets on the RIGHT of the
  text, proper paragraph and run direction, and genuine RTL tables whose columns
  flow right-to-left automatically. Trigger on: Arabic Word document, عربي وورد,
  مستند عربي, جدول عربي, RTL docx, or any case where Arabic bullets appear on the
  wrong (left) side or table columns come out reversed. Use ALONGSIDE the docx
  skill — this skill only covers the RTL direction layer.
---

# Arabic / RTL Word documents (docx-js)

Word/docx engines default to **LTR (English)**. Arabic is **RTL**. If you don't
set direction explicitly, Arabic comes out broken: bullets land on the LEFT,
table columns appear reversed, and paragraph flow is wrong. **Right-alignment
alone is NOT enough** — direction is three independent layers, plus a table layer.

## The 4 rules (set ALL of them)

1. **Paragraph direction** — `bidirectional: true` on every Arabic `Paragraph`
   (emits `<w:bidi/>`). Makes the paragraph flow right-to-left.
2. **Run direction** — `rightToLeft: true` on every Arabic `TextRun`
   (emits `<w:rtl/>`). **This is the one most people miss.** Without it, neutral
   glyphs like the bullet `•` follow the default LTR and render on the LEFT.
3. **Alignment** — `alignment: AlignmentType.RIGHT`. Visual placement only; it
   does NOT fix direction by itself.
4. **Table direction** — `visuallyRightToLeft: true` on every `Table`
   (emits `<w:bidiVisual/>`). Feed columns/cells in **logical reading order**
   (first column = what should appear on the RIGHT) and the renderer places them
   right-to-left automatically. **Never reverse arrays manually** — that only
   looks right and breaks when edited in Word.

For bullet/hanging indents use `indent: { start, hanging }` (logical `start` =
right in RTL), never `left`.

Latin/numbers inside Arabic (e.g. `B2B`, `OTP`, `40%`, `Fast Track`) stay LTR
automatically via the Unicode bidi algorithm — no special handling needed.

## Ready-to-use helpers

See `helper.js`. Require it after `npm`/global docx is available:

```js
const { rtlPara, rtlBullets, rtlCell, rtlTable, RTL_FONT } = require("./helper.js");
```

- `rtlPara(text, {size, color, bold, align})` → one RTL paragraph.
- `rtlBullets(["نقطة ١","نقطة ٢"], {size,color})` → array of RTL bullet paragraphs (• on the right).
- `rtlCell(items, {width, header, fill})` → an RTL `TableCell` (items = string or array → bullets).
- `rtlTable(headers, rows, {widths, headerFill})` → a full RTL table (`visuallyRightToLeft`), columns in logical order.

## Minimal example

```js
const fs = require("fs");
const { Document, Packer, PageOrientation } = require("docx");
const { rtlPara, rtlTable } = require("./helper.js");

const doc = new Document({
  styles: { default: { document: { run: { font: "Arial" } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840, orientation: PageOrientation.LANDSCAPE } } },
    children: [
      rtlPara("تقرير تجريبي", { size: 32, bold: true }),
      rtlTable(
        ["خدمات نسك", "التوعية", "نقاط الألم"],            // logical order; first = rightmost
        [[ ["خدمة أ","خدمة ب"], ["وعي مرتفع"], ["مشكلة دخول"] ]],
        { widths: [3000, 3000, 3360], headerFill: "1B6B4A" }
      ),
    ]
  }]
});
Packer.toBuffer(doc).then(b => fs.writeFileSync("out.docx", b));
```

## Common mistakes → fix

| Symptom | Cause | Fix |
|---|---|---|
| Bullet `•` on the LEFT | run not RTL | add `rightToLeft: true` to the TextRun |
| Text right but flow wrong | paragraph not RTL | add `bidirectional: true` |
| Table columns reversed / had to reverse manually | table not RTL | add `visuallyRightToLeft: true`, feed columns in logical order |
| Bullet indent on wrong side | used `indent.left` | use `indent: { start, hanging }` |

## QA

After building, convert to PDF and view page 1 to confirm bullets sit on the RIGHT
and table columns read right-to-left:

```bash
soffice --headless --convert-to pdf out.docx && pdftoppm -jpeg -r 110 -f 1 -l 1 out.pdf chk
```
