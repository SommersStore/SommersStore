import os

log_path = r"C:\Users\ADMIN\.gemini\antigravity\brain\698acaa9-e7d0-4b6e-b4e2-899f6fd2ee70\.system_generated\logs\overview.txt"

try:
    with open(log_path, "r", encoding="utf-8") as f:
        content = f.read()

        start_marker = "The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>."
        idx = content.find(start_marker)
        if idx != -1:
            idx += len(start_marker)
            # Find the end marker
            end_marker = "The above content shows the entire, complete file contents of the requested file."
            end_idx = content.find(end_marker, idx)
            if end_idx != -1:
                extracted = content[idx:end_idx].strip()
                # Remove line numbers
                clean_lines = []
                for line in extracted.split('\n'):
                    if ':' in line:
                        parts = line.split(':', 1)
                        if parts[0].strip().isdigit():
                            clean_lines.append(parts[1].strip() if not parts[1].startswith(' ') else parts[1][1:])
                        else:
                            clean_lines.append(line)
                    else:
                        clean_lines.append(line)
                
                with open(r"C:\Users\ADMIN\SommersStore\tmp_chapters.ts", "w", encoding="utf-8") as out_f:
                    out_f.write('\n'.join(clean_lines))
                print("Extracted successfully!")
            else:
                print("End marker not found")
        else:
            print("Start marker not found")
except Exception as e:
    print("Error:", e)
