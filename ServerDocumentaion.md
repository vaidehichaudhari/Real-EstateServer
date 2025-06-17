🏡 Real Estate Backend Documentation (MySQL)
Objective
Build a RESTful API to manage real estate properties with user authentication and admin authorization.

Technologies
Node.js, Express

MySQL with Sequelize ORM

bcryptjs (password hashing)

jsonwebtoken (JWT authentication)

multer (image uploads)

dotenv (env variables)
API Endpoints
Auth

POST /api/auth/register — Register user

POST /api/auth/login — Login user

Properties

GET /api/properties — List all properties

GET /api/properties/:id — Get property by ID

POST /api/properties — Create property (admin only)

PUT /api/properties/:id — Update property (admin only)

DELETE /api/properties/:id — Delete property (admin only)

GET /api/properties/search?query= — Search properties

Key Features
JWT-based user authentication and role-based authorization

Property CRUD operations with image upload via multer

Search properties by title, city, or description

Password hashing with bcrypt

MySQL database managed with Sequelize ORM

Running
Setup .env file

Run server with node app.js

Use API client to test endpoints
