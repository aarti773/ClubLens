# ClubLens Architecture

ClubLens follows a MERN-based client-server architecture with cloud media storage, role-based access control, analytics, and facial-recognition powered media discovery.

---

# High-Level Architecture

```txt
User
 |
 v
React + Vite Frontend
 |
 | REST API Requests
 v
Express.js Backend
 |
 +----------------+
 |                |
 v                v
MongoDB Atlas   Cloudinary
 |
 v
Platform Data

Frontend
 |
 v
face-api.js
 |
 v
Personalized Photo Discovery
```

---

# Frontend Layer

The frontend is built using React, Vite, Tailwind CSS, and React Router.

### Responsibilities

* User interface and navigation
* Authentication state management
* Protected routes
* Event browsing
* Media upload and preview
* Gallery management
* Advanced search
* Personalized photo discovery
* Analytics dashboard
* Notifications system
* Admin controls

---

# Backend Layer

The backend is built using Node.js and Express.js.

### Main API Modules

| Route              | Purpose                |
| ------------------ | ---------------------- |
| /api/auth          | Registration and login |
| /api/users         | User management        |
| /api/events        | Event management       |
| /api/media         | Media operations       |
| /api/notifications | Notifications          |
| /api/dashboard     | Analytics dashboard    |

### Middleware

* cors
* helmet
* morgan
* express.json
* JWT authentication middleware
* Role-based authorization middleware
* Multer upload middleware

---

# Database Layer

MongoDB Atlas stores structured application data.

### Collections

* Users
* Events
* Media
* Notifications

Media files are stored in Cloudinary while metadata is stored in MongoDB.

---

# Cloud Storage Layer

Cloudinary is used for media storage and delivery.

### Responsibilities

* Store uploaded images
* Store uploaded videos
* Generate secure URLs
* Support scalable media delivery

---

# Smart Features Layer

### Media Discovery

* Facial-recognition powered photo discovery
* Selfie-based matching
* Personalized media gallery

### Search System

* Search using captions
* Search using tags
* Search using event names
* Search using upload dates
* Search using uploader names

### Media Enhancements

* Dynamic watermarking
* Media tagging
* User tagging

---

# Analytics Layer

ClubLens includes a platform analytics dashboard.

### Dashboard Metrics

* Total events
* Total media
* Photos count
* Videos count
* Total users
* Private media count

Analytics are generated using MongoDB document counts and aggregation queries.

---

# Access Control

ClubLens uses JWT authentication and role-based authorization.

### Roles

* Admin
* Member

### Permissions

#### Admin

* Create events
* Manage users
* Upload media
* Access analytics

#### Member

* Upload media
* Like media
* Comment on media
* Favourite media
* Tag users

#### Guest

* View public content

---

# Media Upload Flow

```txt
User selects media
        |
        v
Frontend preview
        |
        v
Backend receives file
        |
        v
Multer processes upload
        |
        v
Cloudinary stores media
        |
        v
MongoDB stores metadata
        |
        v
Gallery displays media
```

---

# Personalized Photo Discovery Flow

```txt
User uploads selfie
        |
        v
face-api.js detects face
        |
        v
Face embeddings generated
        |
        v
Compare with event media
        |
        v
Matching photos filtered
        |
        v
My Photos page displays results
```

---

# Security Considerations

* Passwords hashed using bcrypt
* JWT-based authentication
* Protected routes
* Role-based authorization
* Helmet security headers
* Cloud media separated from database metadata

---

# Scalability Considerations

* Cloudinary handles media delivery
* MongoDB Atlas provides scalable storage
* REST-based API design
* Analytics endpoints separated from media operations
* Role system can be extended in future
