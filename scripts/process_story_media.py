import os
import shutil
import subprocess

SOURCE_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/Media"
TARGET_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/public/images/story"

os.makedirs(TARGET_DIR, exist_ok=True)

# Mapping of raw Media PNG files to semantic filenames
IMAGE_MAP = {
    "ChatGPT Image Aug 8, 2026, 04_37_54 PM (1).png": "pete-currey-founder-portrait.png",
    "ChatGPT Image Aug 8, 2026, 04_46_07 PM (1).png": "alkota-brand-emblem-lockup.png",
    "ChatGPT Image Aug 8, 2026, 04_46_08 PM (2).png": "project01-naked-carbon-studio.png",
    "ChatGPT Image Aug 8, 2026, 04_46_08 PM (3).png": "project01-glacier-white-showroom.png",
    "ChatGPT Image Aug 8, 2026, 04_46_11 PM (6).png": "alpine-trail-testing-action.png",
    "ChatGPT Image Aug 8, 2026, 06_34_32 PM (7).png": "pete-currey-workshop-laboratory.png",
    "ChatGPT Image Aug 8, 2026, 06_41_04 PM (3).png": "pete-currey-glacier-white-presentation.png",
    "ChatGPT Image Aug 8, 2026, 06_41_04 PM (4).png": "pete-currey-naked-carbon-inspection.png",
    "ChatGPT Image Aug 8, 2026, 06_41_04 PM (5).png": "pete-currey-alpine-architectural.png",
    "ChatGPT Image Aug 8, 2026, 06_41_06 PM (8).png": "mountain-event-paddock-environment.png",
    "ChatGPT Image Aug 8, 2026, 06_41_06 PM (9).png": "trade-show-paddock-presentation.png",
    "ChatGPT Image Aug 8, 2026, 06_43_07 PM (2).png": "founder-rider-dialogue-session.png",
    "ChatGPT Image Aug 8, 2026, 06_43_08 PM (5).png": "engineering-design-meeting.png",
    "ChatGPT Image Aug 8, 2026, 06_43_08 PM (6).png": "chassis-engineering-review.png",
    "ChatGPT Image Aug 8, 2026, 06_43_09 PM (8).png": "carbon-fiber-layup-development.png",
    "ChatGPT Image Aug 8, 2026, 06_43_09 PM (9).png": "component-development-bench.png",
    "ChatGPT Image Aug 8, 2026, 06_47_54 PM (3).png": "workshop-chassis-assembly.png",
    "ChatGPT Image Aug 8, 2026, 06_47_56 PM (6).png": "standalone-white-bike-presentation.png",
    "ChatGPT Image Aug 8, 2026, 06_47_58 PM (9).png": "standalone-black-bike-presentation.png",
    "ChatGPT Image Aug 8, 2026, 06_52_30 PM (2).png": "technical-cad-engineering-material.png",
    "ChatGPT Image Aug 8, 2026, 06_52_32 PM (5).png": "frame-development-mould-tooling.png",
    "ChatGPT Image Aug 8, 2026, 06_52_33 PM (8).png": "reverse-engineering-telemetry.png",
    "ChatGPT Image Aug 8, 2026, 06_52_33 PM (9).png": "kinematic-dynamics-analysis.png",
    "ChatGPT Image Aug 8, 2026, 06_59_59 PM (10).png": "prototype-build-validation.png",
    "ChatGPT Image Aug 8, 2026, 07_06_37 PM (7).png": "complete-machine-integration.png",
    "ChatGPT Image Aug 8, 2026, 07_06_38 PM (10).png": "haute-savoie-alpine-field-test.png",
    "ChatGPT Image Aug 8, 2026, 07_06_38 PM (9).png": "laboratory-stress-fatigue-bench.png",
    "ChatGPT Image Aug 8, 2026, 07_11_00 PM (2).png": "pete-currey-riding-history-origin.png",
}

for src_name, target_name in IMAGE_MAP.items():
    src_path = os.path.join(SOURCE_DIR, src_name)
    target_path = os.path.join(TARGET_DIR, target_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, target_path)
        # Resample width to 1440px for web optimization using sips
        subprocess.run(["sips", "--resampleWidth", "1440", target_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Processed: {target_name}")
    else:
        print(f"Warning: {src_name} not found")

print(f"Total story images copied to {TARGET_DIR}: {len(os.listdir(TARGET_DIR))}")
