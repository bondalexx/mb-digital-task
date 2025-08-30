  # CourseHub — Online Courses (React + TypeScript + Redux Toolkit)</br>
  </br>
  A small demo platform that meets the test task requirements:</br>
  - Course list with **cards**</br>
  - **HTML5 `<video>`** playback</br>
  - **Preview** (10s) for not purchased / not logged-in users</br>
  - **Mock purchase** flow with optimistic UI</br>
  - **Per-user purchases** persisted in `localStorage`</br>
  - **Auth** (register/login/logout) with validation and persistence</br>
  - **Redux Toolkit** for state (auth, courses, purchases, player)</br>
  - Basic responsive styling (CSS)</br>
  </br>
  ---</br>
  </br>
  ##  Features</br>
  </br>
  - **Course Catalog**: Fetch from mock API (`GET /courses`).</br>
  - **Player**: Modal with `<video>`.  </br>
    - Preview limited to **10 seconds** if user has no access.  </br>
    - **Continue from last time** (position saved per course).</br>
  - **Purchases**:</br>
    - Mock `handlePurchase(courseId)` with success/failure.</br>
    - Stored per email in `localStorage` as `ocp_purchases_<email>`.</br>
  - **Auth**:</br>
    - Register/Login form with validation:</br>
      - Email format</br>
      - Password ≥ 6 chars, one upper, one lower, one special</br>
    - User stored in `localStorage` (`ocp_user`).</br>
    - Logout clears user and **hydrates purchases for the next user**.</br>
  - **My Courses**:</br>
    - Shows only purchased courses</br>
    - “Continue from mm:ss” button (if progress exists)</br>
  </br>
  ---</br>
  </br>
  ##  Tech Stack</br>
  </br>
  - **React 18**, **TypeScript**</br>
  - **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`)</br>
  - **React Router**</br>
  - **Vite**</br>
  - CSS (minimal, responsive)</br>
  </br>
  ---</br>
  </br>
  ##  Getting Started</br>
  </br>
  - git clone https://github.com/bondalexx/mb-digital-task.git</br>
  - npm install</br>
  - npm run dev</br>
