# FitLog

A modern and responsive workout library web application built with **Next.js, TypeScript, and Tailwind CSS**.

FitLog helps users explore workouts, view workout details, create a personal workout plan, save workouts for later, and track completed workouts.

---

## 🚀 Live Demo

[Live Demo](#)

---

## 📂 GitHub Repository

[GitHub Repository](#)

---

## ✨ Features

- 🏋️ Browse workout library
- 🔎 View detailed workout information
- ➕ Add workouts to today's plan
- 🔖 Save workouts for later
- ✅ Mark planned workouts as completed
- 🗑️ Remove workouts from plan or saved list
- 📊 Dynamic workout statistics
- 🔄 Sort workouts by duration, calories, or rating
- 💾 Persistent data using Local Storage
- 🔔 Toast notifications for user actions
- 📱 Fully responsive design
- 🌙 Modern dark fitness-focused UI
- ❌ Custom 404 page
- ⏳ Loading animation while content loads

---

## 🛠️ Technologies Used

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **JavaScript**
- **Local Storage**
- **REST API**

---

## 🌐 API

FitLog uses the following API:

### Get All Workouts

```text
GET https://api.abcz.workers.dev/api/fitlog


#📁 Project Structure

fit-log/
├── public/
│
├── src/
│   ├── app/
│   │   ├── my-plan/
│   │   │   └── page.tsx
│   │   │
│   │   ├── workouts/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── Library.tsx
│   │   │   └── WorkoutCard.tsx
│   │   │
│   │   ├── providers/
│   │   │   └── FitLogProvider.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Toast.tsx
│   │   │
│   │   └── workout/
│   │       └── WorkoutActions.tsx
│   │
│   ├── lib/
│   │   └── api/
│   │       └── fitlog.ts
│   │
│   └── types/
│       └── fitlog.ts
│
├── next.config.ts
├── package.json
└── README.md



#⚙️ Installation

git clone YOUR_GITHUB_REPOSITORY_URL
cd fit-log
npm install


#▶️ Run Development Server
npm run dev

#Then open:
http://localhost:3000


#🏗️ Build for Production
Create a production build:

npm run build
npm start


#💾 Data Persistence

FitLog uses Local Storage to persist:

Today's workout plan
Saved workouts
Completed workouts

This allows user data to remain available after refreshing the browser.



#📱 Responsive Design

The application is designed to work across:

📱 Mobile
📲 Tablet
💻 Desktop



#🎨 UI Design

The interface follows a dark fitness-focused design system with:

Dark background
Lime accent color
Workout cards
Responsive navigation
Clean typography
Minimal and modern layout



#🔮 Future Improvements

Possible future improvements:

User authentication
Cloud-based workout persistence
Workout search
Advanced filtering
Workout history
Progress tracking
Personal fitness statistics
User profile
Backend database integration



#👨‍💻 Author

Abul Hossain

Aspiring Full Stack Web Engineer
Next.js & TypeScript Developer



#📄 License

This project is created for learning and portfolio purposes.

```
