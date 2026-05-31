# ClubLens Architecture

ClubLens follows a MERN-based client-server architecture with cloud media storage and AI-powered client-side facial recognition.

## High-Level Architecture

```txt
User
 |
 | interacts through browser
 v
React + Vite Frontend
 |
 | REST API calls using fetch
 v
Express.js Backend API
 |
 | stores structured data
 v
MongoDB Atlas

Express.js Backend
 |
 | uploads and retrieves media URLs
 v
Cloudinary

Frontend
 |
 | face-api.js based selfie matching
 v
Personalized Photo Discovery

Frontend Layer

The frontend is built using React, Vite, Tailwind CSS, and React Router.

Main responsibilities:

User interface and navigation
Authentication state management using AuthContext
Protected routes
Event browsing and event details
Media upload with preview
Gallery and search interface
My Photos personalized gallery
Admin role management dashboard
Notification dropdown
Backend Layer

The backend is built using Node.js and Express.js.

Main API modules:

Route	Purpose
/api/auth	Register, login, JWT authentication
/api/users	User profile, admin user role management
/api/events	Event creation and event listing
/api/media	Media upload, gallery, search, likes, comments, favourites
/api/notifications	User notifications

Middleware used:

cors
helmet
morgan
express.json
JWT protection middleware
Role-based access middleware
Multer upload middleware
Database Layer

MongoDB Atlas stores structured platform data.

Main collections:

Users
Events
Media
Notifications

Media files are not stored directly in MongoDB. Only Cloudinary URLs and metadata are stored.

Cloud Storage Layer

Cloudinary is used for cloud-based media storage.

Responsibilities:

Store uploaded images
Return secure media URLs
Support scalable media delivery
AI Layer

ClubLens includes AI-based media features:

AI-generated media tags
Search using captions, tags, event names, upload dates, and users
Personalized gallery using face-api.js
Selfie-based face matching
Matching photo discovery
Access Control

ClubLens uses JWT-based authentication and role-based authorization.

Supported roles:

Admin
Member

Example permissions:

Admin can create events and manage user roles
Admin, and member can upload media
Logged-in users can like, comment, favourite, and tag users
Public media can be viewed by everyone
Private media is restricted based on access rules
Data Flow: Media Upload
User selects image
 |
Frontend shows preview
 |
Frontend sends image + metadata to backend
 |
Multer processes file
 |
Backend uploads image to Cloudinary
 |
Cloudinary returns image URL
 |
Backend stores media metadata in MongoDB
 |
Gallery displays uploaded media
Data Flow: Personalized Photo Discovery
User uploads selfie
 |
Frontend detects face using face-api.js
 |
Frontend compares selfie with event media
 |
Matching photos are filtered
 |
My Photos page displays personalized results
Security Considerations
Passwords are hashed using bcrypt
JWT is used for protected routes
Role-based middleware protects admin and upload actions
Helmet is used for basic HTTP security headers
Media metadata is stored separately from cloud files
