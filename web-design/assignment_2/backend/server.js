// server.js - starts the Express API on port 3001.
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const db = require('./db');

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors()); // The Vue dev server runs on a different port.
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Every error leaves the API as JSON with a human-readable message.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON in request body.' });
  }
  const status = err.status || 500;
  if (status === 500) {
    console.error(err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
  res.status(status).json({ error: err.message });
});

if (require.main === module) {
  // Open (and, on first start, create) the SQLite file before accepting requests.
  db.init()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Task API running at http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Could not start the database:', error);
      process.exit(1);
    });
}

module.exports = app;
