# Social Media API

A RESTful social media API built with Node.js, Express, MongoDB, Mongoose, and JWT authentication.

The API allows users to register, sign in, create posts, publish posts, follow other users, like posts, and view a paginated feed of published content.

## Author

**Afolabi Segun**

## Features

- User registration and authentication
- JWT-based authentication with one-hour token expiration
- Password hashing with bcryptjs
- Create, update, publish, and delete posts
- Draft and published post states
- Public access to published posts
- Paginated post listings
- Search posts by title, content, or tags
- Filter posts by state when viewing your own posts
- Filter posts by author or tags
- Sort posts by like count, comment count, or timestamp
- Follow and unfollow users
- View followers and followed users
- Like and unlike posts
- Prevention of duplicate likes
- Prevention of duplicate follows
- Prevention of self-following
- Author information included with posts
- API error handling
- Automated endpoint tests

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- Jest
- Supertest
- MongoDB Memory Server
- Helmet
- CORS
- Morgan

## Project Structure

```text
social-media-api/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── follow.controller.js
│   │   ├── post.controller.js
│   │   └── user.controllers.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── follow.js
│   │   ├── like.js
│   │   └── post.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── follow.routes.js
│   │   ├── post.routes.js
│   │   └── user.routes.js
│   └── utils/
│       ├── generateToken.js
│       └── pagination.js
├── scripts/
│   └── ensure-mongo.js
├── tests/
│   ├── auth.test.js
│   ├── follows.test.js
│   ├── likes.test.js
│   ├── post.test.js
│   └── setup.js
├── .gitignore
├── package-lock.json
├── package.json
├── render.yaml
└── README.md
```

> **Important:** Model filenames are case-sensitive. The repository uses `User.js`, `post.js`, `follow.js`, and `like.js`. Imports must use the same capitalization, especially when deploying to Linux-based hosts such as Render.

## Environment Variables

Create a `.env` file for local development:

```env
MONGO_URI=mongodb://127.0.0.1:27017/social_media_api
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
```

Do not commit `.env` or real credentials to the repository.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

The local API is available at `http://localhost:5000` unless a different `PORT` is configured.

Check the health endpoint:

```text
GET /api/health
```

Expected response:

```json
{"status":"ok"}
```

## Testing

Run the automated tests with:

```bash
npm test
```

The test suite uses MongoDB Memory Server and does not require a local MongoDB database.

## Render Deployment

This project includes a `render.yaml` configuration for deployment as a Node.js web service.

Use these Render settings if configuring the service manually:

- **Runtime:** Node
- **Build command:** `npm install`
- **Start command:** `node src/server.js`
- **Health check path:** `/api/health`
- **Branch:** `main`

Add these environment variables in the Render dashboard:

```text
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=<long-random-secret>
```

Render provides the `PORT` variable automatically. The application uses it and falls back to port `5000` for local development.

Use MongoDB Atlas or another hosted MongoDB provider in production. The local `scripts/ensure-mongo.js` helper is intended for a Windows development environment and must not be used to run MongoDB on Render.

After deployment, verify the service with:

```text
https://<your-render-service>.onrender.com/api/health
```

If Render reports `Cannot find module` for a model, check the import capitalization and redeploy the latest commit from the `main` branch. Linux file systems are case-sensitive.

## API Routes

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/signin`

### Posts

- `GET /api/posts`
- `GET /api/posts/:id`
- `GET /api/posts/mine`
- `POST /api/posts`
- `PATCH /api/posts/:id`
- `POST /api/posts/:id/publish`
- `DELETE /api/posts/:id`
- `POST /api/posts/:id/like`
- `DELETE /api/posts/:id/like`

### Follows

- `GET /api/follows`
- `GET /api/follows/followers`
- `POST /api/follows/:userId`
- `DELETE /api/follows/:userId`

Protected routes require an authorization header:

```text
Authorization: Bearer <jwt-token>
```
