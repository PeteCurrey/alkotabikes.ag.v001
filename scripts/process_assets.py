import os
import sys
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

MEDIA_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/Media"
PUBLIC_DIR = "/Users/petercurrey/Desktop/ALKOTA Cycles/public"
BRAND_DIR = os.path.join(PUBLIC_DIR, "brand")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")

os.makedirs(BRAND_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

# File mappings
LOGO_FILE = os.path.join(MEDIA_DIR, "ChatGPT Image Aug 8, 2026, 04_46_07 PM (1).png")
MONOGRAM_FILE = os.path.join(MEDIA_DIR, "ChatGPT Image Aug 8, 2026, 04_46_08 PM (2).png")
GLACIER_WHITE_FILE = os.path.join(MEDIA_DIR, "ChatGPT Image Aug 8, 2026, 04_46_08 PM (3).png")
ALPINE_TESTING_FILE = os.path.join(MEDIA_DIR, "ChatGPT Image Aug 8, 2026, 04_46_11 PM (6).png")

def make_transparent_logo(img_path, output_dark, output_light, crop_margin=20):
    img = Image.open(img_path).convert("RGBA")
    
    # Calculate bounding box of non-white pixels
    # Find background white pixels (R > 240, G > 240, B > 240)
    datas = img.getdata()
    
    new_dark_data = []
    new_light_data = []
    
    # Determine bounding box
    width, height = img.size
    min_x, min_y, max_x, max_y = width, height, 0, 0
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            # Check if pixel is dark text/graphics
            if r < 200 or g < 200 or b < 200:
                min_x = min(min_x, x)
                max_x = max(max_x, x)
                min_y = min(min_y, y)
                max_y = max(max_y, y)
                
    # Add margin
    min_x = max(0, min_x - crop_margin)
    min_y = max(0, min_y - crop_margin)
    max_x = min(width, max_x + crop_margin)
    max_y = min(height, max_y + crop_margin)
    
    cropped = img.crop((min_x, min_y, max_x, max_y))
    c_width, c_height = cropped.size
    
    dark_img = Image.new("RGBA", (c_width, c_height), (0, 0, 0, 0))
    light_img = Image.new("RGBA", (c_width, c_height), (0, 0, 0, 0))
    
    for y in range(c_height):
        for x in range(c_width):
            r, g, b, a = cropped.getpixel((x, y))
            # Lum calculation (0 = black, 255 = white)
            lum = int(0.299 * r + 0.587 * g + 0.114 * b)
            # Alpha is inverse of luminance (black text -> full opacity alpha 255)
            alpha = max(0, min(255, int((255 - lum) * 1.15)))
            
            if alpha > 5:
                # Dark version: deep graphite/black #050607
                dark_img.putpixel((x, y), (5, 6, 7, alpha))
                # Light version: pure white #FFFFFF
                light_img.putpixel((x, y), (255, 255, 255, alpha))
                
    dark_img.save(output_dark, "PNG")
    light_img.save(output_light, "PNG")
    print(f"Saved: {output_dark} and {output_light}")

def process_monogram_and_favicons(mono_path):
    output_dark = os.path.join(BRAND_DIR, "alkota-monogram-dark.png")
    output_light = os.path.join(BRAND_DIR, "alkota-monogram-light.png")
    make_transparent_logo(mono_path, output_dark, output_light, crop_margin=15)
    
    # Generate favicons from monogram
    mono_img = Image.open(output_dark)
    
    # Square padding container for clean favicon rendering
    w, h = mono_img.size
    side = max(w, h) + 20
    square_dark = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square_dark.paste(mono_img, ((side - w) // 2, (side - h) // 2))
    
    # Save icon files
    favicon_32 = square_dark.resize((32, 32), Image.Resampling.LANCZOS)
    favicon_32.save(os.path.join(PUBLIC_DIR, "icon.png"), "PNG")
    favicon_32.save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO", sizes=[(32, 32)])
    
    apple_180 = square_dark.resize((180, 180), Image.Resampling.LANCZOS)
    # Add subtle carbon dark background for apple touch icon
    apple_bg = Image.new("RGBA", (180, 180), (11, 13, 15, 255))
    mono_light = Image.open(output_light)
    mono_light_resized = mono_light.resize((120, int(120 * h / w)), Image.Resampling.LANCZOS)
    apple_bg.paste(mono_light_resized, (30, (180 - mono_light_resized.height) // 2), mono_light_resized)
    apple_bg.save(os.path.join(PUBLIC_DIR, "apple-icon.png"), "PNG")
    print("Favicons generated successfully!")

def process_bike_images():
    # 1. Glacier White Hero
    gw_src = Image.open(GLACIER_WHITE_FILE)
    gw_out = os.path.join(IMAGES_DIR, "project01-glacier-white.png")
    gw_src.save(gw_out, "PNG")
    gw_src.save(os.path.join(IMAGES_DIR, "project01-glacier-white.webp"), "WEBP", quality=92)
    print(f"Saved Glacier White hero: {gw_out}")
    
    # 2. Naked Carbon Variant (Studio dark render based on Project 01 frame geometry)
    nc_img = Image.open(GLACIER_WHITE_FILE).convert("RGB")
    # Tone white frame to dark carbon weave graphite while preserving Maxxis tan-walls and Fox fork
    # Process pixels: where bike frame is bright white/light grey, convert tone to dark matte carbon #1A1D20
    width, height = nc_img.size
    nc_proc = Image.new("RGB", (width, height))
    
    for y in range(height):
        for x in range(width):
            r, g, b = nc_img.getpixel((x, y))
            # Frame area detection: bright neutral white/grey frame pixels
            is_frame = (r > 200 and g > 205 and b > 205) and (abs(r - g) < 15 and abs(g - b) < 15)
            # Avoid background sky (upper half with blue tint)
            is_sky = (y < height * 0.45) and (b > r + 15)
            
            if is_frame and not is_sky:
                # Convert white frame paint to dark naked carbon tone (~0.2x brightness + subtle cool carbon tint)
                nc_proc.putpixel((x, y), (int(r * 0.15 + 18), int(g * 0.16 + 20), int(b * 0.18 + 24)))
            else:
                nc_proc.putpixel((x, y), (r, g, b))
                
    # Darken overall studio background slightly for dark carbon product presentation
    enhancer = ImageEnhance.Brightness(nc_proc)
    nc_proc_dark = enhancer.enhance(0.92)
    
    nc_out = os.path.join(IMAGES_DIR, "project01-naked-carbon.png")
    nc_proc_dark.save(nc_out, "PNG")
    nc_proc_dark.save(os.path.join(IMAGES_DIR, "project01-naked-carbon.webp"), "WEBP", quality=92)
    print(f"Saved Naked Carbon product image: {nc_out}")

    # 3. Alpine Field Testing / Riding Image
    at_src = Image.open(ALPINE_TESTING_FILE)
    at_out = os.path.join(IMAGES_DIR, "project01-alpine-testing.png")
    at_src.save(at_out, "PNG")
    at_src.save(os.path.join(IMAGES_DIR, "project01-alpine-testing.webp"), "WEBP", quality=92)
    print(f"Saved Alpine Testing image: {at_out}")
    
    # 4. Engineering Workshop Image
    # Create dark controlled workshop environment composition
    ws_img = at_src.copy()
    ws_dark = ImageEnhance.Color(ws_img).enhance(0.7)
    ws_dark = ImageEnhance.Brightness(ws_dark).enhance(0.85)
    ws_dark = ImageEnhance.Contrast(ws_dark).enhance(1.15)
    ws_out = os.path.join(IMAGES_DIR, "engineering-workshop.png")
    ws_dark.save(ws_out, "PNG")
    ws_dark.save(os.path.join(IMAGES_DIR, "engineering-workshop.webp"), "WEBP", quality=92)
    print(f"Saved Engineering Workshop image: {ws_out}")
    
    # 5. OpenGraph Social Card (1200x630)
    og_base = gw_src.resize((1200, 675), Image.Resampling.LANCZOS)
    # Crop center to 1200x630
    og_card = og_base.crop((0, 22, 1200, 652))
    og_out = os.path.join(PUBLIC_DIR, "og-image.png")
    og_card.save(og_out, "PNG")
    print(f"Saved OpenGraph card: {og_out}")

if __name__ == "__main__":
    print("Processing primary logo...")
    make_transparent_logo(LOGO_FILE, 
                          os.path.join(BRAND_DIR, "alkota-logo-dark.png"), 
                          os.path.join(BRAND_DIR, "alkota-logo-light.png"))
    print("Processing monogram...")
    process_monogram_and_favicons(MONOGRAM_FILE)
    print("Processing bike imagery...")
    process_bike_images()
    print("ALL ASSETS PROCESSED SUCCESSFULLY!")
