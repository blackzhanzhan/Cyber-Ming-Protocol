import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const distDir = path.join(rootDir, "site", "dist");
const errors = [];
const warnings = [];
const htmlFiles = [];
const approvedGeneratedImages = new Set([
  "assets/site/generated/governance-loop-hero.png",
  "assets/site/generated/learning-path-banner.png",
  "assets/site/generated/protocol-divider-strip.png",
]);

walk(distDir, (file) => {
  if (file.endsWith(".html")) htmlFiles.push(file);
});

let links = 0;
let images = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (isExternal(raw)) continue;
    if (raw === "#") continue;
    links += 1;
    const [withoutHash] = raw.split("#");
    if (!withoutHash) continue;
    const target = path.resolve(path.dirname(file), withoutHash);
    if (!isInside(distDir, target)) {
      errors.push(`${relative(file)} links outside dist: ${raw}`);
      continue;
    }
    if (!targetExists(target)) {
      errors.push(`${relative(file)} missing local target: ${raw}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*\ssrc="([^"]+)"/g)) {
    const raw = match[1];
    if (isExternal(raw)) continue;
    images += 1;
    const [withoutHash] = raw.split("#");
    const target = path.resolve(path.dirname(file), withoutHash);
    const rel = normalize(path.relative(distDir, target));
    if (!rel.startsWith("assets/visual-protocol/comics") && !approvedGeneratedImages.has(rel)) {
      errors.push(`${relative(file)} uses non-approved image asset: ${raw}`);
    }
  }
}

const generatedIndex = path.join(distDir, ".generated-files.json");
if (!fs.existsSync(generatedIndex)) {
  warnings.push("missing .generated-files.json");
}

const report = {
  htmlFiles: htmlFiles.length,
  localReferences: links,
  images,
  warnings,
  errors,
};

console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, callback);
    else callback(fullPath);
  }
}

function isExternal(url) {
  return /^(https?:|mailto:|tel:|data:)/i.test(url);
}

function targetExists(target) {
  if (fs.existsSync(target)) return true;
  return fs.existsSync(path.join(target, "index.html"));
}

function isInside(parent, child) {
  const rel = path.relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function relative(file) {
  return normalize(path.relative(distDir, file));
}

function normalize(value) {
  return value.replaceAll("\\", "/");
}
