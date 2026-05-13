const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const moviesRoutes = require('./routes/moviesRoutes.js');

// middleware JSON
app.use(express.json());

//middleware per le immagini
app.use(express.static('public'));

//CORS
app.use(cors());

// routing
app.use('/movies', moviesRoutes);

//Middlware 404 (N.B.: DOPO LE ROUTES)
app.use(notFound);

//Middleware errorHandler
app.use(errorHandler);

//Listener
app.listen(3000, () => {
  console.log('Server attivo su http://localhost:3000');
});