# My Portfolio — Full Stack Next.js App

A full-stack developer portfolio built with Next.js 16, MongoDB, and Tailwind CSS. Features a public-facing portfolio with an AI agent, contact form, and an admin dashboard to manage projects and messages.

---

## 🚀 Live Demo

Link: `https://intekhabx.vercel.app/`

---

## 📌 Project Overview

This is not just a static portfolio — it's a complete full-stack web application that demonstrates all major Next.js concepts including file-based routing, server/client components, API routes, server actions, ISR, SSR, SSG, streaming responses, and MongoDB integration.

Visitors can view projects, chat with an AI agent about my work, and send messages via a contact form. The admin can log in to a private dashboard to manage projects (add, edit, delete) and read/delete incoming messages.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animation | Framer Motion |
| Database | MongoDB (Mongoose) |
| Auth | JWT (via cookies) |
| Form Validation | React Hook Form + Zod |
| HTTP Client | Axios |
| AI Agent | LLM-powered streaming chat (`/api/agent`) |
| Image Hosting | ImageKit |
| Icons | React Icons |
| Fonts | DM Serif Display, Bebas Neue, Inter |
| Deployment | Vercel |

---

## ✨ Features Implemented

### Public Portfolio
- Light and dark themed portfolio with an accent color and a navigation bar with section shortcuts
- Hero section with animated intro, typed greeting and an orbiting accent border on the status badge
- **AI Agent** — a streaming chat assistant that answers questions about my projects, tech stack, experience and availability
  - Every visitor gets a session, and the chat can be reset at any time
  - Replies stream in live and render as Markdown
  - Terminal-style panel on desktop; on phones it opens from a floating AI button as a full-screen overlay
- **Technology Stack** section with categorised skills, levels and a scrolling tech ticker
- **Selected Work** section fetched from MongoDB with ISR (revalidates every 60s), with project images, tags, GitHub and live demo links
- **How I Work** section covering my process (Plan, Build, Integrate, Deploy) and working principles
- **About** section with education timeline and social links
- **GitHub** section with contributions heatmap, active days, top languages and achievements
- Contact form with Server Action — saves message to MongoDB, with validation errors and a copy-email shortcut
- Resume download
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
│       ├── agent/              # AI agent: session + streaming chat
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
│       ├── ChatAgent/          # AI agent UI
│       │   ├── ChatAgent.tsx
│       │   └── MarkdownMessage.tsx
│       ├── Typedgreeting.tsx
│       ├── Sectionheader.tsx
│       ├── ProjectsSection.tsx
│       ├── ProjectRowClient.tsx
│       ├── AboutSection.tsx
│       ├── ContactSection.tsx
│       └── Footer.tsx          # (+ Tech Stack, How I Work and GitHub section components)
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

# imagekit
IMAGEKIT_PUBLIC_KEY=imagekit-publickey
IMAGEKIT_PRIVATE_KEY=imagekit-privatekey
IMAGEKIT_URL_ENDPOINT=imageit-endpoint

# ai agent
LLM_API_KEY=your-llm-api-key
LLM_BASE_URL=your-provider-base-url
LLM_MODEL=your-llm-model

# redis 
REDIS_API_URL=add-your-redis_url

#web-search
TAVILY_API_KEY=your-tavily-api-key
```

> If you use ImageKit (project images) or an LLM provider (AI agent), add their keys here too.

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
| `GET` | `/api/agent/session` | Gives each visitor a session for the AI agent |
| `POST` | `/api/agent/chat` | Takes `{ prompt }` and streams the agent's reply |
| `PATCH` | `/api/agent/chat` | Resets the visitor's conversation |

---

## ⚡ Server Actions

| Action | File | Use Case |
|---|---|---|
| `submitContactMessage()` | `lib/actions.ts` | Contact form submission → saves to MongoDB |

**Why Server Action here instead of API Route?**

The contact form is a form submission from the UI — Server Actions are the correct Next.js pattern for this. No separate fetch/axios call needed, no API endpoint exposed publicly. The action runs on the server, validates input, and saves to DB directly.

API Routes are used for the admin dashboard because they are called from client components using axios with full CRUD control. The AI agent also uses an API Route, because the reply is streamed back to the client in chunks.

---

## 📊 Rendering Strategies

| Page/Feature | Strategy | Reason |
|---|---|---|
| Home page | SSG + ISR (60s) | Projects rarely change, revalidate periodically |
| About section | SSG | Fully static content |
| Hero section | SSG | Static content, no data needed |
| AI agent | Client + streaming API Route | Replies arrive live, chunk by chunk |
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
| API Routes | All CRUD operations for messages & projects, AI agent |
| GET, POST, PUT/PATCH, DELETE | All implemented in `/api/message` and `/api/project` |
| Streaming responses | `/api/agent/chat` streamed to the client |
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
- Project images are hosted on ImageKit — no local file storage
- Contact form stores messages in DB only — no email notification
- No pagination on messages/projects list (suitable for small portfolio scale)

---

## 👨‍💻 Author

**Md Intekhab Alam**
- GitHub: [@intekhabx](https://github.com/intekhabx)
- LinkedIn: [https://www.linkedin.com/in/intekhabx](https://www.linkedin.com/in/intekhabx)
- Portfolio: [https://intekhabx.vercel.app/](https://intekhabx.vercel.app/)
