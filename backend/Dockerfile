FROM webdevops/php-nginx:8.3-alpine

# Installation des dépendances
RUN apk add oniguruma-dev libxml2-dev
RUN docker-php-ext-install \
        bcmath \
        ctype \
        fileinfo \
        mbstring \
        pdo_mysql \
        xml

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuration du répertoire web
ENV WEB_DOCUMENT_ROOT=/app/public
ENV APP_ENV=production
WORKDIR /app

# Copie des fichiers du projet
COPY . .

# Configuration de l'application
RUN cp -n .env.example .env
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Optimisation de Laravel
RUN php artisan key:generate
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Permissions
RUN chown -R application:application .

# Ajout de la configuration PHP personnalisée
RUN echo "memory_limit=512M" > /usr/local/etc/php/conf.d/custom.ini
RUN echo "max_execution_time=60" >> /usr/local/etc/php/conf.d/custom.ini 