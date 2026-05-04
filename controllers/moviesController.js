const db = require('../db/connection');

// INDEX
app.get('/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

//SHOW (CON NESTING JSON)
app.get('/movies/:id', (req, res) => {
  const id = req.params.id;
  const movieSql = 'SELECT * FROM movies WHERE id = ?';
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

  db.query(movieSql, [id], (err, movieResults) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (movieResults.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const movie = movieResults[0];

    db.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      movie.reviews = reviewsResults;

      res.json(movie);
    });
  });
});





module.export {index, show};