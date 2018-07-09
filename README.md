# Collective Blog Node
Простой коллективный блог по типу habrahabr.ru, реализованный на платформе Node.js

## Используемые технологии

* bcrypt v2.0.1
* body-parser v1.18.3
* ejs v2.6.1
* express v4.16.3
* express-session v1.15.6
* joi v13.4.0
* moment v2.22.2
* Node.js v8.9
* passport v0.4.0
* passport-local v1.0.0
* pg v7.4.3
* PostgreSQL v9.6.2
* sanitize-html v1.18.2
* sequelize v4.38.0

## Установка

Клонируйте репозиторий и установите зависимости.

```bash
https://github.com/SlayerDF/CollectiveBlogNode.git
cd CollectiveBlogNode
```

```bash
npm install
```

Установите foreman

```bash
sudo apt install ruby
sudo gem install foreman
```

Установите docker-compose отсюда https://github.com/docker/compose/releases

Примените миграции базы данных

```bash
docker-compose up
foreman run sequelize db:migrate
```

## Запуск

Для запуска сервера

```bash
docker-compose up
foreman start
```

Проект будет доступен по адресу http://localhost
