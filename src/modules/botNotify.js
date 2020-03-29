// Discord dependencies
const Discord = require('discord.js');
const client = new Discord.Client();
const em = require('discord.js').MessageEmbed;

// Day.js dependencies
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/pl');
dayjs.locale('pl');
dayjs.extend(relativeTime);

// Other
const getData = require('./getData');
require('dotenv').config();

/**
 * @brief Sends notification to channels, users
 * @param {string} type - type of notification to send: updated or added
 * @param {string} token - verification token
 * @returns {int} 0: ok, -1: wrong token, -2: wrong notification type
 */
const botNotify = async (type, token) => {

  // exit if invalid token
  if (token != process.env.VER_TOKEN) return { code: -1 };

  // exit if invalid operation
  if (type != 'updated' && type != 'added') return { code: -2 };

  // bot login
  await client.login(process.env.BOT_TOKEN);

  // get data from the database based on given notification type
  let eventInstance = (type == 'updated') ? await getData('updated') : await getData('added');
  eventInstance = eventInstance[0];

  // get list of all notification subscribers from the database
  const subscribers = await getData('subscribers');

  // create new message embem
  const embem = new em()
    .setColor('#ff4757')
    .setTitle((type == 'updated') ? 'Termin został zaktualizowany' : 'Nowy termin został dodany')
    .addField('Przedmiot', eventInstance.class_name)
    .addField('Zadanie', `${eventInstance.event_name} - ${eventInstance.event_description}`)
    .addField('Termin', `${dayjs(eventInstance.event_deadline).format('DD/MM/YYYY HH:mm')} (${dayjs().to(dayjs(eventInstance.event_deadline, 'YYYY-MM-DD HH:mm:ss'))})`)
    .addField('Link: ', 'https://deadlines-tracker.herokuapp.com')
    .setTimestamp();

  // send embem to main channel
  client.channels.fetch(process.env.BOT_CHANNEL)
    .then(channel => {
      channel.send(embem);
    });

  // send embem to all subscribers of type = 10
  subscribers.forEach(async (subscriber) => {
    const user = await client.users.fetch(subscriber.subscriber_discord_id);
    user.send(embem);
  });

  // return 0 if everything went well
  return { code: 0 };

};

module.exports = botNotify;