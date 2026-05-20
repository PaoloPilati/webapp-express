const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT
const setImagePath = require('./middlewares/setImagePath.js');
const notFound = require('./middlewares/notFound.js');
const errorHandler = require('./middlewares/errorHandler.js');
const moviesRouter = require('./routes/moviesRouter.js');

// middleware JSON
app.use(express.json());

//middleware per le immagini
app.use(express.static('public'));

//indirizzamento dinamico immagini
app.use(setImagePath);

//CORS
app.use(cors({
  origin: process.env.FE_APP
}));

// routing
app.use('/api/movies', moviesRouter);

//Middlware 404 (N.B.: DOPO LE ROUTES)
app.use(notFound);

//Middleware errorHandler
app.use(errorHandler);

//Listener
app.listen(3000, () => {
  console.log('Server attivo su http://localhost:3000');
});