#!/bin/bash

# Kilo Code Module for Supabase CLI via Docker

# Configuration
SUPABASE_CLI_VERSION="1.150.0" # Pin the Supabase CLI version
DOCKER_IMAGE_NAME="supabase-cli"
DOCKERFILE_PATH="./supabase-cli-docker/Dockerfile"
PROJECT_PATH="$(pwd)" # Default to current working directory

# Binary integrity check (optional)
# SUPABASE_CLI_SHA256="<sha256_hash_of_supabase_cli_binary>"

log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to check if Docker is running
check_docker() {
  docker info > /dev/null 2>&1
  if [ $? -ne 0 ]; then
    log "ERROR: Docker is not running or not installed. Please start Docker."
    return 1
  fi
  return 0
}

# Function to build the Docker image
build_docker_image() {
  log "Building Docker image '$DOCKER_IMAGE_NAME'..."
  docker build -t $DOCKER_IMAGE_NAME $DOCKERFILE_PATH
  if [ $? -ne 0 ]; then
    log "ERROR: Failed to build Docker image."
    return 1
  fi
  log "Docker image '$DOCKER_IMAGE_NAME' built successfully."
  return 0
}

# Function to run Supabase CLI via Docker
run_supabase_cli_docker() {
  log "Running Supabase CLI command via Docker: supabase $@"
  docker run --rm -it -v "$PROJECT_PATH:/app" $DOCKER_IMAGE_NAME "$@"
  if [ $? -ne 0 ]; then
    log "ERROR: Supabase CLI command failed via Docker."
    return 1
  fi
  log "Supabase CLI command completed successfully via Docker."
  return 0
}

# Main execution logic
main() {
  if ! check_docker; then
    log "Attempting fallback to remote execution (not implemented in this example)."
    # Here you would add logic for remote execution if Docker fails
    exit 1
  fi

  if ! docker images -q $DOCKER_IMAGE_NAME | grep -q .; then
    build_docker_image
    if [ $? -ne 0 ]; then
      exit 1
    fi
  fi

  run_supabase_cli_docker "$@"
}

main "$@"