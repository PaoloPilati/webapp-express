const db = require('../db/connection');


// INDEX
function index(req, res, next) {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return next(err);
    }

    res.json(results);
  });
}

// SHOW
function show(req, res, next) {
  const id = req.params.id;

  const movieSql = 'SELECT * FROM movies WHERE id = ?';
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

  db.query(movieSql, [id], (err, movieResults) => {
    if (err) {
      return next(err);
    }

    if (movieResults.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const movie = movieResults[0];

    db.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) {
        return next(err);
      }

      movie.reviews = reviewsResults;

      res.json(movie);
    });
  });
}

module.exports = { index, show };