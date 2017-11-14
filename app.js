const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, error => {
  if (error) console.error(`Error connecting to port ${port}\nError: ${error}`);
  else console.log(`Server is up and listening on port ${port}`);
});
