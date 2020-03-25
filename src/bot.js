const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const router = require('./modules/botRouter');
const notify = require('./modules/botNotify');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({ activity: {
    name: 'in development',
    type: 'LISTENING',
  }, status: 'online' });

  notify(client);
});
 
client.on('message', msg => {
  if(msg.author.bot) return;
  if (/^(deadline|terminy|dl|su|sudo)/.test(msg.content)) router(client, msg);
});

// client.login(process.env.BOT_TOKEN);