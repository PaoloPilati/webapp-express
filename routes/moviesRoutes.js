const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');

// INDEX ---> GET /movies
router.get('/', moviesController.index);

// SHOW ---> GET /movies/:id
router.get('/:id', moviesController.show);

// STORE (REVIEW) ---> POST /movies/:id
router.post("/:id/reviews", moviesController.storeReview);

// // UPDATE ---> PUT /posts/:id
// router.put("/:id", moviesController.update);

// // MODIFY ---> PUT /posts/:id
// router.patch("/:id", moviesController.modify);

// // DESTROY ---> DELETE /posts/:id
// router.delete("/:id", moviesController.destroy);


module.exports = router;