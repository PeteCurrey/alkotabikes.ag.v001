import os
import subprocess

PUBLIC_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/public"

# Resize images using macOS native `sips` command line tool
sips_cmds = [
    # Favicons & Icons
    f'sips -z 32 32 "{PUBLIC_DIR}/icon.png"',
    f'sips -z 32 32 "{PUBLIC_DIR}/favicon.ico"',
    f'sips -z 180 180 "{PUBLIC_DIR}/apple-icon.png"',
    
    # Brand logos
    f'sips --resampleWidth 600 "{PUBLIC_DIR}/brand/alkota-logo-dark.png"',
    f'sips --resampleWidth 600 "{PUBLIC_DIR}/brand/alkota-logo-light.png"',
    f'sips --resampleWidth 300 "{PUBLIC_DIR}/brand/alkota-monogram-dark.png"',
    f'sips --resampleWidth 300 "{PUBLIC_DIR}/brand/alkota-monogram-light.png"',

    # Photos
    f'sips --resampleWidth 1440 "{PUBLIC_DIR}/images/project01-glacier-white.png"',
    f'sips --resampleWidth 1440 "{PUBLIC_DIR}/images/project01-naked-carbon.png"',
    f'sips --resampleWidth 1440 "{PUBLIC_DIR}/images/project01-alpine-testing.png"',
    f'sips --resampleWidth 1440 "{PUBLIC_DIR}/images/engineering-workshop.png"',
    f'sips --resampleWidth 1200 "{PUBLIC_DIR}/og-image.png"',
]

for cmd in sips_cmds:
    subprocess.run(cmd, shell=True, check=False)

print("SIPS OPTIMIZATION COMPLETE!")
