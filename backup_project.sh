#!/bin/bash

# Wanderlust Project Backup Script
# This script creates a complete backup of your project

echo "🏠 Wanderlust Project Backup Script"
echo "=================================="

# Get current date for backup naming
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="wanderlust_backup_$DATE"

echo "📁 Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

echo "📋 Copying project files..."
# Copy all project files except node_modules and .git
rsync -av --exclude='node_modules' --exclude='.git' --exclude='*.log' . "$BACKUP_DIR/"

echo "📦 Creating compressed backup..."
tar -czf "${BACKUP_DIR}.tar.gz" "$BACKUP_DIR"

echo "🗑️ Cleaning up temporary directory..."
rm -rf "$BACKUP_DIR"

echo "✅ Backup completed successfully!"
echo "📁 Backup file: ${BACKUP_DIR}.tar.gz"
echo "💾 Size: $(du -h "${BACKUP_DIR}.tar.gz" | cut -f1)"

echo ""
echo "🔄 To restore from backup:"
echo "   tar -xzf ${BACKUP_DIR}.tar.gz"
echo "   cd ${BACKUP_DIR}"
echo "   npm install"
echo "   node app.js"
