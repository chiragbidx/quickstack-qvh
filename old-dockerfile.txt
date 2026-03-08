FROM node:20

WORKDIR /app

RUN corepack enable \
  && apt-get update \
  && apt-get install -y git \
  && rm -rf /var/lib/apt/lists/*

# Copy app source (no .git expected)
COPY . .

# Install deps
RUN pnpm install

EXPOSE 8080

CMD ["node", "scripts/dev-supervisor.js"]
