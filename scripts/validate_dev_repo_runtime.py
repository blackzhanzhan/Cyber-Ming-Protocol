#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from pathlib import Path


REQUIRED_RUNTIME_FILES = [
    "dev_repo/state.json",
    "dev_repo/journal.jsonl",
    "dev_repo/evidence_index.json",
    "dev_repo/tree.md",
]

REQUIRED_ARCHITECTURE_FILES = [
    "dev_repo/architecture/README.md",
    "dev_repo/architecture/ARCHITECTURE.md",
    "dev_repo/architecture/graph.json",
    "dev_repo/architecture/index.json",
    "dev_repo/architecture/invariants.md",
]

REQUIRED_NODE_FIELDS = [
    "node_id",
    "purpose",
    "owned_files",
    "public_interfaces",
    "depends_on",
    "depended_on_by",
    "invariants",
    "allowed_change_types",
    "requires_amendment_when",
    "verification",
    "known_debt",
    "confidence",
]

ORDINARY_CONTRACT_FIELDS = [
    "affected_architecture_nodes",
    "unchanged_architecture_nodes",
    "architecture_delta",
    "requires_architecture_amendment",
]

AMENDMENT_CONTRACT_FIELDS = [
    "change_reason",
    "changed_nodes",
    "unchanged_nodes",
    "new_boundaries",
    "migration_expectations",
    "architecture_artifacts_to_update",
    "verification",
]


def read_json(path: Path, errors: list[str]):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001 - validation script should report all parse failures plainly.
        errors.append(f"{path.as_posix()} is not valid JSON: {exc}")
        return None


def require_paths(root: Path, paths: list[str], errors: list[str]) -> None:
    for rel in paths:
        if not (root / rel).exists():
            errors.append(f"missing required file: {rel}")


def require_keys(obj: dict, keys: list[str], label: str, errors: list[str]) -> None:
    for key in keys:
        if key not in obj:
            errors.append(f"{label} missing key: {key}")


def validate_runtime(root: Path, errors: list[str]) -> None:
    state = read_json(root / "dev_repo/state.json", errors)
    evidence = read_json(root / "dev_repo/evidence_index.json", errors)

    if isinstance(state, dict):
        require_keys(
            state,
            ["campaign_id", "root_goal", "root_contract_id", "active_contract_id", "status", "contracts"],
            "dev_repo/state.json",
            errors,
        )
        if not isinstance(state.get("contracts"), dict):
            errors.append("dev_repo/state.json contracts must be an object")

    if isinstance(evidence, dict):
        require_keys(
            evidence,
            ["campaign_id", "root_contract_id", "active_contract_id", "artifacts"],
            "dev_repo/evidence_index.json",
            errors,
        )
        if not isinstance(evidence.get("artifacts"), list):
            errors.append("dev_repo/evidence_index.json artifacts must be a list")

    journal = root / "dev_repo/journal.jsonl"
    if journal.exists():
        for index, line in enumerate(journal.read_text(encoding="utf-8").splitlines(), start=1):
            if line.strip():
                try:
                    json.loads(line)
                except json.JSONDecodeError as exc:
                    errors.append(f"dev_repo/journal.jsonl line {index} is not valid JSON: {exc}")


def validate_architecture(root: Path, errors: list[str]) -> None:
    graph = read_json(root / "dev_repo/architecture/graph.json", errors)
    index = read_json(root / "dev_repo/architecture/index.json", errors)

    if isinstance(graph, dict):
        require_keys(
            graph,
            ["schema_version", "project", "detail_standard", "confidence_legend", "nodes", "edges"],
            "dev_repo/architecture/graph.json",
            errors,
        )
        nodes = graph.get("nodes")
        if not isinstance(nodes, list):
            errors.append("dev_repo/architecture/graph.json nodes must be a list")
        else:
            seen = set()
            for position, node in enumerate(nodes):
                if not isinstance(node, dict):
                    errors.append(f"architecture node at index {position} must be an object")
                    continue
                require_keys(node, REQUIRED_NODE_FIELDS, f"architecture node {position}", errors)
                node_id = node.get("node_id")
                if node_id in seen:
                    errors.append(f"duplicate architecture node_id: {node_id}")
                seen.add(node_id)
                if node.get("confidence") not in {"confirmed", "inferred", "unknown"}:
                    errors.append(f"architecture node {node_id} has invalid confidence: {node.get('confidence')}")

    if isinstance(index, dict):
        require_keys(
            index,
            ["schema_version", "project", "file_index", "entrypoints", "contract_requirements"],
            "dev_repo/architecture/index.json",
            errors,
        )
        requirements = index.get("contract_requirements")
        if isinstance(requirements, dict):
            ordinary = requirements.get("ordinary_contract_fields", [])
            amendment = requirements.get("amendment_contract_fields", [])
            for field in ORDINARY_CONTRACT_FIELDS:
                if field not in ordinary:
                    errors.append(f"ordinary contract requirements missing field: {field}")
            for field in AMENDMENT_CONTRACT_FIELDS:
                if field not in amendment:
                    errors.append(f"amendment contract requirements missing field: {field}")
        else:
            errors.append("dev_repo/architecture/index.json contract_requirements must be an object")


def main() -> int:
    root = Path.cwd()
    errors: list[str] = []

    require_paths(root, REQUIRED_RUNTIME_FILES, errors)
    require_paths(root, REQUIRED_ARCHITECTURE_FILES, errors)

    if not errors:
        validate_runtime(root, errors)
        validate_architecture(root, errors)

    report = {
        "runtime_files": REQUIRED_RUNTIME_FILES,
        "architecture_files": REQUIRED_ARCHITECTURE_FILES,
        "errors": errors,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
