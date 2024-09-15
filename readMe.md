# REST API Development with Node.js, Express, MongoDB, and Cloudinary

## Overview

This repository demonstrates my skills in building and testing robust REST APIs using technologies like **Node.js**, **Express**, and **MongoDB**. The API provides various endpoints for managing resources in a RESTful manner and performs all CRUD operations. Additionally, we leverage **Cloudinary** to store book PDFs and cover images, showcasing cloud-based resource management.

## Key Features

- **Node.js & Express**: Server-side application using the latest Node.js version with the Express framework.
- **MongoDB (Mongoose)**: NoSQL database for storing and retrieving application data.
- **Cloudinary**: Cloud-based storage for uploading and managing book-related files, including PDFs and cover images.
- **CRUD Operations**: Create, Read, Update, Delete resources through REST API endpoints.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens to protect certain routes.
- **bcrypt**: Used to hash passwords for secure storage and to authenticate user passwords during login.
- **Environment Variables**: Environment-specific settings configured using `.env`.
- **Error Handling**: Centralized error management for API endpoints, ensuring clean and consistent error responses.

## Technologies Used

1. **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
2. **ESLint & Prettier**: Code linting and formatting tools to ensure clean, consistent, and error-free code throughout the development process.
3. **Express**: Fast and minimalist web framework for Node.js.
4. **MongoDB**: NoSQL database for scalable data storage.
5. **Mongoose**: ODM library for MongoDB, enabling schema-based validation and interactions.
6. **JWT**: Secure token-based authentication to protect certain routes.
7. **Cloudinary**: Cloud service to store and manage uploaded book resources like PDFs and cover images.
8. **Postman**: API testing and development tool used to test the API endpoints.
9. **bcrypt**: Library for hashing passwords and authenticating user credentials securely.
10. **Multer**: Middleware for handling file uploads, especially for book PDFs and images.
11. **dotenv**: For managing environment variables securely.

## API Endpoints

| HTTP Method | Endpoint                             | Description                     |
| ----------- | ------------------------------------ | ------------------------------- |
| `POST`      | `/api/v1/users/register`             | Register a new user             |
| `POST`      | `/api/v1/users/login`                | Login with existing credentials |
| `GET`       | `/api/v1/books/get-all-books`        | Get a list of all books         |
| `GET`       | `/api/v1/books//get-book/:bookId`    | Get details of a single book    |
| `POST`      | `/api/v1/books//create-book`         | Add a new book                  |
| `PUT`       | `/api/v1/books//update-book/:bookid` | Update an existing book         |
| `DELETE`    | `/api/v1/books//delete-book/:bookId` | Delete a book by ID             |

## Acknowledgements

I would like to express my gratitude to **[Coders Gyan](https://www.youtube.com/@CodersGyan)**, who guided me throughout the development of this project and helped me understand key concepts of REST API development. Their insights and encouragement have been invaluable in this learning process.

<<<<<<< HEAD
---
=======

>>>>>>> e09288fadce0f03ad5fc65ec86ac1aea809da7f7

**Sanit Patil** - Software Developer | REST API Enthusiast
