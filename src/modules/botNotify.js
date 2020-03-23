const em = require('discord.js').MessageEmbed;
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/pl');

dayjs.locale('pl');
dayjs.extend(relativeTime);

// #55efc4
// #ff4757

const bar = {
  color: '#55efc4',
  title: 'Nowy termin został dodany',
  description: '',
  eventTitle: 'Zadania - tydzień 2',
  eventDescription: 'Analiza Matematyczna',
  eventDeadline: '2020-03-29 23:59:00',
  eventURL: 'https://deadlines-tracker.herokuapp.com'
};

const botNotify = (client, data = bar) => {

  const embem = new em()
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
      x.send(embem);
    });

};

module.exports = botNotify;