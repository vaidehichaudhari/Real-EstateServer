🏡 Real Estate Backend API Documentation (MySQL)
Objective
Build a RESTful API to manage real estate properties with user authentication and admin authorization.

Technologies
Node.js, Express

MySQL with Sequelize ORM

bcryptjs (password hashing)

jsonwebtoken (JWT authentication)

multer (image uploads)

dotenv (environment variables)

API Endpoints
Auth
POST /api/auth/register — Register a new user

POST /api/auth/login — User login (returns JWT)

Properties
GET /api/properties — List all properties

GET /api/properties/:id — Get property by ID

POST /api/properties — Create a property (admin only)

PUT /api/properties/:id — Update a property (admin only)

DELETE /api/properties/:id — Delete a property (admin only)

GET /api/properties/search?query= — Search properties by title, city, or description

Inquiry
GET /api/inquiries — Get all inquiries (admin only)

GET /api/inquiries/:id — Get inquiry details by ID

POST /api/inquiries — Create an inquiry (from users/customers)

Key Features
JWT-based user authentication and role-based authorization

CRUD operations for properties with image upload using multer

Search properties by title, city, or description

Password hashing with bcryptjs for secure passwords

MySQL database managed through Sequelize ORM

Inquiries management linked to properties (new feature)
