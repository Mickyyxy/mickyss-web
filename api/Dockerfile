FROM php:8.2-fpm-alpine

# ติดตั้ง Extension สำหรับเชื่อมต่อ MySQL
RUN docker-php-ext-install pdo pdo_mysql mysqli

WORKDIR /var/www/html/api
COPY . .