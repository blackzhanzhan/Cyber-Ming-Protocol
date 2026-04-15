const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

function expandTilde(value) {
  if (!value) {
    return value;
  }
  if (value === "~") {
    return os.homedir();
  }
  if (value.startsWith("~/")) {
    return path.join(os.homedir(), value.slice(2));
  }
  return value;
}

function detectBinary(binary) {
  const command = process.platform === "win32" ? "where" : "which";
  const result = spawnSync(command, [binary], {
    stdio: "ignore",
    shell: false,
  });
  return result.status === 0;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDir(sourceDir, targetDir) {
  fs.cpSync(sourceDir, targetDir, {
    recursive: true,
    force: true,
  });
}

function readFileIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function upsertManagedBlock(filePath, content, startMarker, endMarker) {
  const existing = readFileIfExists(filePath) || "";
  const block = `${startMarker}\n${content.trim()}\n${endMarker}\n`;

  if (!existing.trim()) {
    writeFile(filePath, `${block}`);
    return;
  }

  const start = existing.indexOf(startMarker);
  const end = existing.indexOf(endMarker);

  if (start !== -1 && end !== -1 && end > start) {
    const before = existing.slice(0, start).trimEnd();
    const after = existing.slice(end + endMarker.length).trimStart();
    const next = [before, block.trimEnd(), after].filter(Boolean).join("\n\n") + "\n";
    writeFile(filePath, next);
    return;
  }

  const next = `${existing.trimEnd()}\n\n${block}`;
  writeFile(filePath, next);
}

function loadTemplate(repoRoot, relativePath, replacements) {
  const absolutePath = path.join(repoRoot, relativePath);
  let content = fs.readFileSync(absolutePath, "utf8");
  for (const [key, value] of Object.entries(replacements)) {
    const token = `{{${key}}}`;
    content = content.split(token).join(value);
  }
  return content;
}

function formatList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

module.exports = {
  copyDir,
  detectBinary,
  ensureDir,
  expandTilde,
  formatList,
  loadTemplate,
  readFileIfExists,
  upsertManagedBlock,
  writeFile,
};
