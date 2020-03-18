const express = require('express');
require('dotenv').config();

const getClasses = require('./modules/getClasses');
const getEvents = require('./modules/getEvents');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('./public'));
express.json();

app.get('/', (req, res) => {
  res.render('index', { title: process.env.TEST });
});

app.get('/classes', (req, res) => {
  (async () => res.json(await getClasses()))();
})

app.get('/events', (req, res) => {
  (async () => res.json(await getEvents(req.query.id)))();
})

app.get('/test', (req, res) => {
  res.send('test');
})

app.listen(port, () => console.log(`Server is working on port ${port}`));