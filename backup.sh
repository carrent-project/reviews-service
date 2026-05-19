#!/bin/bash

BACKUP_DIR="$(dirname "$0")/.backups"
mkdir -p "$BACKUP_DIR"

docker exec -t reviews_db pg_dump -U postgres reviews_db > "$BACKUP_DIR/reviews_db_$(date +%Y%m%d_%H%M%S).sql"

echo "✅ Reviews DB backup saved to $BACKUP_DIR"
