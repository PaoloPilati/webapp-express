const express = require('express');
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});