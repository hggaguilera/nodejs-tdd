const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(4000, () => {
  console.log('Server is running!');
});
