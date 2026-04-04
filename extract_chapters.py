import os
import glob

brain_dir = r"C:\Users\ADMIN\.gemini\antigravity\brain"
logs = glob.glob(os.path.join(brain_dir, "**", "overview.txt"), recursive=True)

best_content = ""
for log in logs:
    try:
        with open(log, "r", encoding="utf-8") as f:
            content = f.read()
            if "export const protocolChapters" in content or "export default protocolChapters" in content:
                # Find the last view_file or write_to_file block containing chapters.ts
                idx = content.rfind("const protocolChapters")
                if idx != -1:
                    start_idx = content.rfind("```", 0, idx)
                    if start_idx == -1: start_idx = content.rfind("File Path:", 0, idx)
                    
                    # Extract roughly around it
                    best_content = content[max(0, start_idx-50):min(len(content), idx+40000)]
    except Exception as e:
        pass

with open(r"C:\Users\ADMIN\SommersStore\tmp_chapters.txt", "w", encoding="utf-8") as f:
    f.write(best_content)
print("Done extracting!")
