# Personal To-Do App

A single-user to-do app. Vue 3 + Pinia in the browser, an Express REST API, and one SQLite file for storage. SQLite runs through `sql.js` (WebAssembly), so no native build tools or Visual Studio are needed. No accounts, no login.

Ports: To-Do front end **5174**, To-Do back end **3001**. The separate PixelHub project stays on 5173 and is not touched by this app.

## Requirements

- Node.js 20.19+ or 22.12+ (needed by Vite 7) and npm
- A modern browser

## Install and run

Use two terminals from the project root.

**Terminal 1 — back end (port 3001):**

```bash
cd backend
npm install
npm start
```

You should see `Task API running at http://localhost:3001`. The file `backend/tasks.sqlite` and its `tasks` table are created automatically on first start.

**Terminal 2 — front end (port 5174):**

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5174** in your browser. Vite proxies `/api` requests to `http://localhost:3001`, so the browser only calls the REST API. Port 5173 is reserved for the separate PixelHub project and is never used or changed by this app. Vite is configured with `strictPort: true`, so it will fail with a clear error instead of silently moving to another port if 5174 is busy.

To stop either server, press `Ctrl + C` in its terminal. To start again, run `npm start` in `backend/` and `npm run dev` in `frontend/`. Your saved tasks remain because they live in the SQLite file.

Optional production build of the front end: `cd frontend && npm run build` (output in `frontend/dist/`).

## Project structure

```
assignment_2/
├── .gitignore
├── README.md                 # this file
├── API_CONTRACT.md           # every endpoint, body, success and error response
├── TEST_CHECKLIST.md         # manual checks with expected results
├── backend/
│   ├── package.json
│   ├── db.js                 # SQLite connection, table creation, queries
│   ├── server.js             # Express app, port 3001, JSON error handler
│   ├── routes/
│   │   └── tasks.js          # validation and the /api/tasks endpoints
│   └── tasks.sqlite          # created on first start, ignored by Git
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js        # dev server on 5174, /api proxy to 3001
    └── src/
        ├── main.js           # mounts Vue and Pinia
        ├── App.vue           # the single page: list, add form, filters, rename
        ├── api.js            # the only code that calls fetch()
        ├── style.css
        └── stores/
            └── tasks.js      # Pinia state and actions
```

## How one change travels through the app

Example: clicking **Rename** and saving a new title.

1. **Vue component** (`App.vue`) calls `store.rename(task.id, editTitle.value)`.
2. **Pinia store** (`src/stores/tasks.js`) trims and validates the title, then calls `taskApi.rename(id, title)`.
3. **API client** (`src/api.js`) sends `PATCH /api/tasks/:id` with `{ "title": "..." }` to port 3001 through the Vite proxy.
4. **Express route** (`backend/routes/tasks.js`) validates the title again and calls `db.renameTask(...)`.
5. **SQLite layer** (`backend/db.js`) runs `UPDATE tasks SET title = ?, updated_at = ... WHERE id = ?` in `backend/tasks.sqlite`.
6. The route replies `200` with `{ "task": { ... } }` containing the updated row.
7. The store **replaces that task in its array only after the reply succeeds**. Vue re-renders the list, so the new title appears.

If any step fails, the store keeps its old array and sets `error`. `App.vue` shows the message and, for rename, closes the editor so the last saved title is still on screen. Blank titles are stopped in the store with `Please enter a task title.` and by the server with `Title is required.` / `Title cannot be empty or whitespace only.`

## Behaviour notes

- New tasks always start active; the checkbox sends `PATCH /api/tasks/:id/status`.
- All / Active / Completed are computed in the Pinia store, so switching views does not reload the page or refetch data.
- Empty lists and empty filters show a short friendly message.
- Deletes are permanent (`DELETE /api/tasks/:id`) and are saved straight away in SQLite.

Verification steps are in [TEST_CHECKLIST.md](TEST_CHECKLIST.md). Endpoint details are in [API_CONTRACT.md](API_CONTRACT.md).
