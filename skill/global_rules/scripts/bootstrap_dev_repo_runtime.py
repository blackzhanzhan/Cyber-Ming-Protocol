#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


def _find_repo_root(start: Path) -> Path:
    current = start.resolve()
    for candidate in (current, *current.parents):
        if (candidate / ".git").exists() or (candidate / "AGENTS.md").exists():
            return candidate
    return current


def _utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _write_json_if_missing(path: Path, payload: dict) -> bool:
    if path.exists():
        return False
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return True


def _write_text_if_missing(path: Path, content: str) -> bool:
    if path.exists():
        return False
    path.write_text(content, encoding="utf-8")
    return True


def _bootstrap_architecture(dev_repo: Path, campaign_id: str) -> list[str]:
    architecture = dev_repo / "architecture"
    diagrams = architecture / "diagrams"
    decisions = architecture / "decisions"
    diagrams.mkdir(parents=True, exist_ok=True)
    decisions.mkdir(parents=True, exist_ok=True)

    created: list[str] = []

    if _write_text_if_missing(
        architecture / "README.md",
        "\n".join(
            [
                "# Architecture Constitution",
                "",
                "This directory stores architecture truth beside Cyber-Ming runtime truth.",
                "",
                "Use agent-actionable architecture:",
                "",
                "1. system context",
                "2. major subsystems / containers",
                "3. maintainable components",
                "4. critical flows and invariants",
                "",
                "Do not model every function by default. Use `confirmed`, `inferred`, and `unknown` confidence labels during old-project takeover.",
            ]
        )
        + "\n",
    ):
        created.append("dev_repo/architecture/README.md")

    if _write_text_if_missing(
        architecture / "ARCHITECTURE.md",
        "\n".join(
            [
                f"# {campaign_id} Architecture",
                "",
                "Status: initialized; architecture census required.",
                "",
                "## System Context",
                "",
                "- `unknown` - fill during takeover census.",
                "",
                "## Major Subsystems",
                "",
                "- `unknown` - identify repo subsystems before broad implementation.",
                "",
                "## Critical Flows",
                "",
                "- `unknown` - document flows that decide planning and verification.",
                "",
                "## Architecture Change Policy",
                "",
                "Open an architecture amendment contract when changing boundaries, responsibilities, public interfaces, dependency direction, runtime flow, persistence/evidence model, or invariants.",
            ]
        )
        + "\n",
    ):
        created.append("dev_repo/architecture/ARCHITECTURE.md")

    if _write_json_if_missing(
        architecture / "graph.json",
        {
            "schema_version": 1,
            "project": campaign_id,
            "detail_standard": "agent-actionable architecture",
            "confidence_legend": {
                "confirmed": "Proven directly by code, config, scripts, or runtime evidence.",
                "inferred": "Reconstructed from naming, file layout, imports, or commit history.",
                "unknown": "Requires a future probe or human confirmation.",
            },
            "nodes": [],
            "edges": [],
        },
    ):
        created.append("dev_repo/architecture/graph.json")

    if _write_json_if_missing(
        architecture / "index.json",
        {
            "schema_version": 1,
            "project": campaign_id,
            "file_index": {},
            "entrypoints": {},
            "contract_requirements": {
                "ordinary_contract_fields": [
                    "affected_architecture_nodes",
                    "unchanged_architecture_nodes",
                    "architecture_delta",
                    "requires_architecture_amendment",
                ],
                "amendment_contract_fields": [
                    "change_reason",
                    "changed_nodes",
                    "unchanged_nodes",
                    "new_boundaries",
                    "migration_expectations",
                    "architecture_artifacts_to_update",
                    "verification",
                ],
            },
        },
    ):
        created.append("dev_repo/architecture/index.json")

    if _write_text_if_missing(
        architecture / "invariants.md",
        "\n".join(
            [
                "# Architecture Invariants",
                "",
                "- Runtime truth and architecture truth must stay visible in `dev_repo/`.",
                "- Ordinary contracts must declare affected architecture nodes and architecture delta.",
                "- Architecture changes require amendment contracts when they alter boundaries, responsibilities, public interfaces, dependency direction, runtime flow, persistence/evidence model, or invariants.",
                "- Architecture census must distinguish `confirmed`, `inferred`, and `unknown` claims.",
            ]
        )
        + "\n",
    ):
        created.append("dev_repo/architecture/invariants.md")

    if _write_text_if_missing(
        diagrams / "context.mmd",
        "\n".join(
            [
                "flowchart LR",
                "  Project[Project]",
                "  Runtime[dev_repo runtime truth]",
                "  Architecture[architecture constitution]",
                "  Project --> Runtime",
                "  Project --> Architecture",
            ]
        )
        + "\n",
    ):
        created.append("dev_repo/architecture/diagrams/context.mmd")

    if _write_text_if_missing(
        decisions / "ADR-0001-architecture-constitution.md",
        "\n".join(
            [
                "# ADR-0001: Store Architecture Constitution Beside Runtime Truth",
                "",
                "Status: proposed",
                "",
                "## Decision",
                "",
                "Store architecture truth under `dev_repo/architecture/` so old-project takeover and future planning can reference system shape, boundaries, invariants, and amendment rules.",
            ]
        )
        + "\n",
    ):
        created.append("dev_repo/architecture/decisions/ADR-0001-architecture-constitution.md")

    return created


def main() -> int:
    parser = argparse.ArgumentParser(description="Bootstrap flat dev_repo runtime truth.")
    parser.add_argument("--repo-root", type=Path, default=Path.cwd(), help="Project root or any path inside the project.")
    args = parser.parse_args()

    repo_root = _find_repo_root(args.repo_root)
    dev_repo = repo_root / "dev_repo"
    dev_repo.mkdir(parents=True, exist_ok=True)

    campaign_id = repo_root.name
    created: list[str] = []

    if _write_json_if_missing(
        dev_repo / "state.json",
        {
            "campaign_id": campaign_id,
            "root_goal": "",
            "root_contract_id": "",
            "active_contract_id": "",
            "status": "idle",
            "contracts": {},
        },
    ):
        created.append("dev_repo/state.json")

    if _write_text_if_missing(
        dev_repo / "journal.jsonl",
        json.dumps(
            {
                "ts": _utc_now(),
                "event": "runtime_bootstrapped",
                "campaign_id": campaign_id,
                "repo_root": str(repo_root),
            },
            ensure_ascii=False,
        )
        + "\n",
    ):
        created.append("dev_repo/journal.jsonl")

    if _write_json_if_missing(
        dev_repo / "evidence_index.json",
        {
            "campaign_id": campaign_id,
            "root_contract_id": "",
            "active_contract_id": "",
            "artifacts": [],
        },
    ):
        created.append("dev_repo/evidence_index.json")

    if _write_text_if_missing(
        dev_repo / "tree.md",
        "\n".join(
            [
                f"# {campaign_id}",
                "",
                "- Root campaign: `unset`",
                "- Root campaign summary: `unset`",
                "- Active contract: `unset`",
                "- Current status: `idle`",
                "",
                "## Live Tree",
                "",
                "```text",
                f"{campaign_id} - register the root contract summary first [idle]",
                "└─ no contract tree yet - register `contract_id / summary / status / return_to` first",
                "```",
                "",
                "## Current Truth",
                "",
                "- `dev_repo` runtime has been initialized, but the root contract is not registered yet.",
                "- When building the tree, do not record only ids; include `summary` as well.",
            ]
        )
        + "\n",
    ):
        created.append("dev_repo/tree.md")

    created.extend(_bootstrap_architecture(dev_repo, campaign_id))

    print(
        json.dumps(
            {
                "repo_root": str(repo_root),
                "created": created,
                "runtime_files": [
                    "dev_repo/state.json",
                    "dev_repo/journal.jsonl",
                    "dev_repo/evidence_index.json",
                    "dev_repo/tree.md",
                    "dev_repo/architecture/README.md",
                    "dev_repo/architecture/ARCHITECTURE.md",
                    "dev_repo/architecture/graph.json",
                    "dev_repo/architecture/index.json",
                    "dev_repo/architecture/invariants.md",
                ],
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
