# 🎬 myFlix API

A RESTful API built with Node.js, Express, and MongoDB that serves movie, director, genre, and user data for the myFlix application.

This API supports user authentication, profile management, and favorite movie functionality using JWT authentication.

---

## 🚀 Live Demo

Backend Base URL:  
https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/

---

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Passport.js
- Heroku Deployment

---

## 📦 Features

- User registration & login (JWT authentication)
- Password hashing
- CRUD operations for users
- Add/remove favorite movies
- Retrieve movies, directors, and genres
- Secure protected routes

---

## 📂 Database Structure

### Movies

```json
{
  "_id": "ObjectId",
  "title": "The Lord of the Rings: The Return of the King",
  "year": 2003,
  "genre": ["Fantasy", "Adventure"],
  "director": "Peter Jackson",
  "cast": ["Elijah Wood", "Ian McKellen"],
  "runtime": 201,
  "rating": 9,
  "image": "image-url"
}
```

### Users

```json
{
  "_id": "ObjectId",
  "Username": "JettBerg",
  "Email": "example@email.com",
  "Birthday": "1999-11-10",
  "FavoriteMovies": ["MovieObjectId"],
  "isAdmin": false
}
```

---

## 🔐 Authentication

All protected routes require a Bearer token:

```
Authorization: Bearer <your_token_here>
```

Users receive a JWT token upon successful login.

---

## 📌 API Endpoints

### 🎥 Movies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/movies` | Get all movies |
| GET | `/movies/:title` | Get a movie by title |

---

### 👤 Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Register a new user |
| POST | `/login` | Login user |
| GET | `/users/:username` | Get user profile |
| PUT | `/users/:username` | Update user |
| DELETE | `/users/:username` | Delete user |

---

### ❤️ Favorite Movies

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/:username/movies/:movieId` | Add movie to favorites |
| DELETE | `/users/:username/movies/:movieId` | Remove movie from favorites |

---

## 🧪 Installation (Local Development)

1. Clone the repository:

```bash
git clone https://github.com/jettberg/myFlix-Angular-client.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with:

```
CONNECTION_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:

```bash
npm start
```

---

## 🌍 Deployment

This API is deployed using Heroku and connected to MongoDB Atlas.

---

## 👨‍💻 Author

**Jett Berg**  
Full Stack Web Developer  

GitHub: https://github.com/jettberg  

---

## 📄 License

This project is for educational and portfolio purposes.