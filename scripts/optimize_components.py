import os
import subprocess

TARGET_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/public/images/components"

for f in os.listdir(TARGET_DIR):
    if not f.endswith(".png"):
        continue
    filepath = os.path.join(TARGET_DIR, f)
    if f == "component-overview-grid.png":
        cmd = f'sips --resampleWidth 1200 "{filepath}"'
    else:
        cmd = f'sips --resampleWidth 720 "{filepath}"'
    subprocess.run(cmd, shell=True, check=False)

print("Component optimization complete!")
