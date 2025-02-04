FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

ENV PORT=3000

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT}/health || exit 1

CMD ["node", "server.js"]