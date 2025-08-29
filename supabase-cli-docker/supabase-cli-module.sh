#!/bin/bash

# Define CLI version
SUPABASE_CLI_VERSION="v2.39.2"

# Build image
docker build -t supabase-cli --build-arg SUPABASE_CLI_VERSION=${SUPABASE_CLI_VERSION} .

# Run CLI command
docker run --rm -it \
  -v "$(pwd):/app" \
  -w /app \
  supabase-cli "$@"