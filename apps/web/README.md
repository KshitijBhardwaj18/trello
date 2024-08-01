# Trello-Style Task Management Application

This is a full-stack Task Management Application built with **Next.js** for the frontend and **Node.js** with **Express** and **MongoDB** for the backend. The application allows users to register, log in, and manage tasks with features such as creating, updating, deleting, and retrieving tasks.


## Setup

1. **Create a `.env` file** in the `apps/api` package and add the following environment variables:

   ```plaintext
   PORT=8080
   MONGODB_URI=*****
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_jwt_secret` with a secure secret key.


2. **Create a `.env.local` file** in the `apps/web` directory and add the following environment variable:

   ```plaintext
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
   ```

3. ** Run the following in the main turborepo **

```npm i ```
```npm run dev```



## Features

- User registration and authentication
- Create, read, update, and delete tasks
- Task categorization with status and priority
- Responsive design for mobile and desktop

## Technologies Used

-**build**
- Turborepo

- **Frontend**: 
  - Next.js
  - React
  - TypeScript
  - Axios
  - Tailwind CSS
  - React Hot Toast for toasts

- **Backend**: 
  - Node.js
  - Express
  - MongoDB with Mongoose
  - JSON Web Token (JWT) for authentication
  - Bcrypt for hashing passwords
  - nodemon for local development



