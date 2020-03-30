const express = require('express');
const requestIp = require('request-ip');
require('dotenv').config();

const router = require('./router');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('./public'));
app.use(express.json());
app.use(requestIp.mw());
app.use(router);

app.listen(port, () => console.log(`Server is working on port ${port}`));