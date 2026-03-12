from __future__ import annotations

import argparse
import shutil
from pathlib import Path


EXCLUDED_SKILLS = {
    "antigravity-exporter",
    "github-copilot-exporter",
    "codex-exporter",
}


def list_skills(source_dir: Path) -> list[Path]:
    if not source_dir.exists():
        return []
    return sorted(
        [p for p in source_dir.iterdir() if p.is_dir()],
        key=lambda p: p.name.lower(),
    )


def copy_dir(src: Path, dst: Path, dry_run: bool) -> None:
    if dry_run:
        return
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(
        src,
        dst,
        dirs_exist_ok=False,
        ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"),
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Copy Cursor skills into .github/skills/")
    parser.add_argument("--source", default=".cursor/skills", help="Source skills dir")
    parser.add_argument("--target", default=".github/skills", help="Target skills dir")
    parser.add_argument("--dry-run", action="store_true", help="Preview only")
    parser.add_argument("--list", action="store_true", help="List skills in source dir")
    args = parser.parse_args()

    repo_root = Path.cwd()
    source_dir = (repo_root / args.source).resolve()
    target_dir = (repo_root / args.target).resolve()

    if args.list:
        skills = list_skills(source_dir)
        print(f"[INFO] {len(skills)} skill(s) found in {source_dir}\n")
        for p in skills:
            excluded = " (excluded)" if p.name in EXCLUDED_SKILLS else ""
            print(f"- {p.name}{excluded}")
        return 0

    if not source_dir.exists():
        raise SystemExit(f"[ERROR] Source skills dir not found: {source_dir}")

    skills = list_skills(source_dir)
    to_copy = [p for p in skills if p.name not in EXCLUDED_SKILLS]
    excluded = [p for p in skills if p.name in EXCLUDED_SKILLS]

    print("[DRY RUN] No files will be written\n" if args.dry_run else "")
    print(f"[INFO] Copying {len(to_copy)} skill(s) into {target_dir} ...\n")
    if excluded:
        print("[INFO] Excluded skills:")
        for p in excluded:
            print(f"- {p.name}")
        print("")

    if not args.dry_run:
        target_dir.mkdir(parents=True, exist_ok=True)

    for src in to_copy:
        dst = target_dir / src.name
        print(f"[{'DRY RUN' if args.dry_run else 'COPY'}] {src.name} -> {dst}")
        copy_dir(src, dst, args.dry_run)

    print("\n[SUCCESS] Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

