const os = require("os");
const path = require("path");
const { expandTilde } = require("./utils");

const FIRST_PROMPT =
  "按 Cyber-Ming Protocol 自举入场；先识别当前仓库法统，检查是否已有 dev_repo 运行时，并在任何编辑前给出接手快照与执行路线。";

function getXdgConfigHome() {
  if (process.env.XDG_CONFIG_HOME) {
    return expandTilde(process.env.XDG_CONFIG_HOME);
  }
  return path.join(os.homedir(), ".config");
}

function resolveOpenCodeRoot(explicitDir) {
  if (explicitDir) {
    return expandTilde(explicitDir);
  }
  if (process.env.OPENCODE_CONFIG_DIR) {
    return expandTilde(process.env.OPENCODE_CONFIG_DIR);
  }
  if (process.env.OPENCODE_CONFIG) {
    return path.dirname(expandTilde(process.env.OPENCODE_CONFIG));
  }
  return path.join(getXdgConfigHome(), "opencode");
}

function resolveClaudeRoot(explicitDir) {
  if (explicitDir) {
    return expandTilde(explicitDir);
  }
  if (process.env.CLAUDE_CONFIG_DIR) {
    return expandTilde(process.env.CLAUDE_CONFIG_DIR);
  }
  return path.join(os.homedir(), ".claude");
}

function resolveCodexRoot(explicitDir) {
  if (explicitDir) {
    return expandTilde(explicitDir);
  }
  if (process.env.CODEX_HOME) {
    return expandTilde(process.env.CODEX_HOME);
  }
  return path.join(os.homedir(), ".codex");
}

function resolveCursorRoot(explicitDir) {
  if (explicitDir) {
    return expandTilde(explicitDir);
  }
  if (process.env.CURSOR_CONFIG_DIR) {
    return expandTilde(process.env.CURSOR_CONFIG_DIR);
  }
  return path.join(os.homedir(), ".cursor");
}

const ADAPTERS = {
  claude: {
    key: "claude",
    displayName: "Claude Code",
    binaries: ["claude"],
    supportedScopes: ["project", "global"],
    resolveRoot(scope, projectDir, explicitDir) {
      return scope === "project" ? path.join(projectDir, ".claude") : resolveClaudeRoot(explicitDir);
    },
    resolveSkillsDir(root) {
      return path.join(root, "skills");
    },
    resolveStarterTarget(scope, projectDir, root) {
      return scope === "project" ? path.join(projectDir, "CLAUDE.md") : path.join(root, "CLAUDE.md");
    },
    starterTemplate: "starter/common.md",
    starterMode: "markdown-block",
    launchCommand(projectDir, scope) {
      return scope === "project" ? `cd "${projectDir}" && claude` : "claude";
    },
  },
  codex: {
    key: "codex",
    displayName: "Codex",
    binaries: ["codex"],
    supportedScopes: ["project", "global"],
    resolveRoot(scope, projectDir, explicitDir) {
      return scope === "project" ? projectDir : resolveCodexRoot(explicitDir);
    },
    resolveSkillsDir(root, scope, projectDir) {
      return scope === "project" ? path.join(projectDir, "skill") : path.join(root, "skills");
    },
    resolveStarterTarget(scope, projectDir, root) {
      return scope === "project" ? path.join(projectDir, "AGENTS.md") : path.join(root, "AGENTS.md");
    },
    starterTemplate: "starter/common.md",
    starterMode: "markdown-block",
    launchCommand(projectDir, scope) {
      return scope === "project" ? `cd "${projectDir}" && codex` : "codex";
    },
  },
  cursor: {
    key: "cursor",
    displayName: "Cursor",
    binaries: ["cursor"],
    supportedScopes: ["project", "global"],
    resolveRoot(scope, projectDir, explicitDir) {
      return scope === "project" ? path.join(projectDir, ".cursor") : resolveCursorRoot(explicitDir);
    },
    resolveSkillsDir(root) {
      return path.join(root, "skills");
    },
    resolveStarterTarget(_scope, _projectDir, root) {
      return path.join(root, "rules", "cyber-ming-starter.mdc");
    },
    starterTemplate: "starter/cursor-starter.mdc",
    starterMode: "file",
    launchCommand(projectDir, scope) {
      return scope === "project" ? `cursor "${projectDir}"` : "cursor";
    },
  },
  opencode: {
    key: "opencode",
    displayName: "OpenCode",
    binaries: ["opencode"],
    supportedScopes: ["project", "global"],
    resolveRoot(scope, projectDir, explicitDir) {
      return scope === "project" ? path.join(projectDir, ".opencode") : resolveOpenCodeRoot(explicitDir);
    },
    resolveSkillsDir(root) {
      return path.join(root, "skills");
    },
    resolveStarterTarget(scope, projectDir, root) {
      return scope === "project" ? path.join(projectDir, "AGENTS.md") : path.join(root, "AGENTS.md");
    },
    starterTemplate: "starter/common.md",
    starterMode: "markdown-block",
    launchCommand(projectDir, scope) {
      return scope === "project" ? `cd "${projectDir}" && opencode` : "opencode";
    },
  },
};

function listSkillSources(repoRoot) {
  const skillRoot = path.join(repoRoot, "skill");
  const entries = require("fs")
    .readdirSync(skillRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  return {
    skillRoot,
    entries,
  };
}

module.exports = {
  ADAPTERS,
  FIRST_PROMPT,
  listSkillSources,
};
