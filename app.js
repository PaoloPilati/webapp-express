const express = require('express');
const db = require('./db');
const app = express();

const port = 3000;

// INDEX
app.get('/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});