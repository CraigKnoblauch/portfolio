from PIL import Image, ImageDraw
import sys
import subprocess
import os

# Usage: python cut_favicon.py input_image_path output_image_path
# Use this to cut a circular image from a square image
# 
# Run this command on the output to get a favicon: convert output_image_path public/favicon.ico

def create_circle_mask(size):
    """Create a circular mask for an image of given size."""
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=255)
    return mask

def apply_circle_mask(image):
    """Apply a circular mask to an image, making the outer area transparent."""
    size = image.size
    mask = create_circle_mask(size)
    result = image.copy()
    result.putalpha(mask)
    return result

def main():
    input_image_path = sys.argv[1]
    output_image_path = sys.argv[2]

    # Open the input image
    image = Image.open(input_image_path).convert("RGBA")

    # Ensure the image is square
    if image.size[0] != image.size[1]:
        raise ValueError("The input image must be square.")

    # Apply the circular mask
    result_image = apply_circle_mask(image)

    # Save the result
    result_image.save(output_image_path, "PNG")

    # Convert the output image to favicon.ico
    output_dir = os.path.dirname(output_image_path)
    favicon_path = os.path.join(output_dir, "favicon.ico")
    subprocess.run(["convert", output_image_path, favicon_path])

if __name__ == "__main__":
    main()
