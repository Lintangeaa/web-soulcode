# API Integration

This document describes the API integration for the SoulCode web application.

## API Base URL

```
https://hono-soulcode-api.vercel.app/api
```

## Available Endpoints

### Authentication

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "result": {
      "user": {
        "id": "6307925a-f659-46be-b903-93dec046c857",
        "email": "admin@example.com",
        "name": "Admin",
        "role": "admin"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "status": 200
  }
  ```

#### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Same structure as login response

#### Auth Check
- **URL**: `/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "message": "User authenticated",
    "result": {
      "user": {
        "id": "6307925a-f659-46be-b903-93dec046c857",
        "email": "admin@example.com",
        "name": "Admin",
        "role": "admin"
      }
    },
    "status": 200
  }
  ```

## Implementation Details

### File Structure

```
src/
├── api/
│   ├── config.ts          # API configuration and utilities
│   ├── auth.ts            # Authentication API functions
│   └── index.ts           # API module exports
├── stores/
│   └── shared/
│       └── authStore.ts   # Authentication state management
└── features/
    └── auth/
        ├── components/
        │   ├── LoginForm.tsx
        │   ├── RegisterForm.tsx
        │   └── ProtectedRoute.tsx
        └── types/
            └── index.ts   # Auth type definitions
```

### Key Features

1. **Token Management**: JWT tokens are stored in localStorage and automatically included in API requests
2. **Error Handling**: Centralized error handling with user-friendly messages
3. **Loading States**: Proper loading indicators during API calls
4. **Authentication Check**: Automatic token validation on app startup
5. **Role-based Access**: Different dashboards for admin and user roles

### Demo Credentials

- **Admin**: admin@example.com / password
- **User**: user@example.com / password

### Usage

1. **Login**: Navigate to `/login` and use the demo credentials
2. **Register**: Navigate to `/register` to create a new account
3. **Protected Routes**: Automatically redirects based on user role
4. **Logout**: Clears tokens and redirects to login page

## Error Handling

The API integration includes comprehensive error handling:

- Network errors are caught and displayed to users
- Invalid tokens are automatically cleared
- Authentication failures redirect to login
- Form validation prevents invalid submissions

## Security Features

- JWT tokens for stateless authentication
- Automatic token validation on protected routes
- Secure token storage in localStorage
- Automatic logout on token expiration 