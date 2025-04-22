#!/bin/bash
set -e

REPO="next-nest-template"
REPO_PATH="$HOME/$REPO"

cd $REPO_PATH || exit 1

echo "Pulling the latest changes from the repository..."
if ! sudo git pull; then
    echo "Failed to pull latest changes"
    exit 1
fi

echo "Building and deploying services using Docker Compose with Bake..."
export COMPOSE_BAKE=true
if ! sudo -E docker compose up --build -d; then
    echo "Failed to build and deploy services"
    exit 1
fi