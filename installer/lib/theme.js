const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  gold: "\x1b[38;5;179m",
  vermilion: "\x1b[38;5;131m",
  ink: "\x1b[38;5;236m",
  ash: "\x1b[38;5;246m",
  sage: "\x1b[38;5;108m",
  steel: "\x1b[38;5;110m",
};

function paint(color, value, opts = {}) {
  const prefix = `${opts.bold ? ANSI.bold : ""}${color || ""}`;
  return `${prefix}${value}${ANSI.reset}`;
}

function hasAnsi(value) {
  return typeof value === "string" && value.includes("\x1b[");
}

function stripAnsi(value) {
  return String(value).replace(/\x1b\[[0-9;]*m/g, "");
}

function visibleLength(value) {
  return stripAnsi(value).length;
}

function padAnsi(value, width) {
  const raw = String(value);
  const diff = width - visibleLength(raw);
  if (diff <= 0) {
    return raw;
  }
  return `${raw}${" ".repeat(diff)}`;
}

function line(char = "=", width = 62, color = ANSI.gold) {
  return paint(color, char.repeat(width));
}

function banner() {
  const top = line("=");
  const body = [
    paint(ANSI.gold, "CYBER-MING INSTALLER", { bold: true }),
    paint(ANSI.ash, "Runtime truth for deep-water AI coding"),
    paint(ANSI.vermilion, "Install skills. Establish starter law. Enter with order."),
  ];
  return [top, ...body, top].join("\n");
}

function section(title, subtitle = "") {
  const head = paint(ANSI.gold, `[ ${title} ]`, { bold: true });
  if (!subtitle) {
    return head;
  }
  return `${head} ${hasAnsi(subtitle) ? subtitle : paint(ANSI.ash, subtitle)}`;
}

function chip(kind, text) {
  const styles = {
    found: ANSI.sage,
    missing: ANSI.vermilion,
    ready: ANSI.steel,
    info: ANSI.ash,
  };
  return paint(styles[kind] || ANSI.ash, `[${text}]`, { bold: true });
}

function kv(label, value, indent = "  ") {
  const left = paint(ANSI.ash, label.padEnd(13));
  return `${indent}${left} ${value}`;
}

function bullet(text, indent = "  ") {
  return `${indent}${paint(ANSI.gold, "-")} ${text}`;
}

function frame(title, lines, opts = {}) {
  const width = opts.width || Math.max(visibleLength(title), ...lines.map((lineValue) => visibleLength(lineValue)), 0);
  const color = opts.color || ANSI.gold;
  const top = paint(color, `+${"-".repeat(width + 2)}+`);
  const head = title
    ? `${paint(color, "|")} ${padAnsi(title, width)} ${paint(color, "|")}`
    : null;
  const body = lines.map((lineValue) => `${paint(color, "|")} ${padAnsi(lineValue, width)} ${paint(color, "|")}`);
  return [top, ...(head ? [head] : []), ...body, top];
}

function joinColumns(columns, gap = "  ") {
  const heights = columns.map((column) => column.length);
  const widths = columns.map((column) => Math.max(...column.map((lineValue) => visibleLength(lineValue)), 0));
  const maxHeight = Math.max(...heights);
  const lines = [];
  for (let row = 0; row < maxHeight; row += 1) {
    const parts = columns.map((column, index) => {
      const value = column[row] || "";
      return padAnsi(value, widths[index]);
    });
    lines.push(parts.join(gap));
  }
  return lines;
}

function renderCast() {
  const xiao = frame(
    paint(ANSI.gold, "小黄龙", { bold: true }),
    [
      paint(ANSI.gold, "   /^\\/^\\\\   "),
      paint(ANSI.gold, " _|__|  O|  "),
      paint(ANSI.gold, "\\/     /~   "),
      paint(ANSI.gold, " \\____|____ "),
      paint(ANSI.gold, " /  金印  / "),
      paint(ANSI.ash, "主权 / 路由 / 终裁"),
    ],
    { color: ANSI.gold },
  );

  const xu = frame(
    paint(ANSI.steel, "徐阶", { bold: true }),
    [
      paint(ANSI.steel, "   .----.   "),
      paint(ANSI.steel, "  / o  o\\\\  "),
      paint(ANSI.steel, "  |  --  |  "),
      paint(ANSI.steel, "  | [卷] |  "),
      paint(ANSI.steel, "  |__红笔_|  "),
      paint(ANSI.ash, "审计 / 追证 / 盘问"),
    ],
    { color: ANSI.steel },
  );

  const yan = frame(
    paint(ANSI.vermilion, "严嵩", { bold: true }),
    [
      paint(ANSI.vermilion, "   .----.   "),
      paint(ANSI.vermilion, "  / ^  ^\\\\  "),
      paint(ANSI.vermilion, "  |  __  |  "),
      paint(ANSI.vermilion, "  | [奏] |  "),
      paint(ANSI.vermilion, "  |__推进_|  "),
      paint(ANSI.ash, "执行 / 推进 / 施工"),
    ],
    { color: ANSI.vermilion },
  );

  return joinColumns([xiao, xu, yan], "   ");
}

function menuOption(index, title, subtitle, tags = []) {
  const left = paint(ANSI.gold, `${index}.`, { bold: true });
  const tagText = tags.length > 0 ? ` ${tags.join(" ")}` : "";
  return `${left} ${paint(ANSI.gold, title, { bold: true })}${tagText}\n   ${paint(ANSI.ash, subtitle)}`;
}

function splitBlockLines(block) {
  return block.split("\n");
}

module.exports = {
  ANSI,
  banner,
  bullet,
  chip,
  frame,
  hasAnsi,
  joinColumns,
  kv,
  line,
  menuOption,
  paint,
  renderCast,
  section,
  splitBlockLines,
  stripAnsi,
};
