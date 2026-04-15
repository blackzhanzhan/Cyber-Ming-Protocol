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
                "- 根战役：`未设定`",
                "- 根战役摘要：`未设定`",
                "- 当前激活合同：`未设定`",
                "- 当前状态：`idle`",
                "",
                "## Live Tree",
                "",
                "```text",
                f"{campaign_id} — 请先登记根合同摘要 [idle]",
                "└─ 尚未建树 —— 请先登记 `contract_id / summary / status / return_to`",
                "```",
                "",
                "## Current Truth",
                "",
                "- `dev_repo` 运行时已初始化，但主合同尚未登记",
                "- 建树时不要只写编号；请同时补 `summary`",
            ]
        )
        + "\n",
    ):
        created.append("dev_repo/tree.md")

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
                ],
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
