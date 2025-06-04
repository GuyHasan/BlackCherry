# Project Name

> A brief description: An e-commerce website for displaying products, user management, image uploads, and more.

---

## Table of Contents

<ol type="1">
  <li><a href="#overview">Overview</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#project-structure">Project Structure</a></li>
  <li>
    <a href="#backend">Backend</a>
    <ol type="1">
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation--running">Installation &amp; Running</a></li>
      <li><a href="#directory-layout-backend">Directory Layout</a></li>
      <li><a href="#configuration--environment">Configuration &amp; Environment</a></li>
      <li><a href="#main-routes">Main Routes</a></li>
      <li><a href="#authentication--authorization">Authentication &amp; Authorization</a></li>
      <li><a href="#error-handling">Error Handling</a></li>
      <li><a href="#sample-api-call-backend">Sample API Call</a></li>
    </ol>
  </li>
  <li>
    <a href="#frontend">Frontend</a>
    <ol type="1">
      <li><a href="#prerequisites-frontend">Prerequisites</a></li>
      <li><a href="#installation--running-frontend">Installation &amp; Running</a></li>
      <li><a href="#directory-layout-frontend">Directory Layout</a></li>
      <li><a href="#main-routes-frontend">Main Routes</a></li>
      <li><a href="#seo-implementation">SEO Implementation</a></li>
      <li><a href="#consuming-the-backend-api">Consuming the Backend API</a></li>
      <li><a href="#authorization--content-display">Authorization &amp; Content Display</a></li>
      <li><a href="#component-example">Component Example</a></li>
    </ol>
  </li>
  <li><a href="#environment-variables">Environment Variables</a></li>
  <li><a href="#preparing-for-production">Preparing for Production</a></li>
  <li><a href="#flow-diagram-optional">Flow Diagram (Optional)</a></li>
  <li><a href="#links--credits">Links &amp; Credits</a></li>
</ol>

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

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create and configure your .env file (e.g., .env.development), fully explained at configuration & enivroment

# Run the development server
npm run dev         # Using nodemon or ts-node-dev
# or
npm start           # If "start": "node server.js" is defined in package.json
```

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

    ```

    ```

-   Example `backend/.env`:

    ```ini
    # ------------------------------------
    # Environment Configuration
    ATLAS_CONNECTION_STRING='your_mongodb_connection_string_here'
    PORT=8181
    ADMIN_PASSWORD=someSecurePassword123

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

### Prerequisites

-   Node.js (for Vite)
-   Vite (recommended v4+)
-   React (v18+)
-   Text editor/IDE with JSX/ESLint/Prettier support

### Installation & Running

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

### Directory Layout (Frontend)

```
/frontend/src
├─ /components
│   ├─ Header.jsx
│   ├─ Footer.jsx
│   ├─ ProductCard.jsx
│   └─ ... (shared UI components)
├─ /pages
│   ├─ HomePage.jsx
│   ├─ ProductsPage.jsx
│   ├─ CategoryPage.jsx
│   ├─ SubCategoryPage.jsx
│   ├─ ProductDetailPage.jsx
│   ├─ LoginPage.jsx
│   ├─ RegisterPage.jsx
│   └─ ... (other pages)
├─ /routes
│   └─ AppRoutes.jsx         # React Router v6 route definitions
├─ /utils
│   └─ categoryLabels.js     # Mapping of slug → English or display label
├─ App.jsx                   # Main component including <Routes>
├─ main.jsx                  # ReactDOM.render, HelmetProvider
└─ vite.config.js            # Vite configuration (aliases, plugins, etc.)
```

---

### Main Routes (React Router)

```jsx
<BrowserRouter>
	<Routes>
		<Route path='/' element={<HomePage />} />

		<Route path='/products' element={<ProductsPage />} />
		<Route path='/products/:categoryKey' element={<CategoryPage />} />
		<Route path='/products/:categoryKey/:subCategoryKey' element={<SubCategoryPage />} />
		<Route path='/products/:categoryKey/:subCategoryKey/:productSlug' element={<ProductDetailPage />} />

		<Route path='/login' element={<LoginPage />} />
		<Route path='/register' element={<RegisterPage />} />
		{/* ...additional routes as needed */}
	</Routes>
</BrowserRouter>
```

-   The frontend calls the backend using Axios or Fetch. Example:

    ```js
    axios.get(`/api/products?category=${categoryKey}&subCategory=${subCategoryKey}`);
    ```

---

### SEO Implementation

-   Use **react-helmet-async** in each page:

    ```jsx
    import { Helmet } from "react-helmet-async";

    export default function CategoryPage() {
    	const { categoryKey } = useParams();
    	const categoryLabel = categoryLabels[categoryKey]; // from utils/categoryLabels.js

    	return (
    		<>
    			<Helmet>
    				<title>{categoryLabel} | My E-commerce Site</title>
    				<meta name='description' content={`Explore amazing products in the ${categoryLabel} category.`} />
    				<link rel='canonical' href={`https://yourdomain.com/products/${categoryKey}`} />
    			</Helmet>
    			<h1>Category: {categoryLabel}</h1>
    			{/* Page content */}
    		</>
    	);
    }
    ```

-   **Pre-rendering** (in Vite config) is recommended for key routes (category and product pages) so crawlers receive full HTML.

---

### Consuming the Backend API

-   Example using Axios:

    ```js
    import axios from "axios";

    export async function fetchProducts({ category, subCategory, search, minPrice, maxPrice, sort, page, limit }) {
    	const params = {};
    	if (search) params.search = search;
    	if (category) params.category = category;
    	if (subCategory) params.subCategory = subCategory;
    	if (minPrice) params.minPrice = minPrice;
    	if (maxPrice) params.maxPrice = maxPrice;
    	if (sort) params.sort = sort;
    	if (page) params.page = page;
    	if (limit) params.limit = limit;

    	const response = await axios.get("/api/products", { params });
    	return response.data; // { data: [...], meta: { ... } }
    }
    ```

-   In a React component:

    ```jsx
    useEffect(() => {
    	fetchProducts({ category: "desserts", sort: "price_desc" })
    		.then((res) => setProducts(res.data))
    		.catch((err) => console.error(err));
    }, []);
    ```

---

### Authorization & Content Display

-   After login (storing the JWT in `localStorage`), attach the Bearer token to Axios:

    ```js
    axios.interceptors.request.use((config) => {
    	const token = localStorage.getItem("accessToken");
    	if (token) {
    		config.headers.Authorization = `Bearer ${token}`;
    	}
    	return config;
    });
    ```

-   Protect certain routes in React by checking if a valid token exists—if not, redirect to `/login`.
-   If the user is an Admin or Employee, show additional UI controls (e.g., Edit/Delete buttons on ProductDetailPage).

---

### Component Example

```jsx
// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { categoryLabels, subCategoryLabels } from "../utils/categoryLabels";

export default function ProductCard({ product }) {
	const { name, price, category, subCategory, imageUrl, slug } = product;
	const categoryLabel = categoryLabels[category];
	const subCategoryLabel = subCategory ? subCategoryLabels[subCategory] : null;

	return (
		<div className='border rounded p-4 shadow'>
			<Link to={`/products/${category}/${subCategory}/${slug}`}>
				<img src={imageUrl} alt={name} className='w-full h-48 object-cover rounded' />
				<h2 className='mt-2 text-xl font-semibold'>{name}</h2>
				<p className='text-gray-600'>
					{categoryLabel} {subCategoryLabel && ` / ${subCategoryLabel}`}
				</p>
				<p className='mt-1 text-lg text-green-600'>₪{price}</p>
			</Link>
		</div>
	);
}
```

---

## Environment Variables

**Backend** (`backend/.env`):

```
ENVIRONMENT=development
AUTH_PROVIDER=jwt
MONGODB_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=…
CLOUDINARY_API_KEY=…
CLOUDINARY_API_SECRET=…
```

**Frontend** (`frontend/.env`):

```
VITE_API_BASE_URL=http://localhost:5000/api
# Any variable prefixed with VITE_ is available via import.meta.env
```

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

## Flow Diagram (Optional)

> You may embed a UML diagram or ASCII art illustrating the data flow, for example:
>
> 1. Frontend → authMiddleware → JWT Verification → Controller → Service → Database
> 2. Frontend → GET `/api/products?search=…` → Controller → Service → Database

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
