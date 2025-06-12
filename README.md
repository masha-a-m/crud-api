# Simple RESTful API with Express.js

## Absolutely! Below is a **complete and professional `README.md`** file that covers:

- Project overview
- Prerequisites
- Setup instructions (database + server)
- API documentation (endpoints, request examples, responses)
- How to test with Postman or curl
- Deployment notes (optional)

---

# 📚 MySQL CRUD API - User Management

A simple Express.js API for managing users using a MySQL database. It supports basic **CRUD operations** (Create, Read, Update, Delete) and is ideal for beginners learning how to build RESTful APIs.

---

## 🧾 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
   - [Database Setup](#database-setup)
   - [Install Dependencies](#install-dependencies)
   - [Environment Variables](#environment-variables)
   - [Run the Server](#run-the-server)
4. [API Documentation](#api-documentation)
5. [Testing the API](#testing-the-api)
6. [Optional: Deploy Your API](#optional-deploy-your-api)
7. [Contributing](#contributing)
8. [License](#license)

---

## 📦 Overview

This project provides a RESTful API for managing user data in a MySQL database. It uses:
- **Express.js** for the web framework
- **MySQL** as the database
- **mysql2** for database connection
- **Node.js** runtime environment

---

## 🛠 Prerequisites

Before running this project, ensure you have the following installed:

- ✅ [Node.js](https://nodejs.org/) (v16+ recommended)
- ✅ [MySQL](https://dev.mysql.com/downloads/installer/)
- ✅ A tool like [Postman](https://www.postman.com/) or `curl` for testing API endpoints
- ✅ Basic knowledge of SQL and terminal commands

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mysql-crud-api.git
cd mysql-crud-api
```

### 2. Install dependencies

```bash
npm install
```

This installs:
- `express`: Web framework
- `mysql2`: MySQL client with promise support
- (Optional) `dotenv`: For loading environment variables

---

### 3. Database Setup

You need to create a MySQL database and table before running the app.

#### a. Access MySQL

```bash
mysql -u root -p
```

#### b. Create database and table

Run these SQL commands inside MySQL:

```sql
CREATE DATABASE IF NOT EXISTS crud_api;

USE crud_api;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> This creates a `users` table with fields for ID, name, email, and timestamp.

---

### 4. Environment Variables

Create a `.env` file in your project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=crud_api
PORT=3000
```

Update the values to match your MySQL credentials.

---

### 5. Run the Server

Start the server:

```bash
node index.js
```

You should see:

```
Server running on http://localhost:3000
Database connected: 2
```

---

## 🌐 API Documentation

Below are all available API endpoints.

### 🔹 GET /users – Get All Users

- **Method**: `GET`
- **URL**: `http://localhost:3000/users`
- **Response**:

```json
[
  {
    "id": 1,
    "name": "Alice Smith",
    "email": "alice@example.com",
    "created_at": "2025-04-05T12:34:56.000Z"
  }
]
```

---

### 🔹 GET /users/:id – Get User by ID

- **Method**: `GET`
- **URL**: `http://localhost:3000/users/1`
- **Response**:

```json
{
  "id": 1,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "created_at": "2025-04-05T12:34:56.000Z"
}
```

---

### 🔹 POST /users – Create a New User

- **Method**: `POST`
- **URL**: `http://localhost:3000/users`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:

```json
{
  "name": "Bob Johnson",
  "email": "bob@example.com"
}
```

- **Response**:

```json
{
  "id": 2,
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "created_at": "2025-04-05T12:35:00.000Z"
}
```

---

### 🔹 PUT /users/:id – Update an Existing User

- **Method**: `PUT`
- **URL**: `http://localhost:3000/users/1`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

- **Response**:

```json
{
  "id": 1,
  "name": "Updated Name",
  "email": "updated@example.com",
  "created_at": "2025-04-05T12:34:56.000Z"
}
```

---

### 🔹 DELETE /users/:id – Delete a User

- **Method**: `DELETE`
- **URL**: `http://localhost:3000/users/1`
- **Response**:

```json
{
  "message": "User deleted successfully"
}
```

---

## 🧪 Testing the API

You can use any of the following tools:

### ✅ With Postman

1. Open Postman.
2. Select HTTP method and enter URL.
3. If needed, set headers and body.
4. Click **Send** and view the response.

### ✅ With curl (Terminal)

Example: Create a user

```bash
curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

---

## ☁ Optional: Deploy Your API

To deploy your API online, consider platforms like:

- [Render](https://render.com)
- [Railway](https://railway.app)
- [Heroku](https://heroku.com)
- [Vercel + Backend](https://vercel.com/docs/functions/serverless-functions)

Make sure to:
- Use a cloud-hosted MySQL service (e.g., PlanetScale, Supabase, AWS RDS).
- Set environment variables in the dashboard.

---

## 👥 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to improve this project.

---

## 📄 License

This project is licensed under the MIT License – see the [`LICENSE`](LICENSE) file for details.

---

## 🙌 Final Notes

This README aims to be beginner-friendly while still providing enough detail for developers to understand, test, and extend the API. You now have everything you need to run, test, and share your CRUD API!

Let me know if you want:
- A downloadable version of this README
- A sample Postman collection JSON
- Unit tests for the API
- Docker setup for easy deployment

Happy coding! 😊