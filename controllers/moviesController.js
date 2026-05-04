const db = require('../db/connection');


// INDEX
function index(req, res) {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    results.forEach(movie => {
      movie.image_url = getImageUrl(movie.image);
    });

    res.json(results);
  });
}

// SHOW
function show(req, res) {
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
    movie.image_url = getImageUrl(movie.image);

    db.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      movie.reviews = reviewsResults;

      res.json(movie);
    });
  });
}





module.exports = { index, show };