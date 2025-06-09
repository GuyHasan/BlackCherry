# Project Name

> A brief description: An e-commerce website for displaying products, user management, image uploads, and more.

---

## Table of Contents

-   [Overview](#overview)
-   [Technologies](#technologies)
-   [Project Structure](#project-structure)
-   [Backend](#backend)
    -   [Prerequisites](#prerequisites)
    -   [Installation & Running](#installation--running)
    -   [Directory Layout (Backend)](#directory-layout-backend)
    -   [Configuration & Environment](#configuration--environment)
    -   [Main Routes](#main-routes)
    -   [Authentication & Authorization](#authentication--authorization)
    -   [Error Handling](#error-handling)
    -   [Sample API Call (Backend)](#sample-api-call-backend)
-   [Frontend](#frontend)
    -   [Tech Stack](#tech-stack)
    -   [Folder Structure (Highlights)](#folder-structure-highlights)
    -   [Getting Started](#getting-started)
    -   [App Logic](#app-logic)
    -   [Routing Structure](#routing-structure)
    -   [Auth & Favorites](#auth--favorites)
    -   [Admin Panel Features](#admin-panel-features)
    -   [Useful Scripts](#useful-scripts)
    -   [Notes](#notes)
-   [Preparing for Production](#preparing-for-production)
-   [Flow Diagram](#flow-diagram)
-   [Links & Credits](#links--credits)

---

## Overview

This project is an e-commerce website composed of two main parts:

-   **Backend** (Node.js, Express, MongoDB)
    – Responsible for user management, authentication, product CRUD, image uploads, business logic, and more.
-   **Frontend** (React + Vite)
    – Displays category pages, product lists, product details, login/register interface, forms for creation/editing, SEO handling, and routing.

---

## Technologies

-   **Backend:**

    -   Node.js (v18+)
    -   Express
    -   MongoDB (Mongoose)
    -   Cloudinary (for image hosting)
    -   JWT (Authentication)
    -   Joi (Validation)
    -   express-rate-limit
    -   config (environment configuration)
    -   Additional: multer, bcrypt, helmet, cors

-   **Frontend:**

    -   React (v18+) with Vite
    -   React Router v6
    -   react-helmet-async (dynamic `<meta>` tags for SEO)
    -   redux
    -   Axios
    -   bootstrap
    -   Toastify
    -   formik/yup

-   **General:**

    -   Git (version control)
    -   Postman / Insomnia (API testing)
    -   VSCode (IDE) with `jsconfig.json` for module resolution

---

## Project Structure

```
/project-root
│
├─ /backend
│   ├─ /src
│   │   ├─ /controllers
│   │   ├─ /services
│   │   ├─ /models
│   │   ├─ /routes
│   │   ├─ /middlewares
│   │   ├─ /utils
│   │   │   └─ errorHandlers.js
│   │   ├─ /config
│   │   │   └─ default.json
│   │   ├─ app.js
│   │   ├─ server.js
│   │   └─ db.js
│   ├─ package.json
│   └─ jsconfig.json
│
├─ /frontend
│   ├─ /public
│   ├─ /src
│   │   ├─ /components
│   │   ├─ /pages
│   │   ├─ /routes
│   │   ├─ /utils
│   │   │   └─ categoryLabels.js
│   │   ├─ App.jsx
│   │   ├─ main.jsx
│   │   └─ vite.config.js
│   ├─ package.json
│   └─ jsconfig.json
│
└─ README.md
```

---

## Backend

### Prerequisites

-   Node.js ≥ v18
-   MongoDB (local or Atlas)
-   Cloudinary account (API credentials required)

### Installation & Running

````bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create and configure your .env file (e.g., .env.development), fully explained at configuration & enivroment
> **ℹ️ Note:**
> On first run, the database is automatically seeded.
> **Before starting, make sure to configure your environment variables**—especially the admin password,email and whether to use example data.

# Running the Development or Production Server

You can use the following npm scripts (as defined in `package.json`):

- `npm run dev`
    Starts the server in development mode using `nodemon` and sets `NODE_ENV=development`.
    ```json
    "dev": "cross-env NODE_ENV=development nodemon app.js"
    ```

- `npm run start`
    Starts the server using `node app.js` (typically for general use).
    ```json
    "start": "node app.js"
    ```

- `npm run prod`
    Starts the server in production mode with `NODE_ENV=production`.
    ```json
    "prod": "cross-env NODE_ENV=production node app.js"
    ```

> **Tip:**
> Use `npm run dev` during development for automatic restarts on file changes.
> Use `npm run prod` or `npm start` when deploying or running in production.
````

### Directory Layout (Backend)

```
/backend/src
├─ /config
│   └─ default.json             # Default config values (ENVIRONMENT, AUTH_PROVIDER, etc.)
├─ /models
│   ├─ User.js                  # Mongoose schema for User
│   ├─ Product.js               # Mongoose schema for Product
│   └─ Image.js                 # Mongoose schema for Image
├─ /controllers
│   ├─ authController.js        # login, register, refreshToken, forgot/reset password
│   ├─ userController.js        # CRUD users, favorite-products, employee toggle
│   ├─ productController.js     # getAll, getById, create, edit, delete
│   └─ imageController.js       # upload, getAll, getById, delete
├─ /services
│   ├─ authService.js           # JWT, bcrypt, user lookup logic
│   ├─ userService.js           # Database calls for users
│   ├─ productService.js        # Database calls for products (filter, pagination)
│   └─ imageService.js          # Database calls for images & Cloudinary upload
├─ /routes
│   ├─ authRouter.js
│   ├─ userRouter.js
│   ├─ productRouter.js
│   └─ imageRouter.js
├─ /middlewares
│   ├─ authMiddleware.js        # Verifies JWT, attaches req.user
│   ├─ validateRequest.js       # Joi validation middleware
│   ├─ rateLimiter.js           # Global rate-limit (express-rate-limit)
│   └─ onlyEmployeeOrAdmin.js   # Authorization middleware
├─ /utils
│   └─ errorHandlers.js         # handleServiceError, handleControllerError
├─ app.js                       # Express setup, route registration, global middleware
├─ server.js                    # MongoDB connection, server start
├─ db.js                        # Mongoose.connect logic
└─ jsconfig.json                # For IntelliSense and module resolution
```

---

### Configuration & Environment

-   Uses the `config` package (npm install config) to manage settings across environments (`development`, `production`).
-   Example `backend/config/default.json`:

    ```ini
    {
    "AUTH_PROVIDER": "jwt",
    "VALIDATOR": "Joi",
    "DB": "MongoDB",
    "ENVIRONMENT": "development",
    "LOGGER": "morgan",
    "useCloudUpload": true
    }
    ```

-   Example `backend/.env`:

    ```ini
    # ------------------------------------
    # Environment Configuration
    ATLAS_CONNECTION_STRING='your_mongodb_connection_string_here'
    PORT=8181
    ADMIN_PASSWORD=someSecurePassword123
    ADMIN_EMAIL=admin@example.com
    USE_EXAMPLE_DATA=true # Set to false in production

    #-------------------------------------
    # Rate Limiting Configuration
    AUTH_LIMIT=1000 # Maximum number of requests per 15m
    GLOBAL_LIMIT=10000 # Global limit for all users per hour

    # ------------------------------------
    # Secrets for JWT authentication
    ACCESS_SECRET="some_secure_and_random_string_here"
    REFRESH_SECRET="another_secure_and_random_string_here"
    TOKEN_EXPIRATION_TIME="15m"
    REFRESH_TOKEN_EXPIRATION_TIME="1d"

    # ------------------------------------
    # SMTP Configuration
    SMTP_HOST='smtp.example.com'
    SMTP_PORT=587
    SMTP_USER='your_smtp_user'
    SMTP_PASSWORD='your_smtp_password'

    # ------------------------------------
    CLOUD_PROVIDER='cloudinary' # אפשרויות: cloudinary, s3

    # פרטי Cloudinary
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # אופציה לשימוש ב S3
    # AWS_ACCESS_KEY_ID=…
    # AWS_SECRET_ACCESS_KEY=…
    # S3_BUCKET_NAME=…
    # AWS_REGION=…
    ```

    ```

    ```

-   For production-specific overrides, create `production.json` in the same folder.

---

### Main Routes

#### User Routes (`/api/users`)

```
POST   /api/users/register              → Register a new user (validateRequest("registerUser"))
POST   /api/users/login                 → User login (validateRequest("loginUser"))
GET    /api/users                       → Get all users (authMiddleware)
GET    /api/users/:id                   → Get user by ID (authMiddleware)
PUT    /api/users/:id                   → Update user (authMiddleware, validateRequest("registerUser"))
DELETE /api/users/:id                   → Delete user (authMiddleware)
POST   /api/users/favorite-products     → Add/remove favorite product (authMiddleware)
GET    /api/users/favorite-products     → Get user’s favorite products (authMiddleware)
PATCH  /api/users/employee/:id          → Update employee status (authMiddleware, onlyEmployeeOrAdmin)
```

#### Auth Routes (`/api/auth`)

```
POST /api/auth/refresh            → Obtain a new access token using refresh token
POST /api/auth/forgot-password    → Send password reset link (validateRequest("forgotPassword"))
POST /api/auth/reset-password     → Reset password (validateRequest("resetPassword"))
```

#### Product Routes (`/api/products`)

```
GET    /api/products                      → Get all products (filter, search, pagination, sort)
GET    /api/products/id/:id               → Get product by ID
POST   /api/products                      → Create a new product (authMiddleware, validateRequest("product"))
PUT    /api/products/id/:id               → Update a product (authMiddleware, validateRequest("product"))
DELETE /api/products/id/:id               → Delete a product (authMiddleware, onlyEmployeeOrAdmin)
GET    /api/products/category             → get a list of the categories+subcategories of products
GET    /api/products/menu-preview         → get 5 products from each category+sub-category for menu page
```

-   **Possible Query Parameters** for `GET /api/products`:

    -   `search` = search term for name/description
    -   `category` = category slug
    -   `subCategory` = sub-category slug
    -   `minPrice` = minimum price
    -   `maxPrice` = maximum price
    -   `sort` = `{field}_asc` or `{field}_desc` (e.g., `price_asc`, `createdAt_desc`)
    -   `page` = page number (default: 1)
    -   `limit` = items per page (default: 20)

#### Image Routes (`/api/images`)

```
POST   /api/images/upload           → Upload image (authMiddleware, multer, validateRequest("createImage"))
GET    /api/images                  → Get all images (authMiddleware)
GET    /api/images/:id              → Get image by ID (authMiddleware)
DELETE /api/images/:id              → Delete image (authMiddleware, onlyEmployeeOrAdmin)
```

---

### Authentication & Authorization

-   **JWT Authentication**

    -   Middleware: `authMiddleware.js`
    -   Checks `Authorization: Bearer <token>` header
    -   Verifies token using `jwt.verify(...)` and attaches `req.user = { id, roles… }`.

-   **Rate Limiting**

    -   Using `express-rate-limit` globally or per-route
    -   Example: limit to 100 requests per minute per IP on login route

-   **Validation**

    -   Joi schemas with `validateRequest("schemaName")` middleware
    -   Schemas for: registerUser, loginUser, forgotPassword, resetPassword, product, createImage

---

### Error Handling

-   **Service Layer**: Always use `handleServiceError(err, defaultMessage)` inside `catch` blocks
-   **Controller Layer**: Always use `handleControllerError(err, next, defaultMessage)` inside `catch` blocks
-   **Global Error Handler** (in `app.js` as the last middleware):

    ```js
    export default function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const name = err.name || "Error";

    if (process.env.NODE_ENV !== "production") {
    	if (status >= 500) {
    		console.error("Internal Error:", err); // full stack trace
    	} else {
    		console.warn(`${status} ${name}: ${message}`); // cleaner log for expected errors
    	}
    }

    res.status(status).json({
    	success: false,
    	error: name,
    	message,
    });
    }

    });
    ```

---

### Sample API Call (Backend)

Search and filter products:

```
GET /api/products?search=cheese&category=desserts&minPrice=50&maxPrice=200&sort=price_asc&page=2&limit=10
```

-   **Response (200)**:

    ```json
    {
    	"data": [
    		{
    			"_id": "64a5d3b2c3f9a1e234567890",
    			"name": "Cheesecake (Parve)",
    			"description": "Delicious parve cheesecake...",
    			"price": 120,
    			"category": "desserts",
    			"subCategory": "parve",
    			"size": [{ "quantity": 1, "price": 120 }],
    			"unit": "units",
    			"popularity": 5,
    			"imageUrl": "https://res.cloudinary.com/.../image.jpg",
    			"createdAt": "2025-05-30T10:15:23.456Z"
    		}
    		// Up to 10 products...
    	],
    	"meta": {
    		"totalCount": 95,
    		"totalPages": 10,
    		"currentPage": 2
    	}
    }
    ```

---

## Frontend

```md
This is the frontend for **Black Cherry**, a full-stack web application built with React 18 and Vite. It’s styled with Bootstrap 5, supports JWT-based authentication, and includes an admin panel for product and user management.

## Tech Stack

-   React 18 + Vite
-   Redux Toolkit (with Thunks for async logic)
-   React Router v7
-   Axios for API communication
-   React-Bootstrap for UI components
-   Formik + Yup for forms and validation
-   Framer Motion for animations
-   React Toastify for notifications
-   React Helmet Async for SEO meta handling
-   JWT Decode for client-side token parsing

## Folder Structure (Highlights)
```

src/
├── components/
│ ├── products/
│ ├── users/
│ └── ... (e.g. Home, Navbar, Footer, etc.)
├── redux/
│ ├── slices/
│ └── store.js
├── services/
│ └── api.js
├── style/
│ └── App.css
├── App.jsx
└── main.jsx

````

## Getting Started

### 1. Install Dependencies

```bash
npm install
````

### 2. Set Up Environment Variables

Create a `.env` file in the `frontend/` directory:

```
VITE_BACKEND_URL=http://localhost:8181/api
VITE_TOKEN_DECODE_METHOD =jwt
```

This controls your backend API base URL. Axios uses this via `import.meta.env`.

### 3. Run the Dev Server

```bash
npm run dev
```

The app will be served at `http://localhost:5173` by default.

### 4. Build for Production

```bash
npm run build
```

To preview the built project locally:

```bash
npm run preview
```

## App Logic

-   Redux Toolkit is used for state management.
-   Thunks interact with the `services` layer, which abstracts Axios calls.
-   The Redux `store` includes slices for:
    `user`, `products`, `categories`, `menu`, and `favorites`.

> Store is injected into service files using `injectStoreDispatch()` for side-effect handling.

## Routing Structure

Managed via `react-router-dom@7`, with a structure like:

```
/
├── /about
├── /contact
├── /menu
│   ├── /:categoryKey
│   └── /:categoryKey/:subKey
├── /products/:slugId
├── /admin
│   ├── /products
│   ├── /products/add
│   └── /users
├── /kashrut
├── /login
├── /register
├── /profile
│   └── /favorites
└── * (404 fallback)
```

## Auth & Favorites

-   JWT tokens are handled via `refreshThunk()` and stored in cookies.
-   User login status is determined by the presence of an authentication cookie. When this cookie expires, the user is automatically logged out the next time they interact with the site.
-   The token expiration time is configurable via the backend environment variables.
-   On application load, the `refreshThunk` function attempts to obtain a new access token using the refresh token. If successful, it also loads the user's favorite products.
-   API requests use `withCredentials: true`.

## Admin Panel Features

Accessible at `/admin` with nested routes:

-   Manage Products (`/admin/products`)
-   Add Product (`/admin/products/add`)
-   Manage Users (`/admin/users`)

## Useful Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start local dev server        |
| `npm run build`   | Build app for production      |
| `npm run preview` | Preview the built app locally |

## Notes

-   Styling is done via `App.css` and `react-bootstrap`.
-   Responsive design supported (with hamburger menu on small screens).
-   `ToastContainer` handles global toast notifications.
-   SEO support via `react-helmet-async`.

---

## Preparing for Production

1. **Backend:**

    - Ensure all environment variables (MongoDB URI, JWT_SECRET, Cloudinary) are set in the deployment environment (e.g., Heroku Config Vars or Docker Compose).
    - Run `npm run build` if you have a build step (TypeScript, Babel).
    - Start the server with `node server.js`, or use PM2/Nginx.

2. **Frontend:**

    - Run `npm run build` to generate the `dist/` folder.
    - Deploy to a static host (Netlify, Vercel, S3+CloudFront) or any VPS.
    - Configure redirects so that `/api/*` proxies to your backend.

3. **SSL/HTTPS:**

    - Always use HTTPS, especially when handling JWTs.
    - Cloudinary URLs are already HTTPS.

4. **Logging & Monitoring:**

    - Implement logging on the backend (Winston or Log4js).
    - Monitor CPU/Memory if deployed on a VPS.

5. **Security Best Practices:**

    - Use Helmet (Express) for security headers.
    - Restrict CORS to your frontend domain.
    - Apply rate limiting on sensitive routes (e.g., login, register).

---

## Flow Diagram

Below is a high-level overview of how a typical user request flows through the application:

```
[Frontend Event]
    │
    ▼
[Redux Thunk Action]
    │
    ▼
[Frontend Service Layer]
    │
    ▼
[HTTP Request to Backend]
  (e.g., GET /api/products?search=...)
    │
    ▼
[Backend Controller]
    │
    ▼
[Backend Service Layer]
    │
    ▼
[Database Query]
    │
    ▼
[Response Propagates Back Up]
```

**Example Flow:**

1. **User Action:** User searches for products in the frontend UI.
2. **Redux Thunk:** Dispatches an async thunk action.
3. **Service Layer:** Thunk calls a service function that uses Axios to send a request to the backend API.
4. **Backend Controller:** Receives the request, validates input, and calls the appropriate service.
5. **Backend Service:** Handles business logic and queries the database.
6. **Database:** Returns data to the backend service.
7. **Response:** Data is sent back through the controller to the frontend, updating the UI.

This structure ensures clear separation of concerns, maintainability, and scalability across both frontend and backend.

---

## Links & Credits

-   [Express](https://expressjs.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [Cloudinary](https://cloudinary.com/)
-   [Joi](https://joi.dev/)
-   [react-helmet-async](https://github.com/staylor/react-helmet-async)
-   [express-rate-limit](https://github.com/nfriedly/express-rate-limit)

> **Author:** Guy Hasan – [GitHub Profile](https://github.com/your-username) > **Date:** June 2025

---
