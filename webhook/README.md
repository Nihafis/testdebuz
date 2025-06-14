# Webhook API

A TypeScript-based webhook API built with Fastify, Redis, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Redis Server

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   HOST=localhost
   JWT_SECRET=your-super-secret-key
   JWT_EXPIRES_IN=1h
   REDIS_HOST=localhost
   REDIS_PORT=6379
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your-password
   MYSQL_DATABASE=webhook_db
   ```

4. Set up the database:
   ```bash
   mysql -u root -p < src/schema.sql
   ```

## Development

Run the development server:
```bash
npm run dev
```

## Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### POST /webhook
Send a webhook event.

Headers:
```
Authorization: Bearer <your-jwt-token>
```

Request body:
```json
{
  "event": "user.created",
  "data": {
    "userId": "123",
    "email": "user@example.com"
  },
  "timestamp": "2023-12-01T12:00:00Z"
}
```

### GET /webhooks
Retrieve the latest webhooks.

Headers:
```
Authorization: Bearer <your-jwt-token>
```

## Features

- JWT Authentication
- Redis caching for quick access to webhook data
- MySQL persistence for long-term storage
- TypeScript for type safety
- Fastify for high performance
- Environment variable configuration 