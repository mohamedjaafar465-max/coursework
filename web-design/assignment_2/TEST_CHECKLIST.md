# Test Checklist

Run the app first (see README.md). Work through the steps below and compare what you see with the expected result.

## 1. Create, rename and complete

1. Add three tasks: `Buy milk`, `Write report`, `Call Sam`.
2. Rename `Write report` to `Send report`.
3. Tick the checkbox for `Send report`.

**Expected:** All three tasks are listed; `Send report` is shown with a line through it and a ticked checkbox; the Active count is 2 and the Completed count is 1.

## 2. Check the filters

1. Click **All**. **Expected:** all three tasks are shown.
2. Click **Active**. **Expected:** only `Buy milk` and `Call Sam` are shown.
3. Click **Completed**. **Expected:** only `Send report` is shown.

Switching filters must happen instantly, with no page reload and no visible loading screen.

## 3. Reopen and re-complete a task

1. From **Completed**, untick `Send report`. **Expected:** it disappears from Completed; Active now has 3 tasks.
2. Click **Active**, tick `Send report` again.

**Expected:** it moves back to Completed, and the counts return to 2 Active / 1 Completed.

## 4. Delete a different task

1. Delete `Call Sam`.

**Expected:** `Call Sam` disappears from every view; only `Buy milk` and `Send report` remain; the All count is 2.

## 5. Refresh and restart

1. Refresh the browser (`F5` / `Ctrl + R`).
   **Expected:** `Buy milk` is active, `Send report` is completed, and `Call Sam` is still gone.
2. Stop the Express server (`Ctrl + C` in terminal 1), then start it again with `npm start`. Refresh the browser.
   **Expected:** the same two tasks, titles and completion states are shown; `Call Sam` is still gone.

## 6. Blank titles

1. Click **Add task** with an empty input.
   **Expected:** the message `Please enter a task title.` appears; no task is added.
2. Type only spaces and click **Add task**.
   **Expected:** the same message; the task list is unchanged.
3. Click **Rename** on a task, replace its title with spaces, and click **Save**.
   **Expected:** `Please enter a task title.` appears, the editor closes, and the last saved title is still shown.
4. Optional API check (with the server running):

   ```bash
   curl -X POST http://localhost:3001/api/tasks -H "Content-Type: application/json" -d "{\"title\":\"   \"}"
   ```

   **Expected:** HTTP 400 with `{ "error": "Title cannot be empty or whitespace only." }`. Omitting `title` returns `{ "error": "Title is required." }`.

## 7. Server stopped during a rename

1. Keep the app open in the browser. Stop the Express server (`Ctrl + C` in terminal 1).
2. Click **Rename** on `Buy milk`, change it to `Buy bread`, and click **Save**.

   **Expected:** a red message appears: `Cannot reach the server. Check that the Express server is running, then try again.` The editor closes and the task is still called `Buy milk` — the unsaved name is nowhere in the list.

3. Restart the server with `npm start` and refresh the browser.

   **Expected:** the task is still `Buy milk`. Trying the rename again now succeeds.

## Pass condition

All sections show the expected result. If a save fails, the interface must always keep displaying the last state that the server accepted.
