MusicMeet

A full-stack web application that helps musicians and venues connect, collaborate, and organise events. Built with the MERN stack and deployed with Netlify and Render.

Author

Haluk (Luke) Joshua Gurel  
Ironhack Web Development Bootcamp Final Project  
Deployed Frontend: [https://musicmeet.netlify.app]

---

Project Overview

MusicMeet is a platform where musicians, bands, and venues can:
- Sign up and log in securely.
- Create and manage music-related events.
- View other users’ profiles.
- Edit or delete their own events.
- Comment on events.
- Add or remove events to their favourites.
- Network with one another in a friendly and organised way.

---

Technologies used:

Frontend:
- React (https://reactjs.org/)
- React Router (https://reactrouter.com/)
- Axios (https://axios-http.com/)
- Tailwind CSS (https://tailwindcss.com/) *for styling*
- Vite (https://vitejs.dev/) *as the build tool*
- Netlify (https://www.netlify.com/) *for deployment*

Backend:
- Node.js (https://nodejs.org/)
- Express.js (https://expressjs.com/)
- MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
- Mongoose (https://mongoosejs.com/)
- Cloudinary (https://cloudinary.com/) *for image uploads*
- JWT (https://jwt.io/) *for authentication*
- Render (https://render.com/) *for deployment*
- CORS, bcrypt

---

music-meet-frontend/
│
├── public/
│   ├── _redirects         ← Netlify routing fix for SPA
│   ├── .png images        ← Static assets
│
├── src/
│   ├── components/        ← Reusable components (Navbar, Auth wrappers)
│   ├── context/           ← AuthContext
│   ├── pages/             ← Page-level views (HomePage, LoginPage, etc.)
│   ├── services/          ← Axios service classes for API calls
│   ├── App.jsx            ← App routes
│   ├── main.jsx           ← App entry point

---

Instillation instructions:

1. Clone the repos:

git clone https://github.com/yourusername/music-meet-frontend.git

git clone https://github.com/yourusername/music-meet-backend.git

---

2. Install all the necessary dependencies:

Frontend:
cd music-meet-frontend
npm install **axios, tailwindcss @ tailwindcss/vite, etc...**

Backend:
cd ../music-meet-backend
npm install **mongoose, cors, cloudinary, etc...**

---

3. Create .env files:

In the backend .env file:
PORT=5005
MONGODB_URI=**your-mongodb-atlas-connection-string**
TOKEN_SECRET=**whatever-you-believe-to-be-safe**
CLOUDINARY_NAME=**credentials from https://cloudinary.com/console**
CLOUDINARY_KEY=**credentials from https://cloudinary.com/console**
CLOUDINARY_SECRET=**credentials from https://cloudinary.com/console**


In the frontend .env file:
VITE_SERVER_URL=https://**whatever-your-backend-url-is**.onrender.com

---

4. Run the Apps Locally in separate terminals:

Frontend: 
npm run dev

Backend:
npm run dev

---

Deployment notes

Netlify (Frontend):

Ensure SPA handles routing properly by:

- Creating a file in the "/public" folder, called "_redirects", with just this line of code:

/*    /index.html   200

---

Features:

- JWT-based Authentication

- CRUD functionality for events

- User Profiles & View Pages

- Protected routes with custom IsPrivate and IsAnon components

- Responsive TailwindCSS UI

- Graceful error handling (including custom 404 page)

---

Future Improvements:

- Add map integration to show event locations

- Add event filtering or search

- Add chat or messaging between users

---

Challenges Faced:

- Environment variables in Netlify: Needed to use VITE_ prefix for frontend env variables.

- SPA routing 404s: Solved by adding a _redirects file in the /public folder.

- JWT management: Used localStorage and Axios interceptors for attaching tokens automatically.

---

Lessons Learned:

- Proper deployment configuration is just as important as building the app.

- Clear separation between frontend and backend improves maintainability.

- Handling authentication and authorisation in a secure and user-friendly way takes planning.
