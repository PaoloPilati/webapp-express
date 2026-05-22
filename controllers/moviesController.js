const connection = require('../db/connection');


function index(req, res, next) {
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return next(err);
    }

    const updatedResults = results.map(movie => { //cambiare nome const!!!
      return {
        ...movie,
        image: req.imagePath + movie.image
      };
    });

    res.json(updatedResults);
  });
}

// SHOW
function show(req, res, next) {
  const id = req.params.id;

  const movieSql = 'SELECT * FROM movies WHERE id = ?'; // ?, [id] = Prepared statement per validazione id
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?'; //utilizzo JOIN per avere una query sola!!!

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) {
      return next(err);
    }
    if (movieResults.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const movie = movieResults[0];
    movie.image = req.imagePath + movie.image;
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
  const id = req.params.id;
  const { text, name, vote } = req.body;
  const sql = `INSERT INTO reviews (text, name, vote, movie_Id) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [text, name, vote, id], (err, reviewResult) => {

    if (err) {
      return next(err);
    }

    res.status(201);
    res.json({
      message: "Review created",
      id: reviewResult.insertId
    });

  });
}

// STORE (movies)
function storeMovie(req, res) {
  const { title, director, image, abstract} = req.body;
  
  const imageName = `${req.file.filename}`;

  const sql = `INSERT INTO movies (title, director, image, abstract) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [title, director, imageName, abstract], (err, movieResult) => {
    if (err) {
      console.log(err)
      return next(new Error("Internal server error"));
    }
    res.status(201).json({
      status: "success",
      message: "Movie created successfully!"
    })
  }
}


module.exports = { index, show, storeReview, storeMovie };