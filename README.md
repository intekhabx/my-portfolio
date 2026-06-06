# My Portfolio — Full Stack Next.js App

A full-stack developer portfolio built with Next.js 16, MongoDB, and Tailwind CSS. Features a public-facing portfolio with contact form and an admin dashboard to manage projects and messages.

---

## 🚀 Live Demo

Link: `https://intekhabx.vercel.app/`

---

## 📌 Project Overview

This is not just a static portfolio — it's a complete full-stack web application that demonstrates all major Next.js concepts including file-based routing, server/client components, API routes, server actions, ISR, SSR, SSG, and MongoDB integration.

Visitors can view projects and send messages via a contact form. The admin can log in to a private dashboard to manage projects (add, edit, delete) and read/delete incoming messages.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Database | MongoDB (Mongoose) |
| Auth | JWT (via cookies) |
| Form Validation | React Hook Form + Zod |
| HTTP Client | Axios |
| Icons | React Icons |
| Fonts | DM Serif Display, Bebas Neue, Inter |
| Deployment | Vercel |

---

## ✨ Features Implemented

### Public Portfolio
- Warm Parchment themed portfolio with vertical sidebar navigation
- Hero section with MERN stack logo showcase
- Projects section fetched from MongoDB with ISR (revalidates every 60s)
- About section with skills grid
- Contact form with Server Action — saves message to MongoDB
- Fully responsive layout

### Admin Dashboard
- Secure login page with JWT authentication
- Protected admin routes
- **Messages page** — view all messages, mark as read, delete
- **Projects page** — view all projects, add, edit, delete
- **Dashboard overview** — stats cards + recent messages + recent projects
- Dark themed dashboard consistent with portfolio's design language

---

## 📁 Folder Structure

```
my-portfolio/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page (SSG + ISR)
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard overview (SSR)
│   │   └── login/
│   │       └── page.tsx        # Admin login page
│   └── api/
│       ├── auth/               # Login / Logout API routes
│       ├── message/            # GET all, DELETE, PUT (mark read)
│       └── project/            # GET all, POST, PATCH, DELETE
│
├── components/
│   ├── dashboard/              # Admin dashboard components
│   │   ├── DashboardSidebar.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── Message.tsx
│   │   ├── Project.tsx
│   │   ├── AddProjectForm.tsx
│   │   └── UpdateProjectForm.tsx
│   └── home/                   # Portfolio public components
│       ├── Sidebar.tsx
│       ├── HeroSection.tsx
│       ├── HeroTopBar.tsx
│       ├── HeroMiddle.tsx
│       ├── HeroBottomBar.tsx
│       ├── ProjectsSection.tsx
│       ├── ProjectRowClient.tsx
│       ├── AboutSection.tsx
│       ├── ContactSection.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── db.ts                   # MongoDB connection
│   ├── actions.ts              # Server Actions
│   └── validation.ts           # Zod schemas
│
├── models/
│   ├── message.model.ts        # Message Mongoose model
│   └── project.model.ts        # Project Mongoose model
│
└── utils/                      # Helper utilities
```

---

## 🗄 Database Setup

1. Go to MongoDB Atlas and create a free account
2. Create a new cluster
3. Click **Connect** → **Drivers** → copy the connection string
4. Replace `<password>` with your DB user password
5. Add it to your `.env` file (see below)

**Collections used:**
- `messages` — stores contact form submissions
- `projects` — stores portfolio projects

---

## 🔐 Environment Variables

Create a `.env` file in the root of your project:

```env
MONGODB_URI=mongodb_uri/porfolio

JWT_SECRET=your_super_secret_jwt_key_here
JWT_SECRET_EXPIRES_IN=jwt_expires_time

ADMIN_EMAIL=your_admin_email@gmail.com
ADMIN_PASSWORD=your_admin_password

NODE_ENV=development_or_production
```

> ⚠️ Never commit `.env` to GitHub. It's already in `.gitignore` by default.

---

## 🏃 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/intekhabx/my-portfolio
cd my-portfolio

# 2. Install dependencies
npm install

# 3. Create environment variables
cp env.example .env
# Fill in your values in .env

# 4. Run the development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

---

## 🛣 Routes / Pages

| Route | Type | Description |
|---|---|---|
| `/` | SSG + ISR | Public portfolio home page |
| `/admin/login` | SSG | Admin login page |
| `/admin/dashboard` | SSR | Dashboard overview |
| `/admin/messages` | Client | All messages list |
| `/admin/projects` | Client | All projects list |

---

## 🔌 API Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login, sets JWT cookie |
| `POST` | `/api/auth/logout` | Clears auth cookie |
| `GET` | `/api/message` | Fetch all messages |
| `DELETE` | `/api/message/[id]` | Delete a message |
| `PUT` | `/api/message/[id]` | Mark message as read |
| `GET` | `/api/project` | Fetch all projects |
| `POST` | `/api/project` | Add a new project |
| `PATCH` | `/api/project/[id]` | Update a project |
| `DELETE` | `/api/project/[id]` | Delete a project |

---

## ⚡ Server Actions

| Action | File | Use Case |
|---|---|---|
| `submitContactMessage()` | `lib/actions.ts` | Contact form submission → saves to MongoDB |

**Why Server Action here instead of API Route?**

The contact form is a form submission from the UI — Server Actions are the correct Next.js pattern for this. No separate fetch/axios call needed, no API endpoint exposed publicly. The action runs on the server, validates input, and saves to DB directly.

API Routes are used for the admin dashboard because they are called from client components using axios with full CRUD control.

---

## 📊 Rendering Strategies

| Page/Feature | Strategy | Reason |
|---|---|---|
| Home page | SSG + ISR (60s) | Projects rarely change, revalidate periodically |
| About section | SSG | Fully static content |
| Hero section | SSG | Static content, no data needed |
| Admin dashboard | SSR | Always needs fresh message/project data |
| Contact form | Server Action | Form mutation, no need for API route |
| Admin CRUD | Client + API Routes | Dynamic, user-driven operations |

---

## 📚 Next.js Concepts Covered

| Concept | Where Used |
|---|---|
| File-based routing | `app/` directory structure |
| Layouts | `app/layout.tsx`, admin layout |
| Multiple pages/routes | Home, Login, Dashboard, Messages, Projects |
| Server Side Rendering | Admin dashboard page |
| Static Site Generation | Hero, About, Home page shell |
| Incremental Static Regeneration | Projects section (revalidate: 60) |
| API Routes | All CRUD operations for messages & projects |
| GET, POST, PUT/PATCH, DELETE | All implemented in `/api/message` and `/api/project` |
| Database connection | MongoDB via Mongoose (`lib/db.ts`) |
| Structured API responses | `{ success, data, message, error }` format |
| Error handling | try/catch in all API routes and actions |
| Server Actions | `submitContactMessage()` in `lib/actions.ts` |
| `use server` directive | Used in `lib/actions.ts` |
| `use client` directive | All interactive components |
| Server vs Client components | Properly separated throughout |

---

## ⚠️ Assumptions & Limitations

- Admin authentication is simple JWT-based — no OAuth or third-party auth
- Only one admin user supported (credentials in env variables)
- No image upload for projects — only links
- Contact form stores messages in DB only — no email notification
- No pagination on messages/projects list (suitable for small portfolio scale)

---

## 👨‍💻 Author

**Md Intekhab Alam**
- GitHub: [@intekhabx](https://github.com/yourusername)
- LinkedIn: [https://www.linkedin.com/in/intekhabx](https://www.linkedin.com/in/intekhabx)
- Portfolio: [https://intekhabx.vercel.app/](https://intekhabx.vercel.app/)