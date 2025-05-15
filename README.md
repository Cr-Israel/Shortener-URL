# Short URL

A modern URL shortener service built with React and Fastify.

## Overview
This is a full-stack URL shortener application that allows users to create shortened versions of long URLs. The project consists of a React frontend for the user interface and a Fastify backend API that handles URL processing and storage.

## Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Vite
- ESLint for code quality

### Backend:
- Node.js with TypeScript
- Fastify framework
- Prisma ORM
- MongoDB database
- Zod for validation

## Project Structure
```
.
├── frontend/          # React frontend application
│   ├── src/          # Source files
│   └── public/       # Static assets
│
└── backend/          # Fastify backend API
    ├── src/         # Source files
    │   ├── controllers/
    │   ├── routes/
    │   └── lib/
    └── prisma/      # Database schema and migrations
```

## Features
- Shorten long URLs to manageable links
- Redirect service for shortened URLs
- MongoDB integration for URL storage
- Clean and responsive user interface

## Getting Started

### Prerequisites
- Node.js
- pnpm (Package Manager)
- MongoDB instance

### Installation

1. Clone the repository
```bash
git clone [https://github.com/Cr-Israel/Shortener-URL]
cd short-url
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with:
```
DATABASE_URL="your-mongodb-connection-string"
```

4. Start the development servers
```bash
# For backend
cd backend
pnpm dev

# For frontend
cd frontend
pnpm dev
```

## License
ISC

## Author
[Carlos Israel]

