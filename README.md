# ClubLens

Smart Event & Media Management Platform for Clubs, Societies, and Student Communities.

## Overview

ClubLens is a full-stack MERN application designed to help clubs and societies organize, manage, discover, and share event media from a centralized platform.

Traditional event media is often scattered across personal devices, cloud drives, and messaging groups, making it difficult to organize and retrieve content. ClubLens solves this problem by providing a unified platform where members can upload, discover, and interact with event media efficiently.

The platform combines cloud-based media management, role-based access control, personalized photo discovery, social interaction features, analytics, and smart search capabilities.

---

## Live Demo

**Frontend:** https://club-lens-frontend.vercel.app

**Backend API:** https://club-lens-q35q.vercel.app

**GitHub Repository:** https://github.com/aarti773/ClubLens

---

## Demo Credentials

### Admin Account

**Email:** [admin@clublens.com](mailto:admin@clublens.com)

**Password:** 1234567

### Member Account

**Email:** [member@clublens.com](mailto:member@clublens.com)

**Password:** 12345

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
* Dynamic event pages
* Event metadata management

### Media Management

* Photo uploads
* Video uploads and playback
* Cloudinary-based media storage
* Upload preview before submission
* Public and private media visibility
* Media deletion for owners
* Centralized gallery across events

### Social Features

* Likes
* Comments
* Favourites
* User tagging
* Media sharing

### Smart Features

* Facial-recognition based personalized photo discovery
* Advanced media search
* Media tagging
* Dynamic watermarking
* Real-time notifications

### Analytics Dashboard

* Total events statistics
* Total media statistics
* Photo and video analytics
* User analytics
* Private media statistics

### Admin Features

* Create events
* Manage user roles
* View platform users
* Upload media
* Access platform analytics

---

## User Roles

### Admin

* Create events
* Upload media
* Manage users
* Access analytics dashboard

### Member

* Upload media
* Like media
* Comment on media
* Favourite media
* Use personalized photo discovery

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

### AI & Computer Vision

* face-api.js

### Deployment

* Vercel

---

## Architecture Highlights

* MERN-based architecture
* Cloudinary media storage integration
* JWT authentication
* Role-based authorization
* Analytics dashboard
* Event-centric media organization
* Facial-recognition powered photo discovery
* REST API architecture

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

### Clone Repository

```bash
git clone https://github.com/aarti773/ClubLens.git
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Documentation

* DATABASE_SCHEMA.md
* ARCHITECTURE.md

---

## Author

**Aarti**

Mechanical Engineering, IIT Roorkee
