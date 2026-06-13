import os
import re

def fix_version_format(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        changed = False
        in_table = False

        for i, line in enumerate(lines):
            if '| Versão | Data |' in line or '| :---: | :---: |' in line:
                in_table = True
                continue
            
            if in_table and not line.strip().startswith('|'):
                in_table = False

            if in_table:
                parts = line.split('|')
                if len(parts) >= 5:
                    ver_cell = parts[1].strip()
                    if re.match(r'^\d+\.\d+(\.\d+)?$', ver_cell):
                        # Use character literal for backtick to be absolutely safe
                        parts[1] = f' `{ver_cell}` '
                        new_line = '|'.join(parts)
                        lines[i] = new_line
                        changed = True

        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(lines)
            print(f'Fixed {filepath}')

    except Exception as e:
        print(f'Error processing {filepath}: {e}')

for root, dirs, files in os.walk('.'):
    if '.git' in root or '.venv' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.md'):
            fix_version_format(os.path.join(root, file))
