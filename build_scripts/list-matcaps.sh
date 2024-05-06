#!/bin/bash

# Define the directory path
directory="public/matcaps"

# Print the JavaScript array for each png file in the directory
echo "export const matcapImages = ["
for file in "$directory"/*.png; do
    filename=$(basename "$file")
    echo "  '$filename',"
done
echo "];"