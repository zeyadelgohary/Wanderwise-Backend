# Wanderwise Backend

Wanderwise is a backend API built with Node.js, Express, TypeScript, and MongoDB, designed to support a travel recommendation and trip management platform. It provides endpoints for user authentication, trip item management, ratings, leaderboards, and user submissions, with data integration from various sources including Excel and CSV files.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Data Files](#data-files)
- [Development Notes](#development-notes)

---

## Features
- **User Authentication**: Signup and login with JWT-based authentication.
- **Trip Items**: Query, filter, and retrieve trip items (activities, food, stays) with weighted moods and ratings.
- **Ratings**: Submit and fetch ratings for trips and items.
- **Leaderboard**: Track and retrieve user or item leaderboards.
- **User Profiles**: Manage user profiles, preferences, likes, and trip history.
- **Submissions**: Submit and retrieve user-generated content (e.g., audio, comments).
- **Data Seeding**: Utilities for seeding data from Excel/CSV files.

## Project Structure
```
Wanderwise/
├── src/
│   ├── appRouter.ts
│   ├── index.ts
│   ├── auth/
│   ├── leaderboard/
│   ├── submissions/
│   ├── tripItems/
│   ├── triprating/
│   ├── trips/
│   ├── users/
│   └── utils/
├── all-items-categorized.xlsx
├── users-interactions-with-topWeighted-items.xlsx
├── users-ratings.csv
├── package.json
├── tsconfig.json
└── ...
```

## Installation
1. **Clone the repository**
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Set up environment variables** (see below).
4. **Build the project**:
   ```sh
   npm run build
   ```
5. **Start the server**:
   ```sh
   npm start
   ```
   Or for development with hot-reload:
   ```sh
   npm run dev
   ```


## Scripts
- `npm run dev` — Start server with nodemon (development)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run compiled server

## API Endpoints

### Auth
- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login and receive JWT

### Users
- `GET /users/:id` — Get user profile
- `PATCH /users/:id` — Update user profile
- `POST /users/likes/:id` — Like an item
- `POST /users/preferences/:id` — Update user preferences
- `POST /users/trips` — Create a trip
- `PUT /users/trips/:tripId` — Update a trip
- `PATCH /users/trips/:tripId` — Add items to a trip

### Trip Items
- `GET /tripItems` — Query trip items (filter, sort, paginate)
- `GET /tripItems/:id` — Get trip item by ID (with similar items)

### Trip Ratings
- `POST /tripRatings` — Submit a rating
- `GET /tripRatings` — Get all ratings

### Leaderboard
- `POST /leaderboard` — Add/update player
- `GET /leaderboard` — Get leaderboard

### Submissions
- `POST /submissions` — Submit user content
- `GET /submissions` — Get all submissions

## Data Files
- `all-items-categorized.xlsx` — Source data for trip items
- `users-interactions-with-topWeighted-items.xlsx` — User-item interaction data
- `users-ratings.csv` — User ratings for trips/items
- `src/GP_Data_toAPI.csv` — Additional trip item data

## Development Notes
- **TypeScript**: All source code is written in TypeScript (`src/`).
- **MongoDB**: Uses Mongoose for schema and data modeling.
- **Seeding Data**: Utilities in `src/utils/seedExcelTripItems.ts` can be used to seed the database from Excel/CSV files.
- **Error Handling**: Centralized error handling via `GlobalErrorHandler` and custom `AppError` class.
- **Async Handling**: All controllers use an `AsyncWrapper` for error-safe async/await.
- **CORS**: Enabled for all routes.

## License
ISC

---
