// routes/tasks.js - all /api/tasks endpoints live here.
const express = require('express');
const db = require('../db');

const router = express.Router();

// Small error type so the central handler can send a status + JSON message.
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// The server validates titles too, not only the Vue interface.
function validateTitle(body) {
  if (!body || typeof body.title !== 'string') {
    throw new HttpError(400, 'Title is required.');
  }
  const title = body.title.trim();
  if (title.length === 0) {
    throw new HttpError(400, 'Title cannot be empty or whitespace only.');
  }
  if (title.length > 200) {
    throw new HttpError(400, 'Title must be 200 characters or fewer.');
  }
  return title;
}

function validateId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpError(400, 'Invalid task id.');
  }
  return id;
}

// GET /api/tasks - read every saved task.
router.get('/', (req, res) => {
  res.status(200).json({ tasks: db.listTasks() });
});

// POST /api/tasks - create a new active task.
router.post('/', (req, res, next) => {
  try {
    const title = validateTitle(req.body);
    const task = db.createTask(title);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/tasks/:id - rename a task with { title }.
router.patch('/:id', (req, res, next) => {
  try {
    const id = validateId(req.params.id);
    const title = validateTitle(req.body);
    if (!db.renameTask(id, title)) {
      throw new HttpError(404, 'Task not found.');
    }
    res.status(200).json({ task: db.getTask(id) });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/tasks/:id/status - mark active or complete with { completed }.
router.patch('/:id/status', (req, res, next) => {
  try {
    const id = validateId(req.params.id);
    if (!req.body || typeof req.body.completed !== 'boolean') {
      throw new HttpError(400, 'Completed must be true or false.');
    }
    if (!db.setCompletion(id, req.body.completed)) {
      throw new HttpError(404, 'Task not found.');
    }
    res.status(200).json({ task: db.getTask(id) });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tasks/:id - remove a task for good.
router.delete('/:id', (req, res, next) => {
  try {
    const id = validateId(req.params.id);
    if (!db.deleteTask(id)) {
      throw new HttpError(404, 'Task not found.');
    }
    res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
