const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const em = require('discord.js').MessageEmbed;
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/pl');

dayjs.locale('pl');
dayjs.extend(relativeTime);

const getData = require('./getData');

// #55efc4
// #ff4757

const botNotify = async (type, token) => {

  // exit if invalid token
  if (token != process.env.VER_TOKEN) return { code: -1 };

  // exit if invalid operation
  if (type != 'updated' && type != 'added') return { code: -2 };

  await client.login(process.env.BOT_TOKEN);
  let eventInstance = (type == 'updated') ? await getData('updated') : await getData('added');
  eventInstance = eventInstance[0];

  const embem = new em()
    .setColor('#ff4757')
    .setTitle((type == 'updated') ? 'Termin został zaktualizowany' : 'Nowy termin został dodany')
    .addField('Przedmiot', eventInstance.class_name)
    .addField('Zadanie', `${eventInstance.event_name} - ${eventInstance.event_description}`)
    .addField('Termin', `${dayjs(eventInstance.event_deadline).format('DD/MM/YYYY HH:mm')} (${dayjs().to(dayjs(eventInstance.event_deadline, 'YYYY-MM-DD HH:mm:ss'))})`)
    .addField('Link: ', 'https://deadlines-tracker.herokuapp.com')
    .setTimestamp();

  client.channels.fetch(process.env.BOT_CHANNEL)
    .then(channel => {
      channel.send(embem);
    });

  return { code: 0 };

};

module.exports = botNotify;