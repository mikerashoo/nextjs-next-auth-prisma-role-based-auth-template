#!/bin/bash

# Paths 
BACKEND_SCHEMA_PATH="../getway-games-api/src/utils/shared" 
SHARED_TYPES_SHARED_DIR="./utils/shared"

# Create the target directory if it doesn't exist
mkdir -p $SHARED_TYPES_SHARED_DIR

# Copy the extended types to the shared types directory
cp -r $BACKEND_SCHEMA_PATH/* $SHARED_TYPES_SHARED_DIR/

# Find and replace '@prisma/client' with './prisma-enums' in all TypeScript files
find $SHARED_TYPES_SHARED_DIR -type f -name "*.ts" -exec sed -i '' 's/@prisma\/client/.\/prisma-enums/g' {} +

# Find the prisma-models.ts file and replace ':Date' with the desired string
find $SHARED_TYPES_SHARED_DIR -type f -name "prisma-models.ts" -exec sed -i '' 's/:Date/REPLACE_STRING/g' {} +

echo "Files in $SHARED_TYPES_SHARED_DIR have been updated."
