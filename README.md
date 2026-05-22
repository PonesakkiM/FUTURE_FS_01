<<<<<<< HEAD
# Ponesakki M — Portfolio Website

A modern, responsive personal portfolio built with **React + Vite** (frontend) and **Node.js + Express** (backend).

## 🚀 Features

- ✅ Dark / Light mode toggle
- ✅ Typing animation (react-type-animation)
- ✅ Smooth scroll animations (Framer Motion)
- ✅ Animated skill progress bars
- ✅ Education timeline
- ✅ Project cards with category filtering
- ✅ Certificates section
- ✅ Achievements section
- ✅ "Currently Learning" section with progress bars
- ✅ Blog section
- ✅ Contact form with Node.js email backend (Nodemailer)
- ✅ Glassmorphism UI with blue accent
- ✅ Fully mobile responsive

## 📁 Structure

```
Portfolio/
├── frontend/          # React + Vite app
│   └── src/
│       └── components/
│           ├── Navbar
│           ├── Hero
│           ├── About
│           ├── Skills
│           ├── Education
│           ├── Projects
│           ├── Certificates
│           ├── Achievements
│           ├── CurrentlyLearning
│           ├── Blog
│           ├── Contact
│           └── Footer
└── backend/           # Node.js + Express API
    └── server.js
```

## ⚙️ Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:5173

### Backend (Contact Form Email)
```bash
cd backend
cp .env.example .env
# Edit .env with your Gmail credentials
npm start
```
Runs at: http://localhost:5000

### Gmail App Password Setup
1. Enable 2FA on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate a password for "Mail"
4. Use it as `EMAIL_PASS` in `.env`

## 🎨 Customization

- **Profile photo**: Replace the `photo-placeholder` div in `Hero.jsx` with an `<img>` tag
- **Resume**: Place your `resume.pdf` in `frontend/public/`
- **Social links**: Update GitHub/LinkedIn URLs in `Hero.jsx`, `Contact.jsx`, and `Footer.jsx`
- **Email**: Update `ponesakki@email.com` throughout components

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Framer Motion |
| Animations | react-type-animation, react-intersection-observer |
| Icons | react-icons (Feather Icons) |
| Backend | Node.js, Express |
| Email | Nodemailer |
| Styling | Pure CSS with CSS Variables |
=======
# FUTURE_FS_01
>>>>>>> d001cd281ca871cb9933dff4365aa1cecfc88167
