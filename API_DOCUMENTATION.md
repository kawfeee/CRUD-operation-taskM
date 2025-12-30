# Task Manager API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "",
      "bio": "",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Login User
**POST** `/auth/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "",
      "bio": "",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Get User Profile
**GET** `/auth/profile`

Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "",
      "bio": "Software Developer",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

### Update User Profile
**PUT** `/auth/profile`

Update the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "bio": "Full Stack Developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "65f1234567890abcdef12345",
      "name": "John Updated",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Full Stack Developer",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

## Task Endpoints

### Get All Tasks
**GET** `/tasks`

Get all tasks for the authenticated user with optional filters.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (pending, in-progress, completed)
- `priority` (optional): Filter by priority (low, medium, high)
- `search` (optional): Search in title and description
- `sortBy` (optional): Sort field (createdAt, dueDate, priority, title)
- `order` (optional): Sort order (asc, desc)

**Example:**
```
GET /tasks?status=pending&priority=high&sortBy=dueDate&order=asc
```

**Response (200 OK):**
```json
{
  "status": "success",
  "results": 2,
  "data": {
    "tasks": [
      {
        "_id": "65f1234567890abcdef12345",
        "user": "65f1234567890abcdef12345",
        "title": "Complete project documentation",
        "description": "Write comprehensive API documentation",
        "status": "in-progress",
        "priority": "high",
        "dueDate": "2024-01-20T00:00:00.000Z",
        "tags": ["documentation", "urgent"],
        "completed": false,
        "completedAt": null,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

### Get Single Task
**GET** `/tasks/:id`

Get a specific task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "task": {
      "_id": "65f1234567890abcdef12345",
      "user": "65f1234567890abcdef12345",
      "title": "Complete project documentation",
      "description": "Write comprehensive API documentation",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "tags": ["documentation", "urgent"],
      "completed": false,
      "completedAt": null,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

### Create Task
**POST** `/tasks`

Create a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-01-20",
  "tags": ["documentation", "urgent"]
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "65f1234567890abcdef12345",
      "user": "65f1234567890abcdef12345",
      "title": "Complete project documentation",
      "description": "Write comprehensive API documentation",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "tags": ["documentation", "urgent"],
      "completed": false,
      "completedAt": null,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

### Update Task
**PUT** `/tasks/:id`

Update an existing task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated task title",
  "status": "completed",
  "priority": "medium"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Task updated successfully",
  "data": {
    "task": {
      "_id": "65f1234567890abcdef12345",
      "user": "65f1234567890abcdef12345",
      "title": "Updated task title",
      "description": "Write comprehensive API documentation",
      "status": "completed",
      "priority": "medium",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "tags": ["documentation", "urgent"],
      "completed": true,
      "completedAt": "2024-01-16T14:20:00.000Z",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T14:20:00.000Z"
    }
  }
}
```

---

### Delete Task
**DELETE** `/tasks/:id`

Delete a task.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Task deleted successfully",
  "data": null
}
```

---

### Get Task Statistics
**GET** `/tasks/stats`

Get statistics about user's tasks.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "totalTasks": 15,
    "byStatus": [
      { "_id": "pending", "count": 5 },
      { "_id": "in-progress", "count": 7 },
      { "_id": "completed", "count": 3 }
    ],
    "byPriority": [
      { "_id": "low", "count": 4 },
      { "_id": "medium", "count": 6 },
      { "_id": "high", "count": 5 }
    ]
  }
}
```

---

## Error Responses

All errors follow this format:

**400 Bad Request:**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

**401 Unauthorized:**
```json
{
  "status": "error",
  "message": "Not authorized, no token provided"
}
```

**404 Not Found:**
```json
{
  "status": "error",
  "message": "Task not found"
}
```

**500 Internal Server Error:**
```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

---

## Status Codes

- `200` - OK (Success)
- `201` - Created
- `400` - Bad Request (Validation Error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Testing with Postman

1. Import the endpoints into Postman
2. Register a new user or login
3. Copy the token from the response
4. Set Authorization header: `Bearer <token>`
5. Test all protected endpoints

### Postman Collection

You can create a Postman collection with these endpoints and use environment variables for the base URL and token.

**Environment Variables:**
- `base_url`: `http://localhost:5000/api`
- `token`: (set after login/register)

**Authorization:**
- Type: Bearer Token
- Token: `{{token}}`
