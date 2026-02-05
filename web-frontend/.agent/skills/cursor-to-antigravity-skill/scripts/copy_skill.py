#!/usr/bin/env python3
"""
Copy all skill folders from Cursor to Antigravity

Usage:
    python copy_skill.py                 # Copy all skills
    python copy_skill.py --dry-run       # Preview without copying
"""

import os
import shutil
import argparse
from pathlib import Path
from typing import List, Dict


class SkillCopier:
    """Copy Cursor skills to Antigravity workspace"""
    
    def __init__(self, source_dir: str = ".cursor/skills", target_dir: str = ".agent/skills"):
        self.source_dir = Path(source_dir)
        self.target_dir = Path(target_dir)
        
    def get_skill_directories(self) -> List[Path]:
        """Get list of all skill directories in source"""
        if not self.source_dir.exists():
            return []
        
        # Get all subdirectories in source
        skill_dirs = [
            d for d in self.source_dir.iterdir() 
            if d.is_dir() and not d.name.startswith('.')
        ]
        
        return sorted(skill_dirs)
    
    def copy_skill(self, source_skill: Path, dry_run: bool = False) -> Dict:
        """Copy a single skill directory to target"""
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
                
                result['message'] = f"✅ {source_skill.name}/ ({result['action']})"
            else:
                result['message'] = f"[DRY RUN] {source_skill.name}/ ({result['action']})"
            
            result['success'] = True
            
        except Exception as e:
            result['message'] = f"❌ {source_skill.name}/: {str(e)}"
        
        return result
    
    def copy_all_skills(self, dry_run: bool = False) -> List[Dict]:
        """Copy all skill directories"""
        results = []
        
        skill_dirs = self.get_skill_directories()
        
        if not skill_dirs:
            print(f"⚠️  No skill directories found in {self.source_dir}")
            return results
        
        print(f"\n🔄 Copying {len(skill_dirs)} skill(s)...\n")
        
        for skill_dir in skill_dirs:
            result = self.copy_skill(skill_dir, dry_run)
            results.append(result)
            print(result['message'])
        
        return results
    
    def print_summary(self, results: List[Dict]):
        """Print summary of copy operations"""
        successful = [r for r in results if r['success']]
        failed = [r for r in results if not r['success']]
        overwritten = [r for r in successful if r['action'] == 'overwrite']
        created = [r for r in successful if r['action'] == 'create']
        
        print(f"\n{'='*60}")
        print(f"📊 Copy Summary")
        print(f"{'='*60}")
        print(f"Total skills: {len(results)}")
        print(f"✅ Successful: {len(successful)}")
        print(f"   - Created: {len(created)}")
        print(f"   - Overwritten: {len(overwritten)}")
        print(f"❌ Failed: {len(failed)}")
        
        if successful:
            print(f"\n✅ Copied skills:")
            for result in successful:
                action_label = "📝 Created" if result['action'] == 'create' else "🔄 Overwritten"
                print(f"   {action_label}: {result['skill']}/")
        
        if failed:
            print(f"\n❌ Failed skills:")
            for result in failed:
                print(f"   - {result['message']}")
        
        print(f"{'='*60}\n")
    
    def list_skills(self):
        """List all available skills in source directory"""
        skill_dirs = self.get_skill_directories()
        
        if not skill_dirs:
            print(f"⚠️  No skills found in {self.source_dir}")
            return
        
        print(f"\n📁 Skills in {self.source_dir}:")
        print(f"{'='*60}")
        
        for skill_dir in skill_dirs:
            # Check if SKILL.md exists
            skill_md = skill_dir / "SKILL.md"
            has_skill_md = "✅" if skill_md.exists() else "❌"
            
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
        description='Copy all skill folders from Cursor to Antigravity'
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
        help='Preview copy operations without actually copying files'
    )
    parser.add_argument(
        '--list',
        action='store_true',
        help='List all skills in source directory'
    )
    
    args = parser.parse_args()
    
    copier = SkillCopier(args.source, args.target)
    
    if args.list:
        # Just list skills
        copier.list_skills()
        return
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No files will be copied\n")
    
    # Copy all skills
    results = copier.copy_all_skills(args.dry_run)
    
    if results:
        copier.print_summary(results)


if __name__ == '__main__':
    main()
