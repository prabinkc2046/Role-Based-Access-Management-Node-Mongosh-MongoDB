# Role-Based Access Management App

This application is built with **Node.js** and **Express** to manage user authentication, role-based access, and permissions. It supports adding roles, assigning permissions, and restricting access to specific routes based on user roles.

---

## **Features**

- User registration with email, password, and role assignment.
- Secure password hashing using `bcrypt`.
- Role-based access control with dynamic role and permission management.
- Middleware for token verification and role validation.
- Centralized error handling.

---

## **API Routes**

### **Authentication Routes**

#### **Register User**

**POST** `/auth/register`  
Register a new user.

**Request Body:**

```json
{
  "username": "user123",
  "email": "user123@example.com",
  "password": "securepassword",
  "role": "student"
}
```

**Response:**

```json
{
  "message": "User registered successfully."
}
```

> **Note:** The password is securely hashed using `bcrypt` before being stored in the database.

---

#### **Login User**

**POST** `/auth/login`  
Authenticate and log in a user.

**Request Body:**

```json
{
  "email": "user123@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "accessToken": "<jwt-token>"
}
```

---

### **Role Management Routes**

#### **Add New Role**

**POST** `/roles/addrole`  
Add a new role to the system.

**Request Body:**

```json
{
  "role": "teacher",
  "permissions": ["/teacher/student-progress", "/teacher/manage-lessons"]
}
```

**Response:**

```json
{
  "message": "New Role 'teacher' is added."
}
```

---

#### **Add More Permissions**

**POST** `/roles/addpermission`  
Add more permissions to an existing role.

**Request Body:**

```json
{
  "role": "teacher",
  "permissions": ["/teacher/grade-students"]
}
```

**Response:**

```json
{
  "message": "Permissions added successfully."
}
```

---

### **Protected Routes**

The following routes are protected by token verification and role validation. Only users with the appropriate roles can access them:

- **GET** `/admin/manage-teachers`  
  **Access:** Admin only.  
  Response:

  ```json
  {
    "message": "Teacher management portal accessed."
  }
  ```

- **GET** `/principal/manage-students`  
  **Access:** Principal only.  
  Response:

  ```json
  {
    "message": "Student management portal accessed."
  }
  ```

- **GET** `/teacher/student-progress`  
  **Access:** Teacher only.  
  Response:

  ```json
  {
    "message": "Viewing student progress."
  }
  ```

- **GET** `/student/my-progress`  
  **Access:** Student only.  
  Response:
  ```json
  {
    "message": "Progress report for <username>."
  }
  ```

---

## **Middlewares**

1. **`verifyToken`**  
   Verifies the JWT token in the request and ensures the user is authenticated.

2. **`verifyRoles`**  
   Validates the role and permissions of the user for accessing specific routes.

3. **`catchError`**  
   Handles all uncaught errors and logs them.

---

## **Notes**

- All requests and responses follow the JSON format.
- The role and permissions logic is dynamically managed via the MongoDB database.
