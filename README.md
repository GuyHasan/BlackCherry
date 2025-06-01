# Project Name

> תיאור קצר על מטרת הפרויקט: אתר מסחר מקוון (e-commerce) להצגת מוצרים, ניהול משתמשים, העלאת תמונות ועוד.

---

## תוכן העניינים

1. [תיאור כללי](#תיאור-כללי)
2. [טכנולוגיות](#טכנולוגיות)
3. [מבנה הפרויקט](#מבנה-הפרויקט)
4. [Backend](#backend)

    1. [דרישות מקדימות](#דרישות-מקדימות)
    2. [התקנה והרצה](#התקנה-והרצה)
    3. [מבנה ותיקיות](#מבנה-ותיקיות-backend)
    4. [קובצי קונפיג ושמירת סביבות](#קובצי-קונפיג-ושמירת-סביבות)
    5. [Routes עיקריים](#routes-עיקריים)
    6. [הרשאות ואבטחה](#הרשאות-ואבטחה)
    7. [שגיאות ו-Error Handling](#שגיאות-ו-error-handling)
    8. [דוגמת קריאת API](#דוגמת-קריאת-api-backend)

5. [Frontend](#frontend)

    1. [דרישות מקדימות](#דרישות-מקדימות-frontend)
    2. [התקנה והרצה](#התקנה-והרצה-frontend)
    3. [מבנה ותיקיות](#מבנה-ותיקיות-frontend)
    4. [Routes עיקריים](#routes-עיקריים-frontend)
    5. [סידור מימוש ה-SEO](#סידור-מימוש-ה-seo)
    6. [עבודה עם API מה-Backend](#עבודה-עם-api-מה-backend)
    7. [הרשאות ותצוגת התוכן](#הרשאות-ותצוגת-התוכן)
    8. [דוגמה ל-component](#דוגמה-ל-component)

6. [Environment Variables](#environment-variables)
7. [התכוננות ל-Production](#התכוננות-ל-production)
8. [תרשים זרימה (Optional)](#תרשים-זרימה-optional)
9. [לינקים וקרדיטים](#לינקים-וקרדיטים)

---

## תיאור כללי

פרויקט זה הוא אתר מסחר מקוון (e-commerce) המורכב משני חלקים מרכזיים:

-   **Backend** (Node.js, Express, MongoDB)
    – אחראי על ניהול משתמשים, אימות והרשאות, CRUD של מוצרים, העלאת תמונות לענן, לוגיקה עסקית ועוד.
-   **Frontend** (React + Vite)
    – מציג למשתמשים דפי קטגוריות, רשימת מוצרים, עמוד מוצר, ממשק משתמש להתנתקות ולהרשאה, טפסי יצירה/עריכה, מניפולציית SEO וניווט.

---

## טכנולוגיות

-   **Backend:**

    -   Node.js (v18+)
    -   Express
    -   MongoDB (Mongoose)
    -   Cloudinary (לניהול תמונות)
    -   JWT (Authentication)
    -   Joi (Validation)
    -   express-rate-limit
    -   config (ניהול סביבות)
    -   기타: multer, bcrypt, helmet, cors

-   **Frontend:**

    -   React (v18+) עם Vite
    -   React Router v6
    -   react-helmet-async (SEO, `<meta>` דינמי)
    -   Axios או Fetch (קריאה ל-API)
    -   Tailwind CSS / CSS Modules (לסגנון)

-   **כללי:**

    -   Git (גרסאות)
    -   Postman / Insomnia (לבדיקות API)
    -   VSCode (IDE) עם `jsconfig.json` להגדרות מודולים
    -   Docker (אופציונלי)

---

## מבנה הפרויקט

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

### דרישות מקדימות

-   Node.js ≥ v18
-   MongoDB (מופעל במחשב או Atlas)
-   חשבון Cloudinary (API keys בקובץ ה־env)

### התקנה והרצה

```bash
# נווט לתיקיית backend
cd backend

# התקנת תלויות
npm install

# הגדרת environment variables
# צור לקובץ .env (לדוגמה .env.development):
#   MONGODB_URI=<your_mongo_connection_string>
#   JWT_SECRET=<your_jwt_secret>
#   CLOUDINARY_CLOUD_NAME=<…>
#   CLOUDINARY_API_KEY=<…>
#   CLOUDINARY_API_SECRET=<…>
#   AUTH_PROVIDER=jwt

# הרצת השרת בפיתוח
npm run dev         # עם nodemon או ts-node-dev
# או
npm start           # אם מוגדר ב־package.json "start": "node server.js"
```

### מבנה ותיקיות (Backend)

```
/backend/src
├─ /config
│   └─ default.json             # ערכי ברירת־מחדל של config (ENVIRONMENT, AUTH_PROVIDER וכו׳)
├─ /models
│   ├─ User.js                   # Mongoose Schema של משתמש
│   ├─ Product.js                # Mongoose Schema של מוצר (כפי שהוצג)
│   └─ Image.js                  # Mongoose Schema של תמונה
├─ /controllers
│   ├─ authController.js         # login, register, refreshToken, forgot/reset password
│   ├─ userController.js         # CRUD משתמש, favorite-products, employee toggle
│   ├─ productController.js      # getAll, getById, create, edit, delete
│   └─ imageController.js        # upload, getAll, getById, delete
├─ /services
│   ├─ authService.js            # לוגיקה של JWT, bcrypt, זיהוי משתמשים
│   ├─ userService.js            # DB calls למשתמש
│   ├─ productService.js         # DB calls למוצרים (פונקציות עם filter, pagination)
│   └─ imageService.js           # DB calls לתמונות, העלאה ל־Cloudinary
├─ /routes
│   ├─ authRouter.js
│   ├─ userRouter.js
│   ├─ productRouter.js
│   └─ imageRouter.js
├─ /middlewares
│   ├─ authMiddleware.js         # בודק JWT, מוסיף req.user
│   ├─ validateRequest.js        # Joi validation middleware
│   ├─ rateLimiter.js            # גלובל rate‐limit (express-rate-limit)
│   └─ onlyEmployeeOrAdmin.js    # בדיקת הרשאות (מידלוור)
├─ /utils
│   └─ errorHandlers.js          # handleServiceError, handleControllerError
├─ app.js                        # הגדרת express, חיבור לראוטרים, middleware גלובלי
├─ server.js                     # חיבור ל־MongoDB, start server
├─ db.js                         # חיבור ל־MongoDB (Mongoose.connect)
└─ jsconfig.json                 # עבור IntelliSense ו־moduleResolution
```

---

### קובצי קונפיג ושמירת סביבות

-   משתמשים ב־`config` (npm install config) כדי לנהל הגדרות לסביבות שונות (`development`, `production`).
-   דוגמא ל־`backend/src/config/default.json`:

    ```json
    {
    	"ENVIRONMENT": "development",
    	"AUTH_PROVIDER": "jwt",
    	"MONGODB_URI": "mongodb://localhost:27017/your-db-name",
    	"JWT_SECRET": "your_jwt_secret",
    	"CLOUDINARY_CLOUD_NAME": "your_cloud_name",
    	"CLOUDINARY_API_KEY": "your_api_key",
    	"CLOUDINARY_API_SECRET": "your_api_secret"
    }
    ```

-   אם רוצים קונפיג מיוחד ל־production, יוצרים `production.json` באותה תיקייה.

---

### Routes עיקריים

#### User Routes (`/api/users`)

```
POST   /api/users/register              → רישום משתמש חדש (validateRequest("registerUser"))
POST   /api/users/login                 → כניסה (validateRequest("loginUser"))
GET    /api/users                       → קבלת כל המשתמשים (authMiddleware)
GET    /api/users/:id                   → קבלת משתמש לפי ID (authMiddleware)
PUT    /api/users/:id                   → עדכון משתמש (authMiddleware, validateRequest("registerUser"))
DELETE /api/users/:id                   → מחיקת משתמש (authMiddleware)
POST   /api/users/favorite-products     → הוספת/הסרת מוצר מועדף (authMiddleware)
GET    /api/users/favorite-products     → קבלת המוצרים המועדפים (authMiddleware)
PATCH  /api/users/employee/:id          → עדכון סטטוס עובד (authMiddleware, onlyEmployeeOrAdmin)
```

#### Auth Routes (`/api/auth`)

```
POST /api/auth/refresh            → קבלת access token חדש (בעזרת refresh token)
POST /api/auth/forgot-password    → שליחת קישור איפוס סיסמה (validateRequest("forgotPassword"))
POST /api/auth/reset-password     → איפוס סיסמה חדש (validateRequest("resetPassword"))
```

#### Product Routes (`/api/products`)

```
GET    /api/products                      → קבלת כל המוצרים (filter, search, pagination, sort)
GET    /api/products/id/:id               → קבלת מוצר לפי ID
POST   /api/products                      → יצירת מוצר חדש (authMiddleware, validateRequest("product"))
PUT    /api/products/id/:id               → עדכון מוצר (authMiddleware, validateRequest("product"))
DELETE /api/products/id/:id               → מחיקת מוצר (authMiddleware, onlyEmployeeOrAdmin)
```

-   **Query Parameters אפשריים** ב־`GET /api/products`:

    -   `search` = מחרוזת חיפוש על שם/תיאור
    -   `category` = slug של קטגוריה
    -   `subCategory` = slug של תת־קטגוריה
    -   `minPrice` = מחיר מינימלי
    -   `maxPrice` = מחיר מקסימלי
    -   `sort` = `{field}_asc` או `{field}_desc` (למשל `price_asc` או `createdAt_desc`)
    -   `page` = מספר עמוד (ברירת מחדל 1)
    -   `limit` = מספר פריטים לעמוד (ברירת מחדל 20)

#### Image Routes (`/api/images`)

```
POST   /api/images/upload           → העלאת תמונה (authMiddleware, multer, validateRequest("createImage"))
GET    /api/images                  → קבלת כל התמונות (authMiddleware)
GET    /api/images/:id              → קבלת תמונה לפי ID (authMiddleware)
DELETE /api/images/:id              → מחיקת תמונה (authMiddleware, onlyEmployeeOrAdmin)
```

---

### הרשאות ואבטחה

-   **JWT Authentication**

    -   Middleware: `authMiddleware.js`
    -   בודק את הכותרת `Authorization: Bearer <token>`
    -   מוודא את ה־token בעזרת `jwt.verify(...)` ומשייך את `req.user = { id, roles… }`.

-   **בדיקת הרשאות**

    -   Middleware: `onlyEmployeeOrAdmin.js`
    -   דואג שאיזשהו route ייגש רק מי שיש לו `req.user.isEmployee` או `req.user.isAdmin`.

-   **Rate Limiting**

    -   גלובלי או על מסלולים מסוימים: `express-rate-limit`
    -   למשל: להגביל ל־100 בקשות בדקה לכל IP על מסלול ה־login.

-   **Validation**

    -   Joi Schemas במידלוור: `validateRequest("schemaName")`
    -   Schemas עבור: registerUser, loginUser, forgotPassword, resetPassword, product, createImage.

---

### שגיאות ו-Error Handling

-   בשירותים (Service): נוסיף תמיד ב־`catch (err)` קריאה ל-`handleServiceError(err, defaultMessage)` שנמצא ב־`utils/errorHandlers.js`.
-   בקונטרולרים (Controller): נוסיף ב־`catch (err)` קריאה ל-`handleControllerError(err, next, defaultMessage)`.
-   **Error Handler גלובלי** (`app.js` או בסוף ה־middleware chain):

    ```
    app.use((err, req, res, next) => {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message, code: err.code });
      }
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error", code: "ServerError" });
    });
    ```

---

### דוגמת קריאת API (Backend)

חיפוש וסינון מוצרים:

```
GET /api/products?search=cheese&category=desserts&minPrice=50&maxPrice=200&sort=price_asc&page=2&limit=10
```

-   **Response** (200):

    ```json
    {
    	"data": [
    		{
    			"_id": "64a5d3b2c3f9a1e234567890",
    			"name": "עוגת גבינה פרווה",
    			"description": "טקסט...",
    			"price": 120,
    			"category": "desserts",
    			"subCategory": "parve",
    			"size": [{ "quantity": 1, "price": 120 }],
    			"unit": "יחידות",
    			"popularity": 5,
    			"imageUrl": "https://res.cloudinary.com/…/image.jpg",
    			"createdAt": "2025-05-30T10:15:23.456Z"
    		}
    		// עד 10 מוצרים...
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

### דרישות מקדימות

-   Node.js (ל־Vite)
-   Vite (מומלץ v4+)
-   React (v18+)
-   כל עורך קוד שתומך ב-JSX/ESLint/Prettier

### התקנה והרצה

```
# נווט לתיקיית frontend
cd frontend

# התקנת תלויות
npm install

# הרצה בסביבת פיתוח
npm run dev

# בניית גרסת Production
npm run build
```

### מבנה ותיקיות (Frontend)

```
/frontend/src
├─ /components
│   ├─ Header.jsx
│   ├─ Footer.jsx
│   ├─ ProductCard.jsx
│   └─ … (UI Components כלליים)
├─ /pages
│   ├─ HomePage.jsx
│   ├─ ProductsPage.jsx
│   ├─ CategoryPage.jsx
│   ├─ SubCategoryPage.jsx
│   ├─ ProductDetailPage.jsx
│   ├─ LoginPage.jsx
│   ├─ RegisterPage.jsx
│   └─ … (שאר עמודים)
├─ /routes
│   └─ AppRoutes.jsx         # React Router v6 routes definitions
├─ /utils
│   └─ categoryLabels.js     # מיפוי של slug → שם בעברית
├─ App.jsx                   # רכיב ראשי, כולל <Routes>
├─ main.jsx                  # ReactDOM.render, HelmetProvider
└─ vite.config.js            # הגדרות Vite (alias, plugins וכו׳)
```

---

### Routes עיקריים (React Router)

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
		{/* … ועוד לפי הצורך */}
	</Routes>
</BrowserRouter>
```

-   הפרונט קורא ל־Backend דרך `axios` (או fetch), לדוגמה:

    ```
    axios.get(`/api/products?category=${categoryKey}&subCategory=${subCategoryKey}`);
    ```

---

### סידור מימוש ה-SEO

-   **react-helmet-async** לכל עמוד:

    ```jsx
    import { Helmet } from "react-helmet-async";

    export default function CategoryPage() {
    	const { categoryKey } = useParams();
    	const categoryHe = categoryLabels[categoryKey]; // מתוך utils/categoryLabels.js

    	return (
    		<>
    			<Helmet>
    				<title>{categoryHe} | My E-commerce Site</title>
    				<meta name='description' content={`גלו מוצרים מצויינים בקטגוריית ${categoryHe}.`} />
    				<link rel='canonical' href={`https://yourdomain.com/products/${categoryKey}`} />
    			</Helmet>
    			<h1>קטגוריה: {categoryHe}</h1>
    			{/* שאר התוכן */}
    		</>
    	);
    }
    ```

-   **Prerender** (בהגדרת Vite) – מומלץ להגדיר את ה־routes החשובים (עמודי קטגוריה ועמודי מוצר) כדי לוודא שגוגל מקבל HTML מלא.

---

### עבודה עם API מה-Backend

-   דוגמה בשימוש ב־Axios:

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

-   בתוך רכיב React:

    ```jsx
    useEffect(() => {
    	fetchProducts({ category: "desserts", sort: "price_desc" })
    		.then((res) => setProducts(res.data))
    		.catch((err) => console.error(err));
    }, []);
    ```

---

### הרשאות ותצוגת התוכן

-   לאחר שהמשתמש נכנס (Login → קבלת JWT ב־`localStorage`), מוסיפים את ה־Bearer token ל־Axios:

    ```js
    axios.interceptors.request.use((config) => {
    	const token = localStorage.getItem("accessToken");
    	if (token) {
    		config.headers.Authorization = `Bearer ${token}`;
    	}
    	return config;
    });
    ```

-   ברכיבי React מוגנים (Protected Routes), בודקים אם יש `token` תקין – אחרת מפנים ל־`/login`.
-   במידה והמשתמש הוא Admin או Employee, מציגים לעיתים כפתורים ל־Edit/Delete (למשל ב־ProductDetailPage).

---

### דוגמה ל-Component

```jsx
// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { categoryLabels, subCategoryLabels } from "../utils/categoryLabels";

export default function ProductCard({ product }) {
	const { name, price, category, subCategory, imageUrl, slug } = product;
	const categoryHe = categoryLabels[category];
	const subCategoryHe = subCategory ? subCategoryLabels[subCategory] : null;

	return (
		<div className='border rounded p-4 shadow'>
			<Link to={`/products/${category}/${subCategory}/${slug}`}>
				<img src={imageUrl} alt={name} className='w-full h-48 object-cover rounded' />
				<h2 className='mt-2 text-xl font-semibold'>{name}</h2>
				<p className='text-gray-600'>
					{categoryHe} {subCategoryHe && ` / ${subCategoryHe}`}
				</p>
				<p className='mt-1 text-lg text-green-600'>₪{price}</p>
			</Link>
		</div>
	);
}
```

---

## Environment Variables

ב־**Backend** (`backend/.env`):

```
ENVIRONMENT=development
AUTH_PROVIDER=jwt
MONGODB_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=…
CLOUDINARY_API_KEY=…
CLOUDINARY_API_SECRET=…
```

ב־**Frontend** (`frontend/.env`):

```
VITE_API_BASE_URL=http://localhost:5000/api
# כל משתנה שמתחיל ב־VITE_ יוזמן ל־import.meta.env
```

---

## התכוננות ל-Production

1. **Backend:**

    - ודא שכל משתני ה-env (MongoDB URI, JWT_SECRET, Cloudinary) מוגדרים בסביבה (למשל Heroku Config Vars או Docker Compose).
    - `npm run build` (אם יש transpile, TypeScript וכו׳).
    - הפעלת `node server.js` או שימוש ב־PM2/Nginx.

2. **Frontend:**

    - `npm run build` – יוצרים תיקיית `dist/`.
    - פריסה על Netlify/Vercel/S3+CloudFront או VPS אישי.
    - הגדרת `redirects` (למשל `/api/*` proxied ל־Backend).

3. **SSL/HTTPS:**

    - חשוב לעבוד על HTTPS, במיוחד כשעובדים עם JWT.
    - אם מאחסנים תמונות עם Cloudinary, הכתובת היא כבר `https://…`.

4. **Logging & Monitoring:**

    - Logging ב־Backend (Winston/Log4js)
    - הבנת Metrics (CPU, Memory) אם מוריצים על VPS.

5. **Security Best Practices:**

    - שימוש ב־Helmet (Express) להגדרות אבטחה.
    - הגבלת CORS רק לדומיין האמת.
    - Rate limiting על מסלולי login/register.

---

## תרשים זרימה (Optional)

> (ניתן להוסיף תמונה או ASCII art המתאר את ה־Flow, למשל:
>
> 1. Frontend → AuthMiddleware → JWT 验证 → Controller → Service → DB
> 2. Frontend → getProducts?search=… → Controller → Service → DB)

---

## לינקים וקרדיטים

-   [Express](https://expressjs.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [Cloudinary](https://cloudinary.com/)
-   [Joi](https://joi.dev/)
-   [react-helmet-async](https://github.com/staylor/react-helmet-async)
-   [express-rate-limit](https://github.com/nfriedly/express-rate-limit)

> **יוצר הפרויקט:** גיא חסן – [GitHub Profile](https://github.com/GuyHasan) > **התאריך**: יוני 2025
