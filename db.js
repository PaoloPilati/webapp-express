const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'movies_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione:', err);
    return;
  }
  console.log('Connesso al db!');
});

module.exports = connection;