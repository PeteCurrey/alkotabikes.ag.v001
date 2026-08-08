import os
from PIL import Image

COMP_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/Media/Components"
files = sorted([f for f in os.listdir(COMP_DIR) if f.endswith(".png")])

print(f"Total files found in Media/Components: {len(files)}")
for f in files:
    filepath = os.path.join(COMP_DIR, f)
    img = Image.open(filepath)
    print(f"File: {f} | Size: {img.size} | Mode: {img.mode}")
