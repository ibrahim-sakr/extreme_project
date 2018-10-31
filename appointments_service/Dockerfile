FROM php:7.2

RUN apt-get update -y && apt-get install -y openssl zip unzip git; \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer; \
    docker-php-ext-install pdo pdo_mysql mbstring; \
    docker-php-ext-enable pdo pdo_mysql mbstring

WORKDIR /app

COPY . /app

RUN composer install; \
    rm .env; \
    cp .env.example .env

CMD ["php", "-S", "127.0.0.1:7071", "-t", "public"]
