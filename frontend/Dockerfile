FROM node:20-alpine AS builder
WORKDIR /var/www/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM alpine:latest
COPY --from=builder /var/www/app/dist /dist