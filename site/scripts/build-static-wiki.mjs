import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const siteDir = path.join(rootDir, "site");
const distDir = path.join(siteDir, "dist");
const manifestPath = path.join(siteDir, "content-manifest.json");
const stylesSource = path.join(siteDir, "static-wiki.css");
const stylesDist = path.join(distDir, "assets", "static-wiki.css");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const languages = manifest.site.languages;
const defaultLanguage = manifest.site.defaultLanguage;
const sections = [...manifest.sections].sort((a, b) => a.order - b.order);
const docs = [...manifest.docs].sort((a, b) => {
  if (a.section !== b.section) {
    return sectionOrder(a.section) - sectionOrder(b.section);
  }
  return a.order - b.order;
});

const emitted = new Set();
const copiedAssets = new Set();
const sourceToDoc = new Map();

for (const doc of docs) {
  for (const lang of languages) {
    const source = doc.sources?.[lang];
    if (source) sourceToDoc.set(norm(source), { doc, lang });
  }
}

fs.mkdirSync(distDir, { recursive: true });
copyFile(stylesSource, stylesDist);

emitRootIndex();

for (const lang of languages) {
  emitLanguageIndex(lang);
  for (const section of sections) {
    emitSectionIndex(lang, section);
  }
  for (const doc of docs) {
    emitArticle(lang, doc);
  }
}

const report = {
  languages,
  docs: docs.length,
  htmlFiles: [...emitted].filter((file) => file.endsWith(".html")).length,
  copiedAssets: copiedAssets.size,
  generatedAt: new Date().toISOString(),
};
writeFile(path.join(distDir, ".generated-files.json"), `${JSON.stringify([...emitted].sort(), null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

function sectionOrder(sectionId) {
  return sections.find((section) => section.id === sectionId)?.order ?? 999;
}

function norm(value) {
  return value.replaceAll("\\", "/");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function slugPathForDoc(lang, doc) {
  const section = sections.find((item) => item.id === doc.section);
  return `${lang}/${section.slug}/${doc.slug}/`;
}

function outputPathForDoc(lang, doc) {
  return path.join(distDir, lang, sections.find((item) => item.id === doc.section).slug, doc.slug, "index.html");
}

function urlFromOutput(outputFile, targetDistRelative) {
  const fromDir = path.dirname(outputFile);
  const target = path.join(distDir, targetDistRelative);
  let rel = norm(path.relative(fromDir, target));
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

function siteUrl(outputFile, target) {
  return urlFromOutput(outputFile, target);
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  emitted.add(norm(path.relative(distDir, file)));
}

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  emitted.add(norm(path.relative(distDir, target)));
}

function copyAssetToDist(repoRelativePath) {
  const normalized = norm(repoRelativePath);
  if (!normalized.startsWith("assets/visual-protocol/comics")) {
    throw new Error(`Refusing non-comic site asset: ${repoRelativePath}`);
  }
  const source = path.join(rootDir, normalized);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing comic asset: ${repoRelativePath}`);
  }
  const target = path.join(distDir, normalized);
  copyFile(source, target);
  copiedAssets.add(normalized);
  return normalized;
}

function emitRootIndex() {
  const output = path.join(distDir, "index.html");
  const body = `
    <main class="gate">
      <p class="eyebrow">Cyber-Ming Protocol</p>
      <h1>Teaching Wiki</h1>
      <p class="lead">A bilingual illustrated wiki for the minimal closed loop, audit judgment, and contract-governed AI coding.</p>
      <div class="language-gate" aria-label="Choose language">
        ${languages.map((lang) => `<a class="gate-link" href="${lang}/">${langLabel(lang)}</a>`).join("")}
      </div>
    </main>
  `;
  writeFile(output, baseDocument({
    lang: defaultLanguage,
    title: "Cyber-Ming Teaching Wiki",
    output,
    body,
  }));
}

function emitLanguageIndex(lang) {
  const output = path.join(distDir, lang, "index.html");
  const featured = docs.find((doc) => doc.id === "prompt-pack") ?? docs[0];
  const comic = comicFor(output, featured, lang);
  const sectionList = sections.map((section) => {
    const sectionDocs = docsForSection(section.id, lang).filter((doc) => doc.type !== "auxiliary");
    return `
      <section class="section-band">
        <div>
          <p class="section-kicker">${String(section.order).padStart(2, "0")}</p>
          <h2><a href="${siteUrl(output, `${lang}/${section.slug}/index.html`)}">${escapeHtml(section.titles[lang] ?? section.titles.en)}</a></h2>
        </div>
        <ol class="article-list">
          ${sectionDocs.map((doc) => `<li><a href="${siteUrl(output, `${slugPathForDoc(lang, doc)}index.html`)}">${escapeHtml(titleFor(doc, lang))}</a></li>`).join("")}
        </ol>
      </section>
    `;
  }).join("");

  const body = `
    <main class="home">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${lang === "zh" ? "教学知识库" : "Teaching Wiki"}</p>
          <h1>${lang === "zh" ? "Cyber-Ming Protocol" : "Cyber-Ming Protocol"}</h1>
          <p class="lead">${lang === "zh" ? "以漫画、合同、审计和证据链讲清 AI Coding 的最小治理闭环。" : "An illustrated teaching wiki for contract-first AI coding governance, audit loops, and evidence-based delivery."}</p>
          <div class="hero-actions">
            <a class="text-link" href="${siteUrl(output, `${slugPathForDoc(lang, featured)}index.html`)}">${lang === "zh" ? "从最小闭环开始" : "Start With The Loop"}</a>
            <a class="text-link muted" href="${switchLanguageUrl(output, lang)}">${lang === "zh" ? "English" : "中文"}</a>
          </div>
        </div>
        ${comic ? `<figure class="hero-comic"><img src="${comic}" alt="${escapeHtml(titleFor(featured, lang))}"></figure>` : ""}
      </section>
      <section class="contract-strip" aria-label="Site contract">
        <span>${lang === "zh" ? "全量 wiki 搬迁" : "Full wiki migration"}</span>
        <span>${lang === "zh" ? "中英双语切换" : "Manifest bilingual switch"}</span>
        <span>${lang === "zh" ? "只用既有漫画" : "Existing comics only"}</span>
      </section>
      <div class="section-stack">
        ${sectionList}
      </div>
    </main>
  `;

  writeFile(output, layout({
    lang,
    title: `${manifest.site.name} - ${langLabel(lang)}`,
    output,
    body,
    currentSection: null,
    currentDoc: null,
  }));
}

function emitSectionIndex(lang, section) {
  const output = path.join(distDir, lang, section.slug, "index.html");
  const sectionDocs = docsForSection(section.id, lang).filter((doc) => doc.type !== "auxiliary");
  const firstDoc = sectionDocs[0];
  const body = `
    <main class="wiki-shell">
      ${sidebar(lang, output, section.id)}
      <article class="article">
        <nav class="crumbs"><a href="${siteUrl(output, `${lang}/index.html`)}">${langLabel(lang)}</a><span>${escapeHtml(section.titles[lang] ?? section.titles.en)}</span></nav>
        <header class="article-head">
          <p class="eyebrow">${lang === "zh" ? "卷" : "Section"} ${String(section.order).padStart(2, "0")}</p>
          <h1>${escapeHtml(section.titles[lang] ?? section.titles.en)}</h1>
          <p class="lead">${lang === "zh" ? "本卷文章按协议学习路径排序，可逐章推进，也可按问题回查。" : "This section is ordered as a study path, while remaining useful as a reference shelf."}</p>
        </header>
        <ol class="index-list">
          ${sectionDocs.map((doc) => `
            <li>
              <a href="${siteUrl(output, `${slugPathForDoc(lang, doc)}index.html`)}">
                <span>${escapeHtml(titleFor(doc, lang))}</span>
                <small>${escapeHtml(doc.translationStatus?.[lang] ?? "ready")}</small>
              </a>
            </li>
          `).join("")}
        </ol>
        ${firstDoc ? `<p class="next-command"><a href="${siteUrl(output, `${slugPathForDoc(lang, firstDoc)}index.html`)}">${lang === "zh" ? "入卷" : "Enter section"}</a></p>` : ""}
      </article>
    </main>
  `;
  writeFile(output, layout({
    lang,
    title: section.titles[lang] ?? section.titles.en,
    output,
    body,
    currentSection: section.id,
    currentDoc: null,
  }));
}

function emitArticle(lang, doc) {
  const output = outputPathForDoc(lang, doc);
  const source = doc.sources?.[lang];
  const sourcePath = source ? path.join(rootDir, source) : null;
  const content = sourcePath && fs.existsSync(sourcePath)
    ? fs.readFileSync(sourcePath, "utf8")
    : null;
  const section = sections.find((item) => item.id === doc.section);
  const comic = comicFor(output, doc, lang);
  const rendered = content
    ? markdownToHtml(content, {
      source,
      output,
      lang,
    })
    : pendingTranslation(lang, doc, output);

  const body = `
    <main class="wiki-shell">
      ${sidebar(lang, output, doc.section)}
      <article class="article">
        <nav class="crumbs">
          <a href="${siteUrl(output, `${lang}/index.html`)}">${langLabel(lang)}</a>
          <a href="${siteUrl(output, `${lang}/${section.slug}/index.html`)}">${escapeHtml(section.titles[lang] ?? section.titles.en)}</a>
        </nav>
        <header class="article-head">
          <p class="eyebrow">${escapeHtml(section.titles[lang] ?? section.titles.en)}</p>
          <h1>${escapeHtml(titleFor(doc, lang))}</h1>
          <div class="article-tools">
            ${languageSwitchLinks(output, lang, doc)}
          </div>
        </header>
        ${comic ? `<figure class="article-comic"><img src="${comic}" alt="${escapeHtml(titleFor(doc, lang))}"></figure>` : ""}
        <div class="markdown-body">
          ${rendered}
        </div>
        ${articleFooter(lang, doc, output)}
      </article>
    </main>
  `;

  writeFile(output, layout({
    lang,
    title: titleFor(doc, lang),
    output,
    body,
    currentSection: doc.section,
    currentDoc: doc.id,
  }));
}

function docsForSection(sectionId, lang) {
  return docs.filter((doc) => doc.section === sectionId && (doc.sources?.[lang] || doc.translationStatus?.[lang]));
}

function titleFor(doc, lang) {
  return doc.titles?.[lang] ?? doc.titles?.[defaultLanguage] ?? doc.id;
}

function langLabel(lang) {
  return lang === "zh" ? "中文" : "English";
}

function switchLanguageUrl(output, lang) {
  const other = lang === "en" ? "zh" : "en";
  return siteUrl(output, `${other}/index.html`);
}

function languageSwitchLinks(output, lang, doc) {
  return languages.map((targetLang) => {
    const ready = doc.sources?.[targetLang] || doc.translationStatus?.[targetLang];
    const target = ready ? siteUrl(output, `${slugPathForDoc(targetLang, doc)}index.html`) : "#";
    const current = targetLang === lang ? " aria-current=\"true\"" : "";
    return `<a${current} href="${target}">${langLabel(targetLang)}</a>`;
  }).join("");
}

function comicFor(output, doc, lang) {
  const comic = doc.comics?.[lang];
  if (!comic) return "";
  const copied = copyAssetToDist(comic);
  return siteUrl(output, copied);
}

function sidebar(lang, output, currentSection) {
  return `
    <aside class="sidebar" aria-label="${lang === "zh" ? "目录" : "Contents"}">
      <a class="brand-mark" href="${siteUrl(output, `${lang}/index.html`)}">Cyber-Ming</a>
      <nav>
        ${sections.map((section) => `
          <a class="${section.id === currentSection ? "active" : ""}" href="${siteUrl(output, `${lang}/${section.slug}/index.html`)}">
            <span>${String(section.order).padStart(2, "0")}</span>
            ${escapeHtml(section.titles[lang] ?? section.titles.en)}
          </a>
        `).join("")}
      </nav>
    </aside>
  `;
}

function articleFooter(lang, doc, output) {
  const sectionDocs = docsForSection(doc.section, lang).filter((item) => item.type !== "auxiliary");
  const index = sectionDocs.findIndex((item) => item.id === doc.id);
  const prev = index > 0 ? sectionDocs[index - 1] : null;
  const next = index >= 0 && index < sectionDocs.length - 1 ? sectionDocs[index + 1] : null;
  return `
    <footer class="article-nav">
      ${prev ? `<a href="${siteUrl(output, `${slugPathForDoc(lang, prev)}index.html`)}"><small>${lang === "zh" ? "上一章" : "Previous"}</small><span>${escapeHtml(titleFor(prev, lang))}</span></a>` : "<span></span>"}
      ${next ? `<a href="${siteUrl(output, `${slugPathForDoc(lang, next)}index.html`)}"><small>${lang === "zh" ? "下一章" : "Next"}</small><span>${escapeHtml(titleFor(next, lang))}</span></a>` : "<span></span>"}
    </footer>
  `;
}

function pendingTranslation(lang, doc, output) {
  const other = lang === "en" ? "zh" : "en";
  const otherReady = doc.sources?.[other];
  return `
    <div class="pending-note">
      <p>${lang === "zh" ? "本页译文尚未进入当前知识库。" : "This page is not translated in the current wiki yet."}</p>
      ${otherReady ? `<p><a href="${siteUrl(output, `${slugPathForDoc(other, doc)}index.html`)}">${lang === "zh" ? "查看另一语言版本" : "Read the other language version"}</a></p>` : ""}
    </div>
  `;
}

function layout({ lang, title, output, body, currentSection, currentDoc }) {
  const topLinks = sections.map((section) => {
    const href = siteUrl(output, `${lang}/${section.slug}/index.html`);
    return `<a class="${section.id === currentSection ? "active" : ""}" href="${href}">${escapeHtml(section.titles[lang] ?? section.titles.en)}</a>`;
  }).join("");
  const switchLink = currentDoc
    ? siteUrl(output, `${slugPathForDoc(lang === "en" ? "zh" : "en", docs.find((doc) => doc.id === currentDoc))}index.html`)
    : switchLanguageUrl(output, lang);
  return baseDocument({
    lang,
    title,
    output,
    body: `
      <header class="topbar">
        <a class="top-brand" href="${siteUrl(output, `${lang}/index.html`)}">Cyber-Ming</a>
        <nav class="top-nav">${topLinks}</nav>
        <a class="lang-switch" href="${switchLink}">${lang === "zh" ? "English" : "中文"}</a>
      </header>
      ${body}
    `,
  });
}

function baseDocument({ lang, title, output, body }) {
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="${siteUrl(output, "assets/static-wiki.css")}">
</head>
<body>
${body}
</body>
</html>
`;
}

function markdownToHtml(markdown, context) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  let paragraph = [];
  let list = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${inline(paragraph.join(" "), context)}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    blocks.push(`<${list.type}>${list.items.map((item) => `<li>${inline(item, context)}</li>`).join("")}</${list.type}>`);
    list = null;
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    if (/^```/.test(line)) {
      flushParagraph();
      flushList();
      const language = line.replace(/^```/, "").trim();
      const code = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i]);
        i += 1;
      }
      blocks.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
      i += 1;
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      i += 1;
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      blocks.push(`<h${level}>${inline(heading[2], context)}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      blocks.push("<hr>");
      i += 1;
      continue;
    }

    if (isTableStart(lines, i)) {
      flushParagraph();
      flushList();
      const headers = splitTableRow(lines[i]);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      blocks.push(`
        <table>
          <thead><tr>${headers.map((cell) => `<th>${inline(cell, context)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell, context)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      `);
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      flushList();
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(`<blockquote>${markdownToHtml(quote.join("\n"), context)}</blockquote>`);
      continue;
    }

    const unordered = /^[-*]\s+(.+)$/.exec(line);
    const ordered = /^\d+\.\s+(.+)$/.exec(line);
    if (unordered || ordered) {
      flushParagraph();
      const type = unordered ? "ul" : "ol";
      if (!list || list.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((unordered ?? ordered)[1]);
      i += 1;
      continue;
    }

    flushList();
    paragraph.push(line.trim());
    i += 1;
  }

  flushParagraph();
  flushList();
  return blocks.join("\n");
}

function isTableStart(lines, index) {
  return /^\|.*\|$/.test(lines[index]?.trim() ?? "")
    && /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|$/.test(lines[index + 1]?.trim() ?? "");
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function inline(text, context) {
  const tokens = [];
  const stash = (html) => {
    const key = `\u0000${tokens.length}\u0000`;
    tokens.push(html);
    return key;
  };

  let value = escapeHtml(text);
  value = value.replace(/`([^`]+)`/g, (_, code) => stash(`<code>${escapeHtml(code)}</code>`));
  value = value.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, href) => stash(`<img src="${resolveHref(href, context)}" alt="${escapeHtml(alt)}">`));
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => stash(`<a href="${resolveHref(href, context)}">${inline(label, context)}</a>`));
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  for (let index = 0; index < tokens.length; index += 1) {
    value = value.replaceAll(`\u0000${index}\u0000`, tokens[index]);
  }
  return value;
}

function resolveHref(href, context) {
  const raw = href.trim();
  if (/^(https?:|mailto:|#)/i.test(raw)) return escapeHtml(raw);
  const [withoutHash, hash = ""] = raw.split("#");
  const clean = decodeURIComponent(withoutHash);
  const sourceDir = context.source ? path.dirname(context.source) : "";
  const targetRepoPath = norm(path.normalize(path.join(sourceDir, clean)));
  const targetDoc = sourceToDoc.get(targetRepoPath);
  if (targetDoc) {
    return `${siteUrl(context.output, `${slugPathForDoc(targetDoc.lang, targetDoc.doc)}index.html`)}${hash ? `#${escapeHtml(hash)}` : ""}`;
  }
  const candidate = path.join(rootDir, targetRepoPath);
  if (withoutHash && fs.existsSync(candidate)) {
    if (targetRepoPath.startsWith("assets/visual-protocol/comics")) {
      const copied = copyAssetToDist(targetRepoPath);
      return `${siteUrl(context.output, copied)}${hash ? `#${escapeHtml(hash)}` : ""}`;
    }
    return `${githubBlobUrl(targetRepoPath)}${hash ? `#${escapeHtml(hash)}` : ""}`;
  }
  return escapeHtml(raw);
}

function githubBlobUrl(repoPath) {
  return `https://github.com/blackzhanzhan/Cyber-Ming-Protocol/blob/main/${norm(repoPath).split("/").map(encodeURIComponent).join("/")}`;
}
