FROM debian:bullseye-slim

ARG SUPABASE_CLI_VERSION
RUN apt-get update && apt-get install -y curl file bash && \
    curl -L https://github.com/supabase/cli/releases/download/${SUPABASE_CLI_VERSION}/supabase-linux-x64 -o /usr/local/bin/supabase && \
    chmod +x /usr/local/bin/supabase

ENTRYPOINT ["/bin/sh", "-c", "supabase"]