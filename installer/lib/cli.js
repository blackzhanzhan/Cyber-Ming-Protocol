const os = require("os");
const path = require("path");
const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");
const { ADAPTERS } = require("./adapters");
const { formatInstallSummary, inspectRuntime, installRuntime } = require("./install");
const { detectBinary } = require("./utils");
const { banner, chip, frame, kv, line, menuOption, paint, renderCast, section, splitBlockLines, ANSI } = require("./theme");

const RUNTIME_BLURBS = {
  claude: "Anthropic host with project/global skills and CLAUDE.md starter entry.",
  codex: "OpenAI host with project skill/ and global ~/.codex/skills routes.",
  cursor: "Editor-side host; project rules and skills are the stable first route.",
  opencode: "Agent host with XDG-friendly config and native skills directories.",
};

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
  return [
    banner(),
    section("Usage"),
    "  npx cyber-ming@latest",
    "  npx cyber-ming@latest init [runtime flags] [scope flags]",
    "  npx cyber-ming@latest doctor [runtime flags] [scope flags]",
    "",
    section("Runtime Flags"),
    "  --claude",
    "  --codex",
    "  --cursor",
    "  --opencode",
    "  --all",
    "",
    section("Scope Flags"),
    "  --global, -g",
    "  --local, --project, -l",
    "",
    section("Path Flags"),
    "  --config-dir <path>",
    "",
    section("Examples"),
    "  npx cyber-ming@latest",
    "  npx cyber-ming@latest --claude --global",
    "  npx cyber-ming@latest --codex --local",
    "  npx cyber-ming@latest doctor --all --project",
  ].join("\n");
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

    stdout.write(`${banner()}\n\n`);
    stdout.write(`${renderCast().join("\n")}\n\n`);
    stdout.write(`${section("Host Selection", "Choose the runtimes that should enter Cyber-Ming law")}\n`);
    stdout.write(`${line("-", 62, ANSI.ash)}\n`);
    for (const item of statuses) {
      const marker = item.detected ? chip("found", "FOUND") : chip("ready", "PROJECT READY");
      const block = menuOption(
        item.index,
        item.adapter.displayName,
        RUNTIME_BLURBS[item.runtime] || "Install Cyber-Ming starter law and skill routes for this host.",
        [marker],
      );
      stdout.write(`${frame("", splitBlockLines(block), { color: ANSI.ink, width: 74 }).join("\n")}\n`);
    }
    stdout.write(`${paint(ANSI.ash, "Project installs do not require every host binary to be present. Runtime truth is established through files first.")}\n`);
    const answer = await rl.question(`${paint(ANSI.vermilion, "Enter numbers separated by commas (or 'all'): ")} `);
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
    stdout.write(`\n${section("Scope", "Decide where Cyber-Ming should take effect")}\n`);
    stdout.write(
      `${frame(
        "",
        splitBlockLines(
          menuOption(
            1,
            "Project",
            "Versioned with the current repo. Best for first adoption, teamwork, and visible governance.",
            [chip("found", "RECOMMENDED")],
          ),
        ),
        { color: ANSI.ink, width: 88 },
      ).join("\n")}\n`,
    );
    if (allSupportGlobal) {
      stdout.write(
        `${frame(
          "",
          splitBlockLines(
            menuOption(
              2,
              "Global",
              "Shared across projects for this host. Use when you want Cyber-Ming available as a default operating posture.",
            ),
          ),
          { color: ANSI.ink, width: 88 },
        ).join("\n")}\n`,
      );
    }
    const answer = await rl.question(`${paint(ANSI.vermilion, "Enter number: ")} `);
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

  if (parsed.selectedRuntimes.length > 0) {
    stdout.write(`${banner()}\n\n`);
    stdout.write(`${renderCast().join("\n")}\n\n`);
    stdout.write(`${section("Install", "Applying Cyber-Ming law to the selected runtime routes")}\n`);
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

  stdout.write(`\n${line()}\n`);
  stdout.write(`${paint(ANSI.sage, "INSTALL COMPLETE", { bold: true })}\n`);
  stdout.write(`${paint(ANSI.ash, "Starter law, docs bundle, and runtime-specific skill routes are now in place.")}\n\n`);
  for (const result of results) {
    stdout.write(`${formatInstallSummary(result)}\n\n`);
  }
}

function runDoctor(parsed) {
  const selectedRuntimes = parsed.selectedRuntimes.length === 0 ? Object.keys(ADAPTERS) : parsed.selectedRuntimes;
  const scopes = parsed.scope ? [parsed.scope] : ["project", "global"];

  validateConfigDir(selectedRuntimes, parsed.configDir);

  stdout.write(`${banner()}\n\n`);
  stdout.write(`${section("Doctor", "Checking runtime routes, starter entrypoints, and managed skill presence")}\n`);
  stdout.write(`${line("-", 62, ANSI.ash)}\n`);

  for (const runtime of selectedRuntimes) {
    const status = detectRuntimeStatus(runtime);
    stdout.write(`${section(status.adapter.displayName, status.detected ? chip("found", "BINARY FOUND") : chip("missing", "BINARY MISSING"))}\n`);
    for (const scope of scopes) {
      if (!status.adapter.supportedScopes.includes(scope)) {
        stdout.write(`  ${scope}: unsupported\n`);
        continue;
      }
      const report = inspectRuntime(runtime, scope, {
        configDir: parsed.configDir,
        projectDir: parsed.projectDir,
      });
      stdout.write(kv(`${scope} Root`, report.root) + "\n");
      stdout.write(kv(`${scope} Skills`, report.skillsDir) + "\n");
      stdout.write(kv(`${scope} Starter`, `${report.hasStarter ? chip("found", "PRESENT") : chip("missing", "MISSING")} ${paint(ANSI.ash, `(${report.starterTarget})`)}`) + "\n");
      stdout.write(kv(`${scope} Manifest`, `${report.hasManifest ? chip("found", "PRESENT") : chip("missing", "MISSING")} ${paint(ANSI.ash, `(${report.manifestPath})`)}`) + "\n");
      stdout.write(kv(`${scope} Count`, String(report.installedSkills.length)) + "\n");
    }
    stdout.write("\n");
  }
}

async function runCli(argv, repoRoot) {
  const parsed = parseArgs(argv);
  if (parsed.help) {
    stdout.write(`${getHelpText()}\n`);
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
