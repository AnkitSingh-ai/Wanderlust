#!/bin/bash

# Wanderlust Project Restore Script
# This script helps restore the project from a backup

echo "🏠 Wanderlust Project Restore Script"
echo "==================================="

if [ $# -eq 0 ]; then
    echo "❌ Error: Please provide the backup file name"
    echo "Usage: ./restore_project.sh <backup_file.tar.gz>"
    echo ""
    echo "Example: ./restore_project.sh wanderlust_backup_20241201_143022.tar.gz"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Error: Backup file '$BACKUP_FILE' not found"
    exit 1
fi

echo "📦 Extracting backup file: $BACKUP_FILE"
tar -xzf "$BACKUP_FILE"

# Get the extracted directory name
EXTRACTED_DIR=$(tar -tzf "$BACKUP_FILE" | head -1 | cut -f1 -d"/")

echo "📁 Extracted to directory: $EXTRACTED_DIR"
echo "📋 Installing dependencies..."
cd "$EXTRACTED_DIR"
npm install

echo "✅ Project restored successfully!"
echo ""
echo "🚀 To start the application:"
echo "   cd $EXTRACTED_DIR"
echo "   node app.js"
echo ""
echo "🌐 Then visit: http://localhost:8080"
echo ""
echo "💡 For development with auto-restart:"
echo "   nodemon app.js"
