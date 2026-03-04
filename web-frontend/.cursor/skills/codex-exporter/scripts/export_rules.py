from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


@dataclass(frozen=True)
class MdcRule:
    filename: str
    frontmatter: dict[str, str]
    body: str


def _parse_frontmatter(lines: list[str]) -> tuple[dict[str, str], int]:
    if len(lines) < 3 or lines[0].strip() != "---":
        return ({}, 0)

    frontmatter: dict[str, str] = {}
    i = 1
    while i < len(lines):
        if lines[i].strip() == "---":
            return (frontmatter, i + 1)
        raw = lines[i].rstrip("\n")
        if not raw.strip():
            i += 1
            continue
        if ":" not in raw:
            i += 1
            continue
        key, value = raw.split(":", 1)
        frontmatter[key.strip()] = value.strip().strip("'").strip('"')
        i += 1

    return ({}, 0)


def read_mdc(path: Path) -> MdcRule:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)
    frontmatter, body_start = _parse_frontmatter(lines)
    body = "".join(lines[body_start:]).lstrip("\n")
    return MdcRule(filename=path.name, frontmatter=frontmatter, body=body)


def is_always_apply(rule: MdcRule) -> bool:
    return rule.frontmatter.get("alwaysApply", "").lower() == "true"


def ensure_dir(path: Path, dry_run: bool) -> None:
    if dry_run:
        return
    path.mkdir(parents=True, exist_ok=True)


def write_text(path: Path, content: str, dry_run: bool) -> None:
    if dry_run:
        return
    path.write_text(content.replace("\r\n", "\n"), encoding="utf-8")


def build_agents_md(always_rules: list[MdcRule]) -> str:
    parts: list[str] = []
    parts.append("# Repository Instructions\n\n")
    parts.append(
        "These are repository-wide instructions for OpenAI Codex in this repo.\n\n"
    )
    parts.append("## Included rules\n\n")
    for rule in always_rules:
        parts.append(f"- `{rule.filename}`\n")
    parts.append("\n")

    for rule in always_rules:
        title = rule.frontmatter.get("description") or rule.filename
        parts.append(f"---\n\n## {title}\n\n")
        parts.append(rule.body.rstrip() + "\n\n")

    return "".join(parts).strip() + "\n"


def build_scoped_rule_md(rule: MdcRule) -> str:
    title = rule.frontmatter.get("description") or Path(rule.filename).stem
    return f"# {title}\n\n" + rule.body.strip() + "\n"


def iter_rule_files(source_dir: Path) -> Iterable[Path]:
    return sorted(source_dir.glob("*.mdc"), key=lambda p: p.name.lower())


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Export Cursor rules (.mdc) to Codex AGENTS.md format"
    )
    parser.add_argument("--source", default=".cursor/rules", help="Source rules dir")
    parser.add_argument("--target", default=".agents", help="Target .agents dir")
    parser.add_argument("--dry-run", action="store_true", help="Preview only")
    parser.add_argument(
        "--single", default="", help="Export a single .mdc file (e.g., core.mdc)"
    )
    args = parser.parse_args()

    repo_root = Path.cwd()
    source_dir = (repo_root / args.source).resolve()
    agents_dir = (repo_root / args.target).resolve()

    if not source_dir.exists():
        raise SystemExit(f"[ERROR] Source rules dir not found: {source_dir}")

    rule_paths = list(iter_rule_files(source_dir))
    if args.single:
        rule_paths = [p for p in rule_paths if p.name == args.single]
        if not rule_paths:
            raise SystemExit(f"[ERROR] Rule not found: {args.single}")

    rules = [read_mdc(p) for p in rule_paths]
    always_rules = [r for r in rules if is_always_apply(r)]
    scoped_rules = [r for r in rules if not is_always_apply(r)]

    print("[DRY RUN] No files will be written\n" if args.dry_run else "")
    print(f"[INFO] Exporting {len(rules)} rule(s)...\n")

    ensure_dir(agents_dir, args.dry_run)

    # 1) Repository-wide → AGENTS.md at .agents/AGENTS.md
    if always_rules:
        out_agents = agents_dir / "AGENTS.md"
        content = build_agents_md(always_rules)
        print(f"[{'DRY RUN' if args.dry_run else 'WRITE'}] {out_agents}")
        write_text(out_agents, content, args.dry_run)

    # 2) Scoped rules → .agents/rules/<name>.md
    if scoped_rules:
        rules_dir = agents_dir / "rules"
        ensure_dir(rules_dir, args.dry_run)
        for rule in scoped_rules:
            out_file = rules_dir / f"{Path(rule.filename).stem}.md"
            content = build_scoped_rule_md(rule)
            globs = rule.frontmatter.get("globs", "")
            print(
                f"[{'DRY RUN' if args.dry_run else 'WRITE'}] {out_file}"
                + (f" (globs={globs})" if globs else "")
            )
            write_text(out_file, content, args.dry_run)

    print("\n[SUCCESS] Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
