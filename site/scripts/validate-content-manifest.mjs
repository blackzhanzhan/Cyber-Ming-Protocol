import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const manifestPath = path.join(repoRoot, "site/content-manifest.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function walkMarkdown(dir) {
  const out = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      out.push(...walkMarkdown(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(toRepoPath(fullPath));
    }
  }

  return out.sort();
}

function toRepoPath(filePath) {
  return path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
}

function existsRepoPath(repoPath) {
  return fs.existsSync(path.join(repoRoot, repoPath));
}

function pushUniqueError(errors, message) {
  if (!errors.includes(message)) {
    errors.push(message);
  }
}

const manifest = readJson(manifestPath);
const errors = [];
const warnings = [];

const sectionIds = new Set(manifest.sections.map((section) => section.id));
const docIds = new Set();
const routeKeys = new Set();
const coveredSources = new Set();

for (const doc of manifest.docs) {
  if (docIds.has(doc.id)) {
    errors.push(`duplicate doc id: ${doc.id}`);
  }
  docIds.add(doc.id);

  if (!sectionIds.has(doc.section)) {
    errors.push(`unknown section for ${doc.id}: ${doc.section}`);
  }

  const routeKey = `${doc.section}/${doc.slug}`;
  if (routeKeys.has(routeKey)) {
    errors.push(`duplicate route slug: ${routeKey}`);
  }
  routeKeys.add(routeKey);

  for (const lang of manifest.site.languages) {
    const source = doc.sources?.[lang];

    if (!source) {
      warnings.push(`translation pending: ${doc.id}.${lang}`);
      continue;
    }

    coveredSources.add(source);

    if (!existsRepoPath(source)) {
      errors.push(`missing source for ${doc.id}.${lang}: ${source}`);
    }
  }

  for (const lang of manifest.site.languages) {
    const comic = doc.comics?.[lang];

    if (!comic) {
      continue;
    }

    const expectedPrefix =
      lang === "en"
        ? "assets/visual-protocol/comics-en/"
        : "assets/visual-protocol/comics/";

    if (!comic.startsWith(expectedPrefix)) {
      errors.push(`comic outside ${expectedPrefix}: ${doc.id}.${lang} -> ${comic}`);
    }

    if (!existsRepoPath(comic)) {
      errors.push(`missing comic for ${doc.id}.${lang}: ${comic}`);
    }
  }
}

const wikiSources = [
  ...walkMarkdown(path.join(repoRoot, "wiki")),
  ...walkMarkdown(path.join(repoRoot, "wiki-en")),
];

for (const source of wikiSources) {
  if (!coveredSources.has(source)) {
    pushUniqueError(errors, `uncovered markdown source: ${source}`);
  }
}

for (const source of coveredSources) {
  if (!wikiSources.includes(source)) {
    errors.push(`manifest source is outside wiki sources: ${source}`);
  }
}

const articleCount = manifest.docs.filter((doc) => doc.type === "article").length;
const readyPairs = manifest.docs.filter((doc) => doc.sources?.en && doc.sources?.zh).length;

const result = {
  docs: manifest.docs.length,
  articles: articleCount,
  bilingualReady: readyPairs,
  sections: manifest.sections.length,
  coveredMarkdownSources: coveredSources.size,
  discoveredMarkdownSources: wikiSources.length,
  warnings,
  errors,
};

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) {
  process.exit(1);
}
