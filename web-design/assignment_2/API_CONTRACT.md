# API Contract

Base URL: `http://localhost:3001` (Express). Every response body is JSON.

Task object returned by the API:

```json
{
  "id": 1,
  "title": "Buy milk",
  "completed": false,
  "createdAt": "2026-11-17T08:31:56.123Z",
  "updatedAt": "2026-11-17T08:31:56.123Z"
}
```

`id` is an integer, `title` is a trimmed string of 1–200 characters, and `completed` is a boolean.

---

## GET /api/tasks

Read all saved tasks, oldest first.

- **Request body:** none
- **Success:** `200 OK`
  ```json
  { "tasks": [ { "id": 1, "title": "Buy milk", "completed": false, "createdAt": "...", "updatedAt": "..." } ] }
  ```
- **Errors:**
  - `500 Internal Server Error` — `{ "error": "Server error. Please try again." }`

## POST /api/tasks

Create a task. New tasks are always active (`completed: false`).

- **Request body:** `{ "title": "Buy milk" }` (`Content-Type: application/json`)
- **Success:** `201 Created`
  ```json
  { "task": { "id": 1, "title": "Buy milk", "completed": false, "createdAt": "...", "updatedAt": "..." } }
  ```
- **Errors:**
  - `400 Bad Request` — `{ "error": "Title is required." }` when `title` is missing or is not a string.
  - `400 Bad Request` — `{ "error": "Title cannot be empty or whitespace only." }` when the trimmed title is empty.
  - `400 Bad Request` — `{ "error": "Title must be 200 characters or fewer." }`
  - `400 Bad Request` — `{ "error": "Invalid JSON in request body." }`
  - `500 Internal Server Error` — `{ "error": "Server error. Please try again." }`

## PATCH /api/tasks/:id

Rename a task. `title` is required here (send the status change to the endpoint below).

- **Request body:** `{ "title": "Buy oat milk" }`
- **Success:** `200 OK` — `{ "task": { ...updated task... } }`
- **Errors:**
  - `400 Bad Request` — `{ "error": "Invalid task id." }`
  - `400 Bad Request` — title errors identical to `POST /api/tasks`.
  - `404 Not Found` — `{ "error": "Task not found." }`
  - `500 Internal Server Error` — `{ "error": "Server error. Please try again." }`

## PATCH /api/tasks/:id/status

Mark a task active or complete.

- **Request body:** `{ "completed": true }` or `{ "completed": false }`
- **Success:** `200 OK` — `{ "task": { ...updated task... } }`
- **Errors:**
  - `400 Bad Request` — `{ "error": "Invalid task id." }`
  - `400 Bad Request` — `{ "error": "Completed must be true or false." }`
  - `404 Not Found` — `{ "error": "Task not found." }`
  - `500 Internal Server Error` — `{ "error": "Server error. Please try again." }`

## DELETE /api/tasks/:id

Delete a task permanently.

- **Request body:** none
- **Success:** `200 OK` — `{ "id": 1 }`
- **Errors:**
  - `400 Bad Request` — `{ "error": "Invalid task id." }`
  - `404 Not Found` — `{ "error": "Task not found." }`
  - `500 Internal Server Error` — `{ "error": "Server error. Please try again." }`

## Unused paths

Any other path returns `404 Not Found` with `{ "error": "Endpoint not found." }`.
