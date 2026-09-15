# Social Media API

A RESTful social media API built with Node.js, Express, MongoDB, Mongoose, and JWT authentication.

The API allows users to register, sign in, create posts, publish posts, follow other users, like posts, and view a paginated feed of published content.

## Author

**Afolabi Segun**

## Features

- User registration and authentication
- JWT-based authentication
- JWT expiration after one hour
- Password hashing with bcrypt
- Create, update, publish, and delete posts
- Draft and published post states
- Public access to published posts
- Paginated post listings
- Search posts by title, content, author, or tags
- Filter posts by state
- Sort posts by:
  - Like count
  - Comment count
  - Timestamp
- Follow and unfollow users
- View followers and followed users
- Like and unlike posts
- Prevention of duplicate likes
- Prevention of duplicate follows
- Prevention of self-following
- Author information included with posts
- Input validation
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
│   │   ├── post.controller.js
│   │   └── follow.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── validate.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Follow.js
│   │   └── Like.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── post.routes.js
│   │   └── follow.routes.js
│   └── utils/
├── tests/
│   ├── auth.test.js
│   ├── posts.test.js
│   ├── follows.test.js
│   └── likes.test.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
