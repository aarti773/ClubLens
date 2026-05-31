# Database Schema

ClubLens uses MongoDB with Mongoose models. The database is designed around users, events, media files, and notifications.

## 1. User Collection

Stores registered platform users and their role-based access level.

| Field | Type | Description |
|---|---|---|
| name | String | User's full name |
| email | String | Unique user email |
| password | String | Hashed password |
| role | String | User role: admin, member,|
| createdAt | Date | User creation timestamp |
| updatedAt | Date | Last update timestamp |

### Roles

- admin
- member

## 2. Event Collection

Stores club events and metadata.

| Field | Type | Description |
|---|---|---|
| title | String | Event title |
| slug | String | URL-friendly unique event slug |
| description | String | Event description |
| category | String | Event category |
| date | Date | Event date |
| coverImage | String | Optional event cover image URL |
| createdBy | ObjectId → User | Admin/user who created the event |
| createdAt | Date | Event creation timestamp |
| updatedAt | Date | Last update timestamp |

## 3. Media Collection

Stores uploaded event media and interaction data.

| Field | Type | Description |
|---|---|---|
| imageUrl | String | Cloudinary-hosted media URL |
| uploadedBy | ObjectId → User | User who uploaded the media |
| event | ObjectId → Event | Event linked to the media |
| caption | String | Optional media caption |
| tags | String[] | AI-generated or user-defined tags |
| visibility | String | public or private |
| likes | ObjectId[] → User | Users who liked the media |
| favourites | ObjectId[] → User | Users who favourited the media |
| taggedUsers | ObjectId[] → User | Users tagged in the media |
| comments | Comment[] | Embedded comments |
| createdAt | Date | Media upload timestamp |
| updatedAt | Date | Last update timestamp |

### Comment Subdocument

| Field | Type | Description |
|---|---|---|
| user | ObjectId → User | User who added the comment |
| text | String | Comment text |
| createdAt | Date | Comment creation timestamp |
| updatedAt | Date | Last update timestamp |

## 4. Notification Collection

Stores user notifications for media interactions.

| Field | Type | Description |
|---|---|---|
| recipient | ObjectId → User | User receiving the notification |
| sender | ObjectId → User | User who triggered the notification |
| media | ObjectId → Media | Related media item |
| type | String | like, comment, favourite, tag |
| message | String | Notification message |
| isRead | Boolean | Read/unread status |
| createdAt | Date | Notification creation timestamp |
| updatedAt | Date | Last update timestamp |

## Relationships

```txt
User 1 ──── * Event
User 1 ──── * Media
Event 1 ──── * Media
User * ──── * Media likes
User * ──── * Media favourites
User * ──── * Media taggedUsers
Media 1 ──── * Comments
User 1 ──── * Notifications received
User 1 ──── * Notifications sent
Media 1 ──── * Notifications