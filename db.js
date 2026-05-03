const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'movies_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Connection failure:', err);
    return;
  }
  console.log('Connected to db!');
});

module.exports = connection;