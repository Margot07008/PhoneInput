# Возьмите базовый образ
FROM node:14.15.4 as builder

# задайте рабочую директорию
WORKDIR /code

# копирование файлов в корневую дерикторию
COPY package.json .
COPY yarn.lock .
COPY webpack.config.js .
COPY babel.config.js .
COPY tsconfig.json .

# установка всяких штук
RUN yarn install

COPY src src
COPY public public

RUN yarn run build

FROM nginx:alpine

COPY --from=builder /code/public/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 80