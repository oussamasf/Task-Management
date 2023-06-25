# Nest API - Project and Task Management

This is a sample RESTful API built with NestJS, providing authentication, authorization, and CRUD operations for managing projects and tasks. The API supports three user roles: admin, manager, and basic user.

## Features

- User authentication using JWT (JSON Web Tokens)
- Role-based access control (RBAC) for authorization
- CRUD operations for managing projects
- CRUD operations for managing tasks within projects

## Prerequisites

Before running the API, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v6 or higher)
- MongoDB (running locally or accessible via connection URI)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd nest-api-project-task
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.development.env` file in the root directory of the project.
   - Specify the following environment variables in the `.development.env` file:
     ```
     MONGO_URI=<your-mongodb-connection-uri>
     JWT_SECRET=<your-jwt-secret-key>
     ```

4. Start the API:

   ```bash
   npm run start
   ```

   The API will be running on `http://localhost:3000`.

## Authentication

The API provides user authentication using JWT. To authenticate, send a `POST` request to `/api/login` with the following payload:

```json
{
  "email": "your-email",
  "password": "your-password"
}
```

If the credentials are valid, the API will respond with a JWT access token, which you should include in the `Authorization` header for subsequent requests.

```plaintext
Authorization: Bearer <your-access-token>
```

## Authorization

The API implements role-based access control (RBAC) to control access to different endpoints. The available roles are:

- `admin`: Full access to all endpoints.
- `project_manager`: Access to manage his own project and tasks.
- `basic_user`: Access to view projects and tasks and update some tasks.

To access restricted endpoints, make sure to include the appropriate role in the user's JWT payload or set the `Authorization` header with the appropriate role.

## Endpoints

### Projects

- `GET /project`: Get a list of all projects.
- `GET /project/:id`: Get details of a specific project.
- `POST /project`: Create a new project. (Requires `admin` or `project_manager` role)
- `PATCH /project/:id`: Update details of a specific project. (Requires `admin` or `manager` role)
- `DELETE /project/:id`: Delete a specific project. (Requires `admin` role)

### Tasks

- `GET /project/:projectId/tasks`: Get a list of all tasks for a specific project.
- `GET /project/:projectId/tasks/:taskId`: Get details of a specific task.
- `POST /project/:projectId/tasks`: Create a new task for a specific project. (Requires `admin` or `project_manager` role)
- `PUT /project/:projectId/tasks/:taskId`: Update details of a specific task. (Requires `admin` or `project_manager` role)
- `DELETE /project/:projectId/tasks/:taskId`: Delete a specific task. (Requires `admin` role)

Please note that for routes requiring roles, the API will validate the user's role before allowing access to the resource. Unauthorized requests will receive a `403 Forbidden` response.

### E2E Testing with Dynamic Modules

In this project, I have leveraged dynamic modules in Nest to facilitate E2E testing. Dynamic modules allow us to dynamically configure and override dependencies for specific testing scenarios, providing more flexibility and isolation.

The E2E tests are located in the test/e2e directory and are designed to simulate real-world scenarios by running tests against the actual API endpoints. To set up the E2E tests, we utilize dynamic modules to create a separate testing module that replaces certain components or services with mock implementations.
