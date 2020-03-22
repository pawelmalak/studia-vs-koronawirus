const express = require('express');
require('dotenv').config();

const router = require('./router');

const app = express();
const port = process.env.PORT || 3010;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('./public'));
app.use(router);
express.json();

app.listen(port, () => console.log(`Server is working on port ${port}`));