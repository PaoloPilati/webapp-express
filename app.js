const express = require('express');
const app = express();

const moviesRoutes = require('./routes/moviesRoutes');

// middleware JSON
app.use(express.json());

// routes
app.use('/movies', moviesRoutes);

//middleware per le immagini
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server attivo su http://localhost:3000');
});