const fs = require("fs");
const os = require("os");
const path = require("path");
const { ADAPTERS, FIRST_PROMPT, listSkillSources } = require("./adapters");
const { bullet, kv, paint, section, ANSI } = require("./theme");
const {
  copyDir,
  ensureDir,
  loadTemplate,
  upsertManagedBlock,
  writeFile,
} = require("./utils");

const START_MARKER = "<!-- CYBER_MING STARTER START -->";
const END_MARKER = "<!-- CYBER_MING STARTER END -->";

function buildDocsRoot(scope, projectDir, root) {
  if (scope === "project") {
    return path.join(projectDir, ".cyber-ming", "docs");
  }
  return path.join(root, "cyber-ming", "docs");
}

function buildDocsReferenceRoot(scope, docsRoot) {
  if (scope === "project") {
    return ".cyber-ming/docs";
  }
  const homeDir = os.homedir();
  if (docsRoot.startsWith(homeDir)) {
    return `~${docsRoot.slice(homeDir.length)}`;
  }
  return docsRoot;
}

function buildManifestPath(adapter, scope, projectDir, root) {
  if (scope === "project") {
    return path.join(projectDir, ".cyber-ming", "install", `${adapter.key}.json`);
  }
  return path.join(root, "cyber-ming.manifest.json");
}

function copyStarterDocs(repoRoot, docsRoot) {
  ensureDir(docsRoot);
  copyDir(path.join(repoRoot, "bootstrap"), path.join(docsRoot, "bootstrap"));
  copyDir(path.join(repoRoot, "web-audit-templates"), path.join(docsRoot, "web-audit-templates"));
  writeFile(path.join(docsRoot, "BOOTSTRAP.md"), fs.readFileSync(path.join(repoRoot, "BOOTSTRAP.md"), "utf8"));
  writeFile(
    path.join(docsRoot, "dev_repo-runtime.md"),
    fs.readFileSync(path.join(repoRoot, "dev_repo", "README.md"), "utf8"),
  );
}

function installRuntime(repoRoot, runtime, scope, options) {
  const adapter = ADAPTERS[runtime];
  if (!adapter) {
    throw new Error(`Unknown runtime: ${runtime}`);
  }
  if (!adapter.supportedScopes.includes(scope)) {
    throw new Error(`${adapter.displayName} does not support ${scope} installs.`);
  }

  const projectDir = options.projectDir;
  const root = adapter.resolveRoot(scope, projectDir, options.configDir);
  const skillsDir = adapter.resolveSkillsDir(root, scope, projectDir);
  const starterTarget = adapter.resolveStarterTarget(scope, projectDir, root);
  const manifestPath = buildManifestPath(adapter, scope, projectDir, root);
  const docsRoot = buildDocsRoot(scope, projectDir, root);
  const docsReferenceRoot = buildDocsReferenceRoot(scope, docsRoot);
  const { skillRoot, entries } = listSkillSources(repoRoot);

  ensureDir(skillsDir);
  copyStarterDocs(repoRoot, docsRoot);

  for (const name of entries) {
    const sourceDir = path.join(skillRoot, name);
    const targetDir = path.join(skillsDir, name);
    fs.rmSync(targetDir, { recursive: true, force: true });
    copyDir(sourceDir, targetDir);
  }

  const starterContent = loadTemplate(repoRoot, adapter.starterTemplate, {
    DOCS_ROOT: docsReferenceRoot,
    FIRST_PROMPT,
  });

  if (adapter.starterMode === "file") {
    writeFile(starterTarget, starterContent.endsWith("\n") ? starterContent : `${starterContent}\n`);
  } else {
    upsertManagedBlock(starterTarget, starterContent, START_MARKER, END_MARKER);
  }

  const manifest = {
    runtime: adapter.key,
    displayName: adapter.displayName,
    scope,
    installedAt: new Date().toISOString(),
    installRoot: root,
    skillsDir,
    starterTarget,
    docsRoot,
    docsReferenceRoot,
    installedSkills: entries,
  };
  writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  return {
    adapter,
    manifestPath,
    projectDir,
    root,
    skillsDir,
    starterTarget,
    docsRoot,
    docsReferenceRoot,
    installedSkills: entries,
    scope,
    launchCommand: adapter.launchCommand(projectDir, scope),
  };
}

function inspectRuntime(runtime, scope, options) {
  const adapter = ADAPTERS[runtime];
  const projectDir = options.projectDir;
  const root = adapter.resolveRoot(scope, projectDir, options.configDir);
  const skillsDir = adapter.resolveSkillsDir(root, scope, projectDir);
  const starterTarget = adapter.resolveStarterTarget(scope, projectDir, root);
  const manifestPath = buildManifestPath(adapter, scope, projectDir, root);
  const docsRoot = buildDocsRoot(scope, projectDir, root);

  const installedSkills = fs.existsSync(skillsDir)
    ? fs
        .readdirSync(skillsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((name) => fs.existsSync(path.join(skillsDir, name, "SKILL.md")))
        .sort()
    : [];

  return {
    adapter,
    scope,
    root,
    skillsDir,
    starterTarget,
    docsRoot,
    manifestPath,
    hasManifest: fs.existsSync(manifestPath),
    hasStarter: fs.existsSync(starterTarget),
    installedSkills,
  };
}

function formatInstallSummary(result) {
  return [
    section(result.adapter.displayName, paint(ANSI.ash, result.adapter.key)),
    kv("Scope", result.scope),
    kv("Install Root", result.root),
    kv("Skills Dir", result.skillsDir),
    kv("Starter", result.starterTarget),
    kv("Docs Bundle", result.docsRoot),
    kv("Manifest", result.manifestPath),
    kv("Next Launch", result.launchCommand),
    kv("First Prompt", FIRST_PROMPT),
    "  Installed Skills",
    ...result.installedSkills.map((name) => bullet(name, "    ")),
  ].join("\n");
}

module.exports = {
  FIRST_PROMPT,
  formatInstallSummary,
  inspectRuntime,
  installRuntime,
};
