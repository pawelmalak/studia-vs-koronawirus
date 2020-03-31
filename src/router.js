const express = require('express');
const router = new express.Router();



const getData = require('./modules/getData');
const addData = require('./modules/addData');
const getUserDetails = require('./modules/getUserDetails');
const botNotify = require('./modules/botNotify');

router.get('/', (req, res) => {
  res.render('index', { msg: 'test' });
});

router.get('/classes', (req, res) => {
  (async () => res.json(await getData('classes')))();
});

router.get('/events', (req, res) => {
  (async () => res.json(await getData('events', { classId: req.query.id })))();
});

router.get('/latestupdate', (req, res) => {
  (async () => res.json(await getData('updated')))();
});

router.get('/latestadd', (req, res) => {
  (async () => res.json(await getData('added')))();
});

router.get('/notify', async (req, res) => {
  res.json(await botNotify(req.query.type, req.query.token));
});

router.get('/track', async (req, res) => {
  const userDetails = await getUserDetails(req.clientIp, req.query, req.headers['user-agent']);
  console.log(userDetails);
  const result = await addData('track', userDetails);
  console.log(result);
  res.json(userDetails);
});

module.exports = router;