# Webhook API

A TypeScript-based webhook API built with Fastify, Redis, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Redis Server
- Fastify

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
 ```bash
HOST=localhost
REDIS_HOST=localhost
REDIS_PORT=6379

MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=debuz

JWT_SECRET=supersecret

PORT=3000
HOTS=localhost
   ```

4. Set up the database:
   ```bash
   mysql -u root -p < src/public/debuz.sql
   ```

## Run

Run the Run server:
```bash
cd webhook
npm run dev
cd reciever
npm run dev
```





## Features

- JWT Authentication
- Redis caching for quick access to webhook data
- MySQL persistence for long-term storage
- TypeScript for type safety
- Fastify for high performance
- Environment variable configuration 