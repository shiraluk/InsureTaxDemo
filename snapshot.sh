#!/bin/bash

# Check if a message was provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: ./snapshot.sh \"Your message here\""
    exit 1
fi

# Add all changes
git add .

# Create commit with timestamp
timestamp=$(date "+%Y-%m-%d %H:%M")
git commit -m "Snapshot $timestamp - $1"

# Push to remote
git push origin main

echo -e "\033[32mSnapshot saved and pushed successfully!\033[0m"
