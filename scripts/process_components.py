import os
import subprocess

SOURCE_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/Media/Components"
TARGET_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/public/images/components"

os.makedirs(TARGET_DIR, exist_ok=True)

# Mapping of raw file names to canonical names
MAPPING = {
    "ChatGPT Image Aug 8, 2026, 04_59_51 PM.png": "component-overview-grid.png",
    "ChatGPT Image Aug 8, 2026, 05_27_19 PM (1).png": "hope-evo-v6ti-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_20 PM (2).png": "hope-evo-v6ti-angle-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_20 PM (3).png": "fox-38-factory-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_20 PM (4).png": "fox-float-x2-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_20 PM (5).png": "sram-xx-eagle-axs-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_21 PM (6).png": "dt-swiss-exc-1200-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_21 PM (7).png": "maxxis-assegai-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_22 PM (8).png": "maxxis-minion-dhr-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_22 PM (9).png": "renthal-fatbar-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_22 PM (10).png": "ergon-ge1-evo-dark.png",
    "ChatGPT Image Aug 8, 2026, 05_27_22 PM (11).png": "hope-evo-v6ti-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_23 PM (12).png": "hope-tr4-silver-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_23 PM (13).png": "fox-38-factory-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_23 PM (14).png": "fox-float-x2-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_23 PM (15).png": "sram-xx-eagle-axs-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_23 PM (16).png": "dt-swiss-exc-1200-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_24 PM (17).png": "maxxis-assegai-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_24 PM (18).png": "maxxis-minion-dhr-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_25 PM (19).png": "renthal-fatbar-alpine.png",
    "ChatGPT Image Aug 8, 2026, 05_27_25 PM (20).png": "ergon-ge1-evo-alpine.png",
}

print("Processing component images...")

for raw_name, target_name in MAPPING.items():
    src_path = os.path.join(SOURCE_DIR, raw_name)
    dst_path = os.path.join(TARGET_DIR, target_name)
    
    if not os.path.exists(src_path):
        print(f"WARNING: Source file {raw_name} not found!")
        continue

    # Copy file first
    subprocess.run(f'cp "{src_path}" "{dst_path}"', shell=True, check=True)
    
    # Resample width to max 1200px using sips for high resolution & small file size
    if target_name == "component-overview-grid.png":
        cmd = f'sips --resampleWidth 1600 "{dst_path}"'
    else:
        cmd = f'sips --resampleWidth 1000 "{dst_path}"'
        
    subprocess.run(cmd, shell=True, check=False)
    print(f"Processed: {target_name}")

print("COMPONENTS PROCESSING COMPLETE!")
