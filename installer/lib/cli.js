const os = require("os");
const path = require("path");
const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");
const { ADAPTERS } = require("./adapters");
const { formatInstallSummary, inspectRuntime, installRuntime } = require("./install");
const { detectBinary } = require("./utils");

function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args[0] && !args[0].startsWith("-") ? args[0] : "init";
  const flags = new Set(args.filter((arg) => arg.startsWith("--") || arg.startsWith("-")));
  const configDirIndex = args.findIndex((arg) => arg === "--config-dir" || arg === "-c");
  let configDir = null;
  if (configDirIndex !== -1) {
    const nextArg = args[configDirIndex + 1] || null;
    if (!nextArg || nextArg.startsWith("-")) {
      throw new Error("--config-dir requires a path argument.");
    }
    configDir = nextArg;
  }
  const configDirWithEquals = args.find((arg) => arg.startsWith("--config-dir=") || arg.startsWith("-c="));
  if (configDirWithEquals) {
    configDir = configDirWithEquals.split("=")[1] || null;
  }

  const runtimeFlags = {
    claude: flags.has("--claude"),
    codex: flags.has("--codex"),
    cursor: flags.has("--cursor"),
    opencode: flags.has("--opencode"),
    all: flags.has("--all"),
  };

  const selectedRuntimes = runtimeFlags.all
    ? Object.keys(ADAPTERS)
    : Object.keys(ADAPTERS).filter((runtime) => runtimeFlags[runtime]);

  let scope = null;
  if (flags.has("--global") || flags.has("-g")) {
    scope = "global";
  } else if (flags.has("--local") || flags.has("--project") || flags.has("-l")) {
    scope = "project";
  }

  return {
    command,
    configDir,
    help: flags.has("--help") || flags.has("-h"),
    projectDir: process.cwd(),
    selectedRuntimes,
    scope,
  };
}

function getHelpText() {
  return `Cyber-Ming installer

Usage:
  npx cyber-ming@latest
  npx cyber-ming@latest init [runtime flags] [scope flags]
  npx cyber-ming@latest doctor [runtime flags] [scope flags]

Runtime flags:
  --claude
  --codex
  --cursor
  --opencode
  --all

Scope flags:
  --global, -g
  --local, --project, -l

Path flags:
  --config-dir <path>

Examples:
  npx cyber-ming@latest
  npx cyber-ming@latest --claude --global
  npx cyber-ming@latest --codex --local
  npx cyber-ming@latest doctor --all --project
`;
}

function detectRuntimeStatus(runtime) {
  const adapter = ADAPTERS[runtime];
  const detected = adapter.binaries.some((binary) => detectBinary(binary));
  return {
    adapter,
    detected,
  };
}

async function promptForRuntimes() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const statuses = Object.keys(ADAPTERS).map((runtime, index) => ({
      ...detectRuntimeStatus(runtime),
      runtime,
      index: index + 1,
    }));

    stdout.write("Select runtimes to install:\n");
    for (const item of statuses) {
      const marker = item.detected ? "detected" : "not detected";
      stdout.write(`  ${item.index}. ${item.adapter.displayName} [${marker}]\n`);
    }
    const answer = await rl.question("Enter numbers separated by commas (or 'all'): ");
    if (!answer.trim() || answer.trim().toLowerCase() === "all") {
      return Object.keys(ADAPTERS);
    }

    const selected = new Set();
    for (const token of answer.split(",")) {
      const index = Number.parseInt(token.trim(), 10);
      const found = statuses.find((item) => item.index === index);
      if (found) {
        selected.add(found.runtime);
      }
    }
    return [...selected];
  } finally {
    rl.close();
  }
}

async function promptForScope(runtimes) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const allSupportGlobal = runtimes.every((runtime) => ADAPTERS[runtime].supportedScopes.includes("global"));
    stdout.write("Select install scope:\n");
    stdout.write("  1. Project\n");
    if (allSupportGlobal) {
      stdout.write("  2. Global\n");
    }
    const answer = await rl.question("Enter number: ");
    if (answer.trim() === "2" && allSupportGlobal) {
      return "global";
    }
    return "project";
  } finally {
    rl.close();
  }
}

function validateConfigDir(selectedRuntimes, configDir) {
  if (!configDir) {
    return;
  }
  if (selectedRuntimes.length > 1) {
    throw new Error("--config-dir currently supports a single runtime install per invocation.");
  }
}

async function runInit(parsed, repoRoot) {
  let selectedRuntimes = parsed.selectedRuntimes;
  if (selectedRuntimes.length === 0) {
    selectedRuntimes = await promptForRuntimes();
  }
  if (selectedRuntimes.length === 0) {
    throw new Error("No runtimes selected.");
  }

  validateConfigDir(selectedRuntimes, parsed.configDir);

  let scope = parsed.scope;
  if (!scope) {
    scope = await promptForScope(selectedRuntimes);
  }

  const results = [];
  for (const runtime of selectedRuntimes) {
    results.push(
      installRuntime(repoRoot, runtime, scope, {
        configDir: parsed.configDir,
        projectDir: parsed.projectDir,
      }),
    );
  }

  stdout.write("\nInstall complete.\n\n");
  for (const result of results) {
    stdout.write(`${formatInstallSummary(result)}\n\n`);
  }
}

function runDoctor(parsed) {
  const selectedRuntimes = parsed.selectedRuntimes.length === 0 ? Object.keys(ADAPTERS) : parsed.selectedRuntimes;
  const scopes = parsed.scope ? [parsed.scope] : ["project", "global"];

  validateConfigDir(selectedRuntimes, parsed.configDir);

  for (const runtime of selectedRuntimes) {
    const status = detectRuntimeStatus(runtime);
    stdout.write(`${status.adapter.displayName} [binary ${status.detected ? "detected" : "not detected"}]\n`);
    for (const scope of scopes) {
      if (!status.adapter.supportedScopes.includes(scope)) {
        stdout.write(`  ${scope}: unsupported\n`);
        continue;
      }
      const report = inspectRuntime(runtime, scope, {
        configDir: parsed.configDir,
        projectDir: parsed.projectDir,
      });
      stdout.write(`  ${scope} root: ${report.root}\n`);
      stdout.write(`  ${scope} skills dir: ${report.skillsDir}\n`);
      stdout.write(`  ${scope} starter: ${report.hasStarter ? "present" : "missing"} (${report.starterTarget})\n`);
      stdout.write(`  ${scope} manifest: ${report.hasManifest ? "present" : "missing"} (${report.manifestPath})\n`);
      stdout.write(`  ${scope} installed skills: ${report.installedSkills.length}\n`);
    }
    stdout.write("\n");
  }
}

async function runCli(argv, repoRoot) {
  const parsed = parseArgs(argv);
  if (parsed.help) {
    stdout.write(getHelpText());
    return 0;
  }

  if (parsed.command === "doctor") {
    runDoctor(parsed);
    return 0;
  }

  if (parsed.command !== "init") {
    throw new Error(`Unknown command: ${parsed.command}`);
  }

  await runInit(parsed, repoRoot);
  return 0;
}

module.exports = {
  runCli,
};
