# ---- Stage 1: Build ----
FROM node:20-bookworm AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

RUN npm prune --omit=dev

# ---- Stage 2: Production ----
FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/* && \
    addgroup --system --gid 1001 node || true && \
    adduser --system --uid 1001 node || true

WORKDIR /usr/src/app

COPY package.json ./

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 4000

CMD [ "sh", "-c", "npx prisma migrate deploy && npm run start" ]