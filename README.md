# CareerScope — Interactive Tech Career Pathway & Learning Roadmap Platform

CareerScope is a modern, full-stack MERN application designed to help aspiring tech professionals explore technical career pathways, understand salary distributions, learn step-by-step roadmaps, and save personalized bookmarks.

---

## 🌟 Key Features

- **Interactive Career Directory**: Search and filter through 50+ career pathways across 10 industry sectors.
- **Visual Learning Roadmaps**: Step-by-step vertical timeline guides leading from beginner concepts to job-ready skillsets.
- **Category & Difficulty Filtering**: Filter by Easy, Medium, or Hard difficulty tiers, or explore specific sectors like AI/ML, Cloud, Cybersecurity, or Software Engineering.
- **Search & Multi-Criteria Sorting**: Real-time keyword search with sorting by Title, Newest, Highest Salary, Difficulty, and Learning Duration.
- **User Authentication & Profiles**: Secure JWT-based registration and login system with persistent local state.
- **Bookmarks Management**: Save interest pathways to your account with instant toggle micro-animations.
- **Light & Dark Mode**: Persistent theme switching with system preference detection and CSS custom variables.
- **Responsive & Accessible Design**: Built with React 19, Vite, and Tailwind CSS v4, supporting mobile drawers, modals, toast alerts, and skeleton loaders.
- **Automated Database Seeder**: Command-line seeding script populating 10 categories, 50 detailed careers, and default admin credentials.

---

## 🛠️ Technology Stack

### Frontend (Client)
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Icons**: Lucide React
- **HTTP Client**: Axios (with custom request/response interceptors)

### Backend (Server)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas / Mongoose ORM
- **Security**: JSON Web Tokens (JWT), bcryptjs password hashing
- **Validation**: express-validator

---

## 📁 Project Structure

```text
careerScope/
├── client/                     # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components (Navbar, Footer, CareerCard, Modal, Toast, etc.)
│   │   ├── context/           # React contexts (AuthContext, ThemeContext, BookmarkContext, ToastContext)
│   │   ├── layouts/           # Page wrapper layouts (MainLayout)
│   │   ├── pages/             # Route views (Home, Explore, CareerDetails, LearningRoadmap, Dashboard, etc.)
│   │   ├── services/          # Centralized Axios API client (api.js)
│   │   ├── App.jsx            # Application root & router
│   │   └── index.css          # Tailwind CSS v4 directives & Google Fonts
│   ├── vercel.json            # Vercel SPA deployment configuration
│   └── vite.config.js         # Vite dev server & proxy settings
│
├── server/                     # Express + Node.js Backend
│   ├── config/                # Database connection handler (db.js)
│   ├── controllers/           # API business logic handlers
│   ├── middleware/            # Auth protection, admin validation, & error handling
│   ├── models/                # Mongoose schemas (User, Category, Career, Bookmark)
│   ├── routes/                # Express API route definitions
│   ├── seed/                  # Seeder scripts (dataSeed.js, adminSeed.js)
│   ├── render.yaml            # Render deployment blueprint
│   ├── app.js                 # Express application setup
│   └── server.js              # Server entry point listener
│
├── package.json                # Root concurrently dev scripts
└── README.md                   # Project documentation
```

---

## 🚀 Quickstart & Setup Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection string (or local MongoDB server)

### 2. Installation
Clone the repository and install dependencies for both root, client, and server:

```bash
# Clone the repository
git clone https://github.com/your-username/careerscope.git
cd careerScope

# Install root dependencies (concurrently)
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### 3. Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/careerscope?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key_careerscope_2026
JWT_EXPIRE=30d
```

---

## 🗄️ Database Seeding

To populate MongoDB with 10 categories, 50 careers, and the default admin user:

```bash
cd server
npm run seed:data
```

### Default Credentials
- **Admin User**: `admin@careerscope.com` / `adminpassword123`

---

## 🖥️ Running Locally

Run both the Express backend (port 5000) and Vite frontend (port 3000) concurrently:

```bash
# Run from the root directory
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Login user & return JWT | Public |
| `GET` | `/api/auth/me` | Fetch authenticated profile | Private |
| `GET` | `/api/categories` | Get all categories catalog | Public |
| `GET` | `/api/categories/:slug` | Get single category details | Public |
| `POST` | `/api/categories` | Create new category | Admin |
| `GET` | `/api/careers` | Get paginated, filtered, & sorted careers | Public |
| `GET` | `/api/careers/:slug` | Get single career pathway details | Public |
| `POST` | `/api/careers` | Create new career record | Admin |
| `GET` | `/api/bookmarks` | Get logged-in user's saved bookmarks | Private |
| `POST` | `/api/bookmarks` | Add career to bookmarks | Private |
| `DELETE` | `/api/bookmarks/:careerId` | Remove career from bookmarks | Private |

---

## 🌐 Cloud Deployment Guide

### Frontend Deployment (Vercel)
1. Push your code to GitHub.
2. Connect your repository on [Vercel](https://vercel.com).
3. Set the **Root Directory** to `client`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy! The included `client/vercel.json` ensures client-side routes work seamlessly.

### Backend Deployment (Render)
1. Connect your repository on [Render](https://render.com).
2. Create a new **Web Service** using the `server` directory.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`.
6. Deploy!

---

## 📝 License

This project is open-source and available under the MIT License.
