from PIL import Image, ImageDraw

# Create a new image with transparent background
img = Image.new('RGBA', (500, 500), (0, 0, 0, 0))

# Create a draw object
draw = ImageDraw.Draw(img)

# Define the center coordinates and radius of the circle
center_x = 250
center_y = 250
radius = 240

# Draw a black circle with gradient fill
for y in range(center_y - radius, center_y + radius + 1):
    for x in range(center_x - radius, center_x + radius + 1):
        distance = ((x - center_x) ** 2 + (y - center_y) ** 2) ** 0.5
        intensity = int(255 * (1 - distance / radius))
        draw.point((x, y), fill=(0, 0, 0, intensity))

# Save the image
img.save('circle.png')
