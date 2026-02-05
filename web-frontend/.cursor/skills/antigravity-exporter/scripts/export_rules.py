#!/usr/bin/env python3
"""
Export Cursor rules (.mdc) to Antigravity rules (.md)

This script runs from Cursor's perspective to export rules to Antigravity.

Usage:
    python export_rules.py                      # Export all rules
    python export_rules.py --single core.mdc    # Export single file
    python export_rules.py --dry-run            # Preview without writing
"""

import os
import re
import argparse
from pathlib import Path
from typing import Dict, List, Tuple


class RuleExporter:
    """Export Cursor rules to Antigravity format"""
    
    def __init__(self, source_dir: str = ".cursor/rules", target_dir: str = ".agent/rules"):
        self.source_dir = Path(source_dir)
        self.target_dir = Path(target_dir)
        
    def parse_frontmatter(self, content: str) -> Tuple[Dict, str]:
        """Extract YAML frontmatter and content"""
        frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)'
        match = re.match(frontmatter_pattern, content, re.DOTALL)
        
        if not match:
            return {}, content
        
        frontmatter_str = match.group(1)
        body = match.group(2)
        
        # Parse simple YAML (only handle key: value pairs)
        frontmatter = {}
        for line in frontmatter_str.split('\n'):
            line = line.strip()
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip()
                
                # Handle boolean values
                if value.lower() == 'true':
                    frontmatter[key] = True
                elif value.lower() == 'false':
                    frontmatter[key] = False
                else:
                    frontmatter[key] = value
        
        return frontmatter, body
    
    def detect_trigger_mode(self, frontmatter: Dict, content: str, filename: str) -> Dict:
        """Determine the best trigger mode for Antigravity"""
        always_apply = frontmatter.get('alwaysApply', False)
        
        # If alwaysApply is true, use always_on trigger
        if always_apply:
            return {"trigger": "always_on"}
        
        # Analyze content for file-specific patterns
        content_lower = content.lower()
        
        # Check for React/TypeScript specific content
        react_keywords = ['tsx', 'component', 'react', 'import', 'props', 'interface']
        i18n_keywords = ['i18n', 'translation', 'locale', 'usetranslation']
        mui_keywords = ['mui', 'material-ui', '@mui/material']
        
        if any(keyword in content_lower for keyword in i18n_keywords):
            return {"trigger": "glob", "globs": "*.tsx"}
        
        if any(keyword in content_lower for keyword in mui_keywords):
            return {"trigger": "glob", "globs": "*.tsx"}
        
        if any(keyword in content_lower for keyword in react_keywords):
            return {"trigger": "glob", "globs": "*.tsx"}
        
        # Check filename for hints
        if 'mui' in filename.lower():
            return {"trigger": "glob", "globs": "*.tsx"}
        
        if 'i18n' in filename.lower() or 'translation' in filename.lower():
            return {"trigger": "glob", "globs": "*.tsx"}
        
        if 'svg' in filename.lower():
            return {"trigger": "glob", "globs": "*.tsx"}
        
        # Default to manual trigger
        return {"trigger": "manual"}
    
    def generate_antigravity_frontmatter(self, trigger_config: Dict) -> str:
        """Generate Antigravity YAML frontmatter"""
        lines = ["---"]
        
        lines.append(f"trigger: {trigger_config['trigger']}")
        
        if 'globs' in trigger_config:
            lines.append(f"globs: {trigger_config['globs']}")
        
        lines.append("---")
        return '\n'.join(lines)
    
    def convert_content(self, content: str) -> str:
        """Convert content from Cursor to Antigravity format"""
        # Normalize line endings (Windows to Unix)
        content = content.replace('\r\n', '\n')
        
        # Remove any trailing whitespace
        lines = content.split('\n')
        lines = [line.rstrip() for line in lines]
        
        return '\n'.join(lines)
    
    def export_file(self, source_file: Path, dry_run: bool = False) -> Dict:
        """Export a single .mdc file to .md format"""
        result = {
            'source': str(source_file),
            'success': False,
            'message': '',
            'trigger': None
        }
        
        try:
            # Read source file
            with open(source_file, 'r', encoding='utf-8') as f:
                cursor_content = f.read()
            
            # Parse frontmatter and content
            frontmatter, body = self.parse_frontmatter(cursor_content)
            
            # Detect appropriate trigger mode
            trigger_config = self.detect_trigger_mode(
                frontmatter, 
                body, 
                source_file.stem
            )
            
            # Generate new frontmatter
            new_frontmatter = self.generate_antigravity_frontmatter(trigger_config)
            
            # Convert content
            converted_body = self.convert_content(body)
            
            # Combine frontmatter and body
            antigravity_content = f"{new_frontmatter}\n\n{converted_body}"
            
            # Determine target file path
            target_file = self.target_dir / f"{source_file.stem}.md"
            
            if not dry_run:
                # Create target directory if it doesn't exist
                self.target_dir.mkdir(parents=True, exist_ok=True)
                
                # Write to target file
                with open(target_file, 'w', encoding='utf-8') as f:
                    f.write(antigravity_content)
                
                result['message'] = f"[SUCCESS] {source_file.name} -> {target_file.name}"
            else:
                result['message'] = f"[DRY RUN] {source_file.name} -> {target_file.name}"
            
            result['success'] = True
            result['trigger'] = trigger_config
            result['target'] = str(target_file)
            
        except Exception as e:
            result['message'] = f"[ERROR] {source_file.name}: {str(e)}"
        
        return result
    
    def export_all(self, dry_run: bool = False) -> List[Dict]:
        """Export all .mdc files in source directory"""
        results = []
        
        if not self.source_dir.exists():
            print(f"[ERROR] Source directory not found: {self.source_dir}")
            return results
        
        mdc_files = list(self.source_dir.glob("*.mdc"))
        
        if not mdc_files:
            print(f"[WARNING] No .mdc files found in {self.source_dir}")
            return results
        
        print(f"\n[INFO] Exporting {len(mdc_files)} rule(s)...\n")
        
        for mdc_file in mdc_files:
            result = self.export_file(mdc_file, dry_run)
            results.append(result)
            print(result['message'])
        
        return results
    
    def print_summary(self, results: List[Dict]):
        """Print export summary"""
        successful = [r for r in results if r['success']]
        failed = [r for r in results if not r['success']]
        
        print(f"\n{'='*60}")
        print(f"Export Summary")
        print(f"{'='*60}")
        print(f"Total files: {len(results)}")
        print(f"Successful: {len(successful)}")
        print(f"Failed: {len(failed)}")
        
        if successful:
            print(f"\nExported rules:")
            for result in successful:
                trigger_info = result['trigger']
                trigger_str = f"trigger: {trigger_info['trigger']}"
                if 'globs' in trigger_info:
                    trigger_str += f", globs: {trigger_info['globs']}"
                print(f"   - {Path(result['source']).name} -> {Path(result['target']).name} ({trigger_str})")
        
        if failed:
            print(f"\nFailed exports:")
            for result in failed:
                print(f"   - {result['source']}: {result['message']}")
        
        print(f"{'='*60}\n")


def main():
    parser = argparse.ArgumentParser(
        description='Export Cursor rules (.mdc) to Antigravity rules (.md)'
    )
    parser.add_argument(
        '--source',
        default='.cursor/rules',
        help='Source directory containing .mdc files (default: .cursor/rules)'
    )
    parser.add_argument(
        '--target',
        default='.agent/rules',
        help='Target directory for .md files (default: .agent/rules)'
    )
    parser.add_argument(
        '--single',
        help='Export only a single file (filename only, e.g., core.mdc)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview export without writing files'
    )
    
    args = parser.parse_args()
    
    exporter = RuleExporter(args.source, args.target)
    
    if args.dry_run:
        print("[DRY RUN] No files will be written\n")
    
    if args.single:
        # Export single file
        source_file = exporter.source_dir / args.single
        if not source_file.exists():
            print(f"[ERROR] File not found: {source_file}")
            return
        
        result = exporter.export_file(source_file, args.dry_run)
        print(result['message'])
        
        if result['success']:
            trigger_info = result['trigger']
            print(f"\nTrigger mode: {trigger_info['trigger']}")
            if 'globs' in trigger_info:
                print(f"Glob pattern: {trigger_info['globs']}")
    else:
        # Export all files
        results = exporter.export_all(args.dry_run)
        exporter.print_summary(results)


if __name__ == '__main__':
    main()
