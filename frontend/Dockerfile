# Этап сборки — собираем React/Other фронтенд
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Финальный образ — nginx для обслуживания статических файлов
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Можно дополнительно настроить nginx if нужно
# Например, скопировать свой конфиг
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80