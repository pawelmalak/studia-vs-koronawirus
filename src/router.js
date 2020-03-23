const express = require('express');
const router = new express.Router();

const getClasses = require('./modules/getClasses');
const getEvents = require('./modules/getEvents');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/general', (req, res) => {
  res.render('index', { group: 0 });
});

router.get('/classes', (req, res) => {
  (async () => res.json(await getClasses()))();
});

router.get('/events', (req, res) => {
  (async () => res.json(await getEvents(req.query.id)))();
});

router.post('/notify', (req, res) => {
  console.log(req.body);
  res.json({status:'ok'});
});

module.exports = router;