# CourseHub — Online Courses (React + TypeScript + Redux Toolkit)

A small demo platform that meets the test task requirements:  
- Course list with **cards**  
- **HTML5 `<video>`** playback  
- **Preview** (10s) for not purchased / not logged-in users  
- **Mock purchase** flow with optimistic UI  
- **Per-user purchases** persisted in `localStorage`  
- **Auth** (register/login/logout) with validation and persistence  
- **Redux Toolkit** for state (auth, courses, purchases, player)  
- Basic responsive styling (CSS)  

---

## ✨ Features

- **Course Catalog**: Fetch from mock API (`GET /courses`).  
- **Player**: Modal with `<video>`.  
  - Preview limited to **10 seconds** if user has no access.  
  - **Continue from last time** (position saved per course).  
- **Purchases**:  
  - Mock `handlePurchase(courseId)` with success/failure.  
  - Stored per email in `localStorage` as `ocp_purchases_<email>`.  
- **Auth**:  
  - Register/Login form with validation:  
    - Email format  
    - Password ≥ 6 chars, one upper, one lower, one special  
  - User stored in `localStorage` (`ocp_user`).  
  - Logout clears user and **hydrates purchases for the next user**.  
- **My Courses**:  
  - Shows only purchased courses  
  - “Continue from mm:ss” button (if progress exists)  

---

## 🧱 Tech Stack

- **React 18**, **TypeScript**  
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`)  
- **React Router**  
- **Vite**  
- CSS (minimal, responsive)  

---

## 🚀 Getting Started

```bash
git clone https://github.com/bondalexx/mb-digital-task.git
cd mb-digital-task
npm install
npm run dev
