# ClubLens

AI-powered Event & Media Management Platform for clubs and societies.

## Overview

ClubLens is a full-stack MERN web application designed to help clubs and societies organize, manage, and share event media from a centralized platform.

The platform supports event-wise media organization, cloud-based media storage, social interactions, AI-powered search, personalized photo discovery, and role-based access control.

Instead of storing photos across multiple drives and folders, ClubLens provides a single platform where members can upload, organize, discover, and interact with event media efficiently.

---

## Live Demo

Frontend: https://club-lens-frontend.vercel.app

Backend API: https://club-lens-q35q.vercel.app

GitHub Repository: https://github.com/aarti773/ClubLens

---

## Demo Credentials

### Admin Account

Email: [admin@clublens.com]

Password: 1234567

### Member Account

Email: [member@clublens.com]

Password: 12345

---

## Features

### Authentication & Access Control

* User registration and login
* JWT-based authentication
* Persistent login sessions
* Protected routes
* Role-based access control

### Event Management

* Create and manage events
* Event-wise media organization
* Event descriptions and metadata
* Dynamic event pages

### Media Management

* Cloudinary-based image storage
* Multi-image uploads
* Upload preview before submission
* Public and private media visibility
* Central gallery across events

### Social Features

* Like photos
* Comment on photos
* Favourite media
* Share event content

### AI Features

* Advanced media search
* Facial-recognition based personalized photo discovery

### Notifications

* Like notifications
* Comment notifications
* User interaction alerts

### Admin Features

* Create events
* Manage user roles
* View platform users
* Upload media

---

## User Roles

### Admin

* Create events
* Upload media
* Manage users
* Access administrative controls

### Member

* Upload media
* Like photos
* Comment on photos
* Favourite media
* Access event galleries

### Guest

* Browse public events
* View public media

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcrypt

### Cloud Storage

* Cloudinary

### AI

* Gemini API
* face-api.js

### Deployment

* Vercel

---

## Project Structure

```txt
ClubLens/
├── client/                  Frontend React application
├── server/                  Backend Express API
├── README.md
├── DATABASE_SCHEMA.md
└── ARCHITECTURE.md
```

---

## Database Schema

### User

* name
* email
* password
* role

### Event

* title
* description
* category
* date
* createdBy

### Media

* imageUrl
* event
* uploadedBy
* likes
* favourites
* comments

---

## Environment Variables

### Server

```env
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
```

### Client

```env
VITE_API_URL=
```

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/aarti773/ClubLens.git
```

Install backend dependencies:

```bash
cd server
npm install
npm run dev
```

Install frontend dependencies:

```bash
cd client
npm install
npm run dev
```

---

## Documentation

* Database Schema: DATABASE_SCHEMA.md
* Architecture: ARCHITECTURE.md

---

## Author

Aarti
