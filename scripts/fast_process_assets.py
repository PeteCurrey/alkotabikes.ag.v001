import os
import numpy as np
from PIL import Image, ImageEnhance

MEDIA_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/Media"
PUBLIC_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/public"
BRAND_DIR = os.path.join(PUBLIC_DIR, "brand")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")

os.makedirs(BRAND_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

LOGO_FILE = os.path.join(MEDIA_DIR, "ChatGPT Image Aug 8, 2026, 04_46_07 PM (1).png")
MONOGRAM_FILE = os.path.join(MEDIA_DIR, "ChatGPT Image Aug 8, 2026, 04_46_08 PM (2).png")
GLACIER_WHITE_FILE = os.path.join(MEDIA_DIR, "ChatGPT Image Aug 8, 2026, 04_46_08 PM (3).png")
ALPINE_TESTING_FILE = os.path.join(MEDIA_DIR, "ChatGPT Image Aug 8, 2026, 04_46_11 PM (6).png")

def process_logo(src_path, dark_out, light_out):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img)
    
    # RGB channels
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    lum = (0.299 * r + 0.587 * g + 0.114 * b).astype(np.uint8)
    
    # Calculate non-white bounding box
    is_content = lum < 220
    coords = np.argwhere(is_content)
    if coords.size > 0:
        y0, x0 = coords.min(axis=0)
        y1, x1 = coords.max(axis=0)
        # Margin
        pad = 20
        y0 = max(0, y0 - pad)
        x0 = max(0, x0 - pad)
        y1 = min(arr.shape[0], y1 + pad)
        x1 = min(arr.shape[1], x1 + pad)
        arr = arr[y0:y1, x0:x1]
        lum = lum[y0:y1, x0:x1]
        
    alpha = np.clip((255 - lum.astype(float)) * 1.25, 0, 255).astype(np.uint8)
    
    # Dark version: deep black #050607
    dark_arr = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
    dark_arr[:,:,0] = 5
    dark_arr[:,:,1] = 6
    dark_arr[:,:,2] = 7
    dark_arr[:,:,3] = alpha
    
    # Light version: pure white #FFFFFF
    light_arr = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
    light_arr[:,:,0] = 255
    light_arr[:,:,1] = 255
    light_arr[:,:,2] = 255
    light_arr[:,:,3] = alpha
    
    Image.fromarray(dark_arr).save(dark_out, "PNG")
    Image.fromarray(light_arr).save(light_out, "PNG")
    print(f"Generated logo variants: {dark_out}, {light_out}")

def generate_favicons():
    mono_dark_path = os.path.join(BRAND_DIR, "alkota-monogram-dark.png")
    mono_light_path = os.path.join(BRAND_DIR, "alkota-monogram-light.png")
    
    mono_img = Image.open(mono_dark_path)
    w, h = mono_img.size
    side = max(w, h) + 30
    
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(mono_img, ((side - w) // 2, (side - h) // 2))
    
    fav = square.resize((32, 32), Image.Resampling.LANCZOS)
    fav.save(os.path.join(PUBLIC_DIR, "icon.png"), "PNG")
    fav.save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO")
    
    apple_bg = Image.new("RGBA", (180, 180), (11, 13, 15, 255))
    mono_light = Image.open(mono_light_path)
    mono_resized = mono_light.resize((110, int(110 * h / w)), Image.Resampling.LANCZOS)
    apple_bg.paste(mono_resized, ((180 - 110) // 2, (180 - mono_resized.height) // 2), mono_resized)
    apple_bg.save(os.path.join(PUBLIC_DIR, "apple-icon.png"), "PNG")
    print("Favicons generated successfully!")

def process_photos():
    # 1. Glacier White Hero
    gw = Image.open(GLACIER_WHITE_FILE)
    gw.save(os.path.join(IMAGES_DIR, "project01-glacier-white.png"), "PNG")
    gw.save(os.path.join(IMAGES_DIR, "project01-glacier-white.webp"), "WEBP", quality=90)
    
    # 2. Naked Carbon Product Image (Vectorized tone adjustment)
    gw_arr = np.array(gw.convert("RGB"))
    r, g, b = gw_arr[:,:,0], gw_arr[:,:,1], gw_arr[:,:,2]
    
    # Detect frame paint: bright neutral pixels in lower 60% of image
    h, w, _ = gw_arr.shape
    y_mask = np.arange(h)[:, None] > (h * 0.35)
    is_bright_white = (r > 190) & (g > 195) & (b > 195) & (np.abs(r.astype(int) - g.astype(int)) < 20)
    is_frame = is_bright_white & y_mask
    
    nc_arr = gw_arr.copy()
    nc_arr[is_frame, 0] = (r[is_frame] * 0.16 + 20).astype(np.uint8)
    nc_arr[is_frame, 1] = (g[is_frame] * 0.17 + 22).astype(np.uint8)
    nc_arr[is_frame, 2] = (b[is_frame] * 0.19 + 26).astype(np.uint8)
    
    nc_img = Image.fromarray(nc_arr)
    nc_img = ImageEnhance.Brightness(nc_img).enhance(0.94)
    nc_img.save(os.path.join(IMAGES_DIR, "project01-naked-carbon.png"), "PNG")
    nc_img.save(os.path.join(IMAGES_DIR, "project01-naked-carbon.webp"), "WEBP", quality=90)
    
    # 3. Alpine Testing Image
    at = Image.open(ALPINE_TESTING_FILE)
    at.save(os.path.join(IMAGES_DIR, "project01-alpine-testing.png"), "PNG")
    at.save(os.path.join(IMAGES_DIR, "project01-alpine-testing.webp"), "WEBP", quality=90)
    
    # 4. Workshop Image
    ws = ImageEnhance.Brightness(at).enhance(0.85)
    ws = ImageEnhance.Contrast(ws).enhance(1.15)
    ws.save(os.path.join(IMAGES_DIR, "engineering-workshop.png"), "PNG")
    ws.save(os.path.join(IMAGES_DIR, "engineering-workshop.webp"), "WEBP", quality=90)
    
    # 5. OpenGraph Card
    og = gw.resize((1200, 675), Image.Resampling.LANCZOS).crop((0, 22, 1200, 652))
    og.save(os.path.join(PUBLIC_DIR, "og-image.png"), "PNG")
    print("Photographic assets processed successfully!")

if __name__ == "__main__":
    process_logo(LOGO_FILE, 
                 os.path.join(BRAND_DIR, "alkota-logo-dark.png"),
                 os.path.join(BRAND_DIR, "alkota-logo-light.png"))
    process_logo(MONOGRAM_FILE,
                 os.path.join(BRAND_DIR, "alkota-monogram-dark.png"),
                 os.path.join(BRAND_DIR, "alkota-monogram-light.png"))
    generate_favicons()
    process_photos()
    print("FAST ASSET PROCESSING COMPLETE!")
