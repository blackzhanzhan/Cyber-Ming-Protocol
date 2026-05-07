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

REQUIRED_DATA_MODEL_FILES = [
    "dev_repo/architecture/data-model/README.md",
    "dev_repo/architecture/data-model/ER.md",
    "dev_repo/architecture/data-model/er.mmd",
    "dev_repo/architecture/data-model/entities.json",
    "dev_repo/architecture/data-model/relationships.json",
    "dev_repo/architecture/data-model/invariants.md",
    "dev_repo/architecture/data-model/migrations.md",
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

DATA_MODEL_CONTRACT_FIELDS = [
    "affected_data_entities",
    "unchanged_data_entities",
    "data_model_delta",
    "requires_er_amendment",
    "migration_required",
    "backfill_required",
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

DATA_MODEL_AMENDMENT_CONTRACT_FIELDS = [
    "change_reason",
    "changed_entities",
    "unchanged_entities",
    "changed_relationships",
    "unchanged_relationships",
    "source_vs_derived_changes",
    "migration_required",
    "backfill_required",
    "compatibility_expectations",
    "data_model_artifacts_to_update",
    "verification",
]

REQUIRED_ENTITY_FIELDS = [
    "entity_id",
    "display_name",
    "purpose",
    "owning_architecture_node",
    "source_or_derived",
    "source_artifacts",
    "identity",
    "state_fields",
    "derived_from",
    "migration_notes",
    "requires_amendment_when",
    "confidence",
]

REQUIRED_RELATIONSHIP_FIELDS = [
    "relationship_id",
    "from_entity",
    "to_entity",
    "cardinality",
    "reference_fields",
    "deletion_semantics",
    "source_artifacts",
    "requires_amendment_when",
    "confidence",
]

VALID_CONFIDENCE = {"confirmed", "inferred", "unknown"}
VALID_SOURCE_TYPES = {"source", "derived", "cache", "projection", "generated", "unknown"}


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
            data_amendment = requirements.get("data_model_amendment_contract_fields", [])
            for field in ORDINARY_CONTRACT_FIELDS:
                if field not in ordinary:
                    errors.append(f"ordinary contract requirements missing field: {field}")
            for field in DATA_MODEL_CONTRACT_FIELDS:
                if field not in ordinary:
                    errors.append(f"ordinary contract requirements missing data-model field: {field}")
            for field in AMENDMENT_CONTRACT_FIELDS:
                if field not in amendment:
                    errors.append(f"amendment contract requirements missing field: {field}")
            for field in DATA_MODEL_AMENDMENT_CONTRACT_FIELDS:
                if field not in data_amendment:
                    errors.append(f"data-model amendment contract requirements missing field: {field}")
        else:
            errors.append("dev_repo/architecture/index.json contract_requirements must be an object")


def validate_data_model(root: Path, errors: list[str]) -> None:
    entities_doc = read_json(root / "dev_repo/architecture/data-model/entities.json", errors)
    relationships_doc = read_json(root / "dev_repo/architecture/data-model/relationships.json", errors)

    entity_ids: set[str] = set()

    if isinstance(entities_doc, dict):
        require_keys(
            entities_doc,
            ["schema_version", "project", "detail_standard", "confidence_legend", "entities"],
            "dev_repo/architecture/data-model/entities.json",
            errors,
        )
        entities = entities_doc.get("entities")
        if not isinstance(entities, list):
            errors.append("dev_repo/architecture/data-model/entities.json entities must be a list")
        else:
            for position, entity in enumerate(entities):
                if not isinstance(entity, dict):
                    errors.append(f"data entity at index {position} must be an object")
                    continue
                require_keys(entity, REQUIRED_ENTITY_FIELDS, f"data entity {position}", errors)
                entity_id = entity.get("entity_id")
                if not isinstance(entity_id, str) or not entity_id:
                    errors.append(f"data entity {position} must have a non-empty entity_id")
                elif entity_id in entity_ids:
                    errors.append(f"duplicate data entity_id: {entity_id}")
                else:
                    entity_ids.add(entity_id)

                if entity.get("confidence") not in VALID_CONFIDENCE:
                    errors.append(f"data entity {entity_id} has invalid confidence: {entity.get('confidence')}")
                if entity.get("source_or_derived") not in VALID_SOURCE_TYPES:
                    errors.append(
                        f"data entity {entity_id} has invalid source_or_derived: {entity.get('source_or_derived')}"
                    )
                identity = entity.get("identity")
                if isinstance(identity, dict):
                    require_keys(
                        identity,
                        ["primary_key", "foreign_keys", "unique_constraints"],
                        f"data entity {entity_id} identity",
                        errors,
                    )
                else:
                    errors.append(f"data entity {entity_id} identity must be an object")

    if isinstance(relationships_doc, dict):
        require_keys(
            relationships_doc,
            ["schema_version", "project", "relationships"],
            "dev_repo/architecture/data-model/relationships.json",
            errors,
        )
        relationships = relationships_doc.get("relationships")
        if not isinstance(relationships, list):
            errors.append("dev_repo/architecture/data-model/relationships.json relationships must be a list")
        else:
            seen_relationships: set[str] = set()
            for position, relationship in enumerate(relationships):
                if not isinstance(relationship, dict):
                    errors.append(f"data relationship at index {position} must be an object")
                    continue
                require_keys(relationship, REQUIRED_RELATIONSHIP_FIELDS, f"data relationship {position}", errors)
                relationship_id = relationship.get("relationship_id")
                if not isinstance(relationship_id, str) or not relationship_id:
                    errors.append(f"data relationship {position} must have a non-empty relationship_id")
                elif relationship_id in seen_relationships:
                    errors.append(f"duplicate data relationship_id: {relationship_id}")
                else:
                    seen_relationships.add(relationship_id)

                if relationship.get("confidence") not in VALID_CONFIDENCE:
                    errors.append(
                        f"data relationship {relationship_id} has invalid confidence: {relationship.get('confidence')}"
                    )
                for side in ("from_entity", "to_entity"):
                    referenced = relationship.get(side)
                    if entity_ids and referenced not in entity_ids:
                        errors.append(f"data relationship {relationship_id} references unknown {side}: {referenced}")


def main() -> int:
    root = Path.cwd()
    errors: list[str] = []

    require_paths(root, REQUIRED_RUNTIME_FILES, errors)
    require_paths(root, REQUIRED_ARCHITECTURE_FILES, errors)
    require_paths(root, REQUIRED_DATA_MODEL_FILES, errors)

    if not errors:
        validate_runtime(root, errors)
        validate_architecture(root, errors)
        validate_data_model(root, errors)

    report = {
        "runtime_files": REQUIRED_RUNTIME_FILES,
        "architecture_files": REQUIRED_ARCHITECTURE_FILES,
        "data_model_files": REQUIRED_DATA_MODEL_FILES,
        "errors": errors,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
