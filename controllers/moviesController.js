const connection = require('../db/connection');


// INDEX
function index(req, res, next) {
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return next(err);
    }

    res.json(results);
  });
}

// SHOW
function show(req, res, next) {
  const id = req.params.id;

  const movieSql = 'SELECT * FROM movies WHERE id = ?'; // ?, [id] = Prepared statement per validazione id
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) {
      return next(err);
    }
    if (movieResults.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const movie = movieResults[0];

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) {
        return next(err);
      }

      movie.reviews = reviewsResults;

      res.json(movie);
    });
  });
}

// STORE (reviews)
function storeReview(req, res, next) {

  const movieId = req.params.id;
  const { text, vote } = req.body;

  const sql = `INSERT INTO reviews (movie_id, text, vote) VALUES (?, ?, ?)`;

  connection.query(sql, [movieId, text, vote], (err, result) => {

    if (err) {
      return next(err);
    }

    res.status(201).json({
      message: "Review created",
      id: result.insertId
    });

  });
}


module.exports = { index, show, storeReview };