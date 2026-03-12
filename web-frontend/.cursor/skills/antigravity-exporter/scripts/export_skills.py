#!/usr/bin/env python3
"""
Export all skill folders from Cursor to Antigravity

This script runs from Cursor's perspective to export skills to Antigravity.

Usage:
    python export_skills.py                 # Export all skills
    python export_skills.py --dry-run       # Preview without exporting
"""

import os
import shutil
import argparse
from pathlib import Path
from typing import List, Dict


EXCLUDED_SKILLS = {
    "antigravity-exporter",
    "github-copilot-exporter",
    "codex-exporter",
}


class SkillExporter:
    """Export Cursor skills to Antigravity workspace"""
    
    def __init__(self, source_dir: str = ".cursor/skills", target_dir: str = ".agent/skills"):
        self.source_dir = Path(source_dir)
        self.target_dir = Path(target_dir)
        
    def get_skill_directories(self) -> List[Path]:
        """Get list of all skill directories in source"""
        if not self.source_dir.exists():
            return []
        
        # Get all subdirectories in source, excluding specified skills
        skill_dirs = [
            d for d in self.source_dir.iterdir() 
            if d.is_dir() and not d.name.startswith('.') and d.name not in EXCLUDED_SKILLS
        ]
        
        return sorted(skill_dirs)
    
    def export_skill(self, source_skill: Path, dry_run: bool = False) -> Dict:
        """Export a single skill directory to target"""
        result = {
            'skill': source_skill.name,
            'success': False,
            'message': '',
            'action': ''
        }
        
        try:
            target_skill = self.target_dir / source_skill.name
            
            # Check if target exists
            if target_skill.exists():
                result['action'] = 'overwrite'
                if not dry_run:
                    # Remove existing directory
                    shutil.rmtree(target_skill)
            else:
                result['action'] = 'create'
            
            if not dry_run:
                # Create target directory if needed
                self.target_dir.mkdir(parents=True, exist_ok=True)
                
                # Copy entire directory tree
                shutil.copytree(source_skill, target_skill)
                
                result['message'] = f"[SUCCESS] {source_skill.name}/ ({result['action']})"
            else:
                result['message'] = f"[DRY RUN] {source_skill.name}/ ({result['action']})"
            
            result['success'] = True
            
        except Exception as e:
            result['message'] = f"[ERROR] {source_skill.name}/: {str(e)}"
        
        return result
    
    def export_all_skills(self, dry_run: bool = False) -> List[Dict]:
        """Export all skill directories"""
        results = []
        
        skill_dirs = self.get_skill_directories()
        
        if not skill_dirs:
            print(f"[WARNING] No skill directories found in {self.source_dir}")
            return results
        
        print(f"\n[INFO] Exporting {len(skill_dirs)} skill(s)...\n")
        
        for skill_dir in skill_dirs:
            result = self.export_skill(skill_dir, dry_run)
            results.append(result)
            print(result['message'])
        
        return results
    
    def print_summary(self, results: List[Dict]):
        """Print summary of export operations"""
        successful = [r for r in results if r['success']]
        failed = [r for r in results if not r['success']]
        overwritten = [r for r in successful if r['action'] == 'overwrite']
        created = [r for r in successful if r['action'] == 'create']
        
        print(f"\n{'='*60}")
        print(f"Export Summary")
        print(f"{'='*60}")
        print(f"Total skills: {len(results)}")
        print(f"Successful: {len(successful)}")
        print(f"   - Created: {len(created)}")
        print(f"   - Overwritten: {len(overwritten)}")
        print(f"Failed: {len(failed)}")
        
        if successful:
            print(f"\nExported skills:")
            for result in successful:
                action_label = "[Created]" if result['action'] == 'create' else "[Overwritten]"
                print(f"   {action_label}: {result['skill']}/")
        
        if failed:
            print(f"\nFailed skills:")
            for result in failed:
                print(f"   - {result['message']}")
        
        print(f"{'='*60}\n")
    
    def list_skills(self):
        """List all available skills in source directory"""
        skill_dirs = self.get_skill_directories()
        
        if not skill_dirs:
            print(f"[WARNING] No skills found in {self.source_dir}")
            return
        
        print(f"\nSkills in {self.source_dir}:")
        print(f"{'='*60}")
        
        for skill_dir in skill_dirs:
            # Check if SKILL.md exists
            skill_md = skill_dir / "SKILL.md"
            has_skill_md = "[OK]" if skill_md.exists() else "[MISSING]"
            
            # Count files
            file_count = sum(1 for _ in skill_dir.rglob('*') if _.is_file())
            
            print(f"{has_skill_md} {skill_dir.name}/")
            print(f"   Files: {file_count}")
            
            # List subdirectories
            subdirs = [d.name for d in skill_dir.iterdir() if d.is_dir() and not d.name.startswith('.')]
            if subdirs:
                print(f"   Subdirs: {', '.join(subdirs)}")
            
            print()
        
        print(f"{'='*60}\n")


def main():
    parser = argparse.ArgumentParser(
        description='Export all skill folders from Cursor to Antigravity'
    )
    parser.add_argument(
        '--source',
        default='.cursor/skills',
        help='Source directory containing Cursor skills (default: .cursor/skills)'
    )
    parser.add_argument(
        '--target',
        default='.agent/skills',
        help='Target directory for Antigravity skills (default: .agent/skills)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview export operations without actually exporting files'
    )
    parser.add_argument(
        '--list',
        action='store_true',
        help='List all skills in source directory'
    )
    
    args = parser.parse_args()
    
    exporter = SkillExporter(args.source, args.target)
    
    if args.list:
        # Just list skills
        exporter.list_skills()
        return
    
    if args.dry_run:
        print("[DRY RUN] No files will be exported\n")
    
    # Export all skills
    results = exporter.export_all_skills(args.dry_run)
    
    if results:
        exporter.print_summary(results)


if __name__ == '__main__':
    main()
