
# 🛍️ ShoppyGlobe – E-Commerce Backend (MERN Stack)

**ShoppyGlobe** is a backend for a full-stack e-commerce application built using Node.js, Express, and MongoDB. It supports user registration and login, product listing, and shopping cart operations with JWT-based authentication.

---

## 🚀 Features

- ✅ User Registration & Login with JWT Auth
- ✅ Secure Password Hashing with bcrypt
- ✅ Product Listing (from MongoDB)
- ✅ Add to Cart, Update Cart, Delete Cart Item
- ✅ Proper error handling middleware
- ✅ Seeding from external DummyJSON product API
- ✅ MongoDB support (local Compass)

---

## 🔧 Tech Stack

| Layer     | Technology     |
|---------- |----------------|
| Runtime   | Node.js        |
| Server    | Express.js     |
| Database  | MongoDB        |
| Auth      | JWT + bcryptjs |
| Testing   | Thunder Client |

---

## 📁 Project Structure

```
shoppyglobe_backend/
│
├── controllers/         # Route handlers (auth, cart, products)
├── middleware/          # Auth & error middleware
├── models/              # Mongoose schemas (User, Product, Cart)
├── routes/              # Express routes (authRoutes, cartRoutes, productRoutes)
├── .env                 # Environment variables (MONGO_URI, JWT_SECRET)
├── server.js            # Entry point, connects DB and starts server
├── app.js               # Sets up routes and middleware
├── package.json         # Project metadata & dependencies
|__ seed.js              # Populate MongoDB Compass database with https://dummyjson.com/products automatically
```

---

## 📬 API Endpoints

### 🧑‍💼 Auth

| Method | Route       | Description          |
|--------|-------------|----------------------|
| POST   | `/register` | Register a new user  |
| POST   | `/login`    | Login existing user  |

> Request body for registration:
```json
{
  "fullName": "Trishika Maurya",
  "email": "trishika@gmail.com",
  "password": "Trishi@123"
}
```

> Password must have:
> - 8+ characters  
> - At least 1 uppercase, 1 lowercase, 1 digit, and 1 special character

---

### 📦 Products

| Method | Route                    | Description           |
|--------|--------------------------|-----------------------|
| GET    | `/products`              | Get all products      |
| GET    | `/products/:id`          | Get product by ID     |

---

### 🛒 Cart (Protected by JWT)

> Header: `Authorization: Bearer <your_token>`

| Method | Route         | Description              |
|--------|---------------|--------------------------|
| POST   | `/cart`       | Add product to cart      |
| PUT    | `/cart/:id`   | Update item quantity     |
| DELETE | `/cart/:id`   | Remove item from cart    |

---

## 🧪 Running Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Arti2510/shoppyglobeProject.git
cd shoppyglobe_backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file:

```env
PORT=5100
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=mySecretKey
```

### 4. Start the Server

```bash
npm start
```

Your backend will run on `http://localhost:5100`.

---

## 🧑‍💻 Author

**Arti Maurya**  
MCA Graduate | Full Stack Developer (Internshala Certified)