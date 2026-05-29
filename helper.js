// Arabic / RTL helpers for docx-js.
// Require docx (global or local). Every Arabic paragraph/run/table gets the full
// RTL treatment: bidirectional paragraph + rightToLeft run + right alignment,
// and tables use visuallyRightToLeft so columns flow right-to-left automatically.

const {
  Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
} = require("docx");

const RTL_FONT = "Arial"; // swap for "IBM Plex Sans Arabic" if installed

// One RTL paragraph of plain text.
function rtlPara(text, opts = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: opts.align || AlignmentType.RIGHT,
    spacing: { after: opts.after != null ? opts.after : 60, line: 264 },
    children: [new TextRun({
      text,
      font: opts.font || RTL_FONT,
      size: opts.size || 22,            // half-points (22 = 11pt)
      color: opts.color || "1A1A1A",
      bold: !!opts.bold,
      italics: !!opts.italics,
      rightToLeft: true,                // ← the rule most people miss
    })],
  });
}

// Array of RTL bullet paragraphs. Bullet "•" renders on the RIGHT.
function rtlBullets(items, opts = {}) {
  const list = Array.isArray(items) ? items : [items];
  return list.map(t => new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    spacing: { after: 60, line: 268 },
    indent: { start: 200, hanging: 200 },  // logical start = right in RTL
    children: [new TextRun({
      text: "•  " + t,
      font: opts.font || RTL_FONT,
      size: opts.size || 18,
      color: opts.color || "333333",
      rightToLeft: true,
    })],
  }));
}

const _thin = { style: BorderStyle.SINGLE, size: 2, color: "BBBBBB" };
const _borders = { top: _thin, bottom: _thin, left: _thin, right: _thin };

// One RTL table cell. items = string | string[] (-> bullets). Set header:true for header style.
function rtlCell(items, opts = {}) {
  let children;
  if (opts.header) {
    children = [new Paragraph({
      bidirectional: true, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: String(items), font: RTL_FONT, size: opts.size || 19,
        color: opts.color || "FFFFFF", bold: true, rightToLeft: true })],
    })];
  } else {
    children = rtlBullets(items, opts);
  }
  return new TableCell({
    borders: _borders,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    verticalAlign: opts.header ? VerticalAlign.CENTER : VerticalAlign.TOP,
    margins: { top: 80, bottom: 80, left: 110, right: 110 },
    children,
  });
}

// Full RTL table. headers = string[] in LOGICAL order (first = rightmost column).
// rows = array of rows; each row = array of cell contents (string | string[]).
function rtlTable(headers, rows, opts = {}) {
  const widths = opts.widths || headers.map(() => Math.floor(9360 / headers.length));
  const total = widths.reduce((a, b) => a + b, 0);
  const headerFill = opts.headerFill || "1B6B4A";
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => rtlCell(h, { header: true, width: widths[i], fill: headerFill })),
  });
  const bodyRows = rows.map(r => new TableRow({
    children: r.map((c, i) => rtlCell(c, { width: widths[i] })),
  }));
  return new Table({
    visuallyRightToLeft: true,          // ← genuine RTL table; no manual array reversing
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...bodyRows],
  });
}

module.exports = { rtlPara, rtlBullets, rtlCell, rtlTable, RTL_FONT };
