const em = require('discord.js').MessageEmbed;
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/pl');

dayjs.locale('pl');
dayjs.extend(relativeTime);

const bar = {
  color: '#ff4757',
  title: 'Termin został zaktualizowany',
  description: 'powiadomienia(indev)',
  eventTitle: 'Sprawozdanie',
  eventDescription: 'Zadanie 2',
  eventDeadline: '2020-03-31 10:00:00',
  eventURL: 'https://deadlines-tracker.herokuapp.com'
};

const botNotify = (client, data = bar) => {

  const sa = new em()
    .setColor(data.color)
    .setTitle(data.title)
    .setDescription(data.description)
    .addField('Zadanie', `${data.eventTitle} - ${data.eventDescription}`)
    .addField('Termin', `
    ${dayjs(data.eventDeadline).format('DD/MM/YYYY HH:mm')} (${dayjs().to(dayjs(data.eventDeadline, 'YYYY-MM-DD HH:mm:ss'))})
    `)
    .addField('Link: ', data.eventURL)
    .setTimestamp();

  client.channels.fetch(process.env.BOT_CHANNEL)
    .then(x => {
      x.send(sa);
    });

};

module.exports = botNotify;