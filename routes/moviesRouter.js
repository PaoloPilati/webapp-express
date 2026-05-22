const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');

const upload = require('../middlewares/multer');

// INDEX ---> GET /
router.get('/', moviesController.index);

// SHOW ---> GET /:id
router.get('/:id', moviesController.show);

// STORE (REVIEW) ---> POST /:id/reviews
router.post("/:id/reviews", moviesController.storeReview);

// STORE (MOVIE) ---> POST /
router.post("/", upload.single('image') moviesController.storeMovie)

// // UPDATE ---> PUT /posts/:id
// router.put("/:id", moviesController.update);

// // MODIFY ---> PUT /posts/:id
// router.patch("/:id", moviesController.modify);

// // DESTROY ---> DELETE /posts/:id
// router.delete("/:id", moviesController.destroy);


module.exports = router;