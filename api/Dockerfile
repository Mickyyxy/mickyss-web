FROM php:8.2-apache

RUN a2enmod rewrite

# คัดลอกไฟล์ทั้งหมดลง Web Root
COPY . /var/www/html/

# กำหนดให้ Apache เรียก index.php เป็นหน้าแรกเสมอ
RUN echo "DirectoryIndex index.php index.html" > /var/www/html/.htaccess

EXPOSE 80