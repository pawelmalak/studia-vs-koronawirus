const express = require('express');

const app = express();
const port = process.env.PORT | 3003;

app.get('/', (req, res) => {
  res.send('');
})

app.listen(port, () => console.log(`Server is working on port ${port}`));