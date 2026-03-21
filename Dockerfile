FROM docker.io/library/node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM docker.io/library/busybox:1.36.1

WORKDIR /site

COPY --from=builder /app/dist ./

EXPOSE 8080

CMD ["httpd", "-f", "-v", "-p", "8080", "-h", "/site"]
