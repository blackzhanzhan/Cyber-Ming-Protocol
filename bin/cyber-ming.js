#!/usr/bin/env node

const path = require("path");
const { runCli } = require("../installer/lib/cli");

async function main() {
  const repoRoot = path.resolve(__dirname, "..");
  try {
    const code = await runCli(process.argv, repoRoot);
    process.exit(code);
  } catch (error) {
    console.error(`Cyber-Ming installer error: ${error.message}`);
    process.exit(1);
  }
}

main();
