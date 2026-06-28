FROM node:20-alpine AS builder
WORKDIR /var/www/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /var/www/app

COPY --from=builder /var/www/app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /var/www/app/dist ./dist
COPY --from=builder /var/www/app/public ./public

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]