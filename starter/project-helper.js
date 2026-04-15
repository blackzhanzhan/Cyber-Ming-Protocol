#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const runtimeRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(runtimeRoot, "..");
const installRoot = path.join(runtimeRoot, "install");
const docsRoot = path.join(runtimeRoot, "docs");

function printBanner() {
  console.log("==============================================================");
  console.log(" ██████╗██╗   ██╗██████╗ ███████╗██████╗      ███╗   ███╗██╗███╗   ██╗ ██████╗ ");
  console.log("██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗     ████╗ ████║██║████╗  ██║██╔════╝ ");
  console.log("██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝     ██╔████╔██║██║██╔██╗ ██║██║  ███╗");
  console.log("██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗     ██║╚██╔╝██║██║██║╚██╗██║██║   ██║");
  console.log("╚██████╗   ██║   ██████╔╝███████╗██║  ██║     ██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝");
  console.log(" ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝     ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ");
  console.log("Runtime truth for deep-water AI coding");
  console.log("==============================================================");
  console.log("");
  console.log("");
}

function readManifests() {
  if (!fs.existsSync(installRoot)) {
    return [];
  }

  return fs
    .readdirSync(installRoot)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const absolutePath = path.join(installRoot, name);
      return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
    });
}

function printHelp() {
  printBanner();
  console.log("Cyber-Ming project helper");
  console.log("");
  console.log("Usage:");
  console.log("  node .cyber-ming/bin/cyber-ming.js");
  console.log("  node bin/cyber-ming.js");
  console.log("  node .cyber-ming/bin/cyber-ming.js help");
  console.log("  node bin/cyber-ming.js help");
  console.log("  node .cyber-ming/bin/cyber-ming.js doctor");
  console.log("  node bin/cyber-ming.js doctor");
  console.log("");
  console.log("What this helper does:");
  console.log("  - shows project-scoped Cyber-Ming starter references");
  console.log("  - checks which runtimes were installed into this repo");
  console.log("");
  console.log("Starter docs:");
  console.log(`  - ${path.join(docsRoot, "BOOTSTRAP.md")}`);
  console.log(`  - ${path.join(docsRoot, "bootstrap", "ide-executor.md")}`);
  console.log(`  - ${path.join(docsRoot, "bootstrap", "web-auditor.md")}`);
  console.log(`  - ${path.join(docsRoot, "dev_repo-runtime.md")}`);
  console.log("");
  console.log("For fresh installs or upgrades, use the source CLI:");
  console.log("  npx cyber-ming@latest init --help");
}

function printDoctor() {
  const manifests = readManifests();

  console.log("Cyber-Ming project doctor");
  console.log(`project root: ${projectRoot}`);
  console.log(`runtime root: ${runtimeRoot}`);
  console.log(`docs root: ${docsRoot}`);
  console.log("");

  if (manifests.length === 0) {
    console.log("No project-scoped Cyber-Ming runtime manifests were found.");
    return;
  }

  for (const manifest of manifests) {
    const starterExists = fs.existsSync(manifest.starterTarget);
    const skillsCount = Array.isArray(manifest.installedSkills) ? manifest.installedSkills.length : 0;

    console.log(`${manifest.displayName} (${manifest.runtime})`);
    console.log(`  scope: ${manifest.scope}`);
    console.log(`  skills: ${manifest.skillsDir}`);
    console.log(`  starter: ${starterExists ? "present" : "missing"} -> ${manifest.starterTarget}`);
    console.log(`  docs: ${manifest.docsRoot}`);
    console.log(`  installed skills: ${skillsCount}`);
    console.log("");
  }
}

const command = process.argv[2] || "help";

if (command === "doctor") {
  printDoctor();
} else {
  printHelp();
}
