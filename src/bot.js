const Discord = require('discord.js');
const client = new Discord.Client();
global.client = client;
require('dotenv').config();

const router = require('./modules/botRouter');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({ activity: {
    name: 'development v0.8.3',
    type: 'PLAYING',
  }, status: 'online' });
});
 
client.on('message', msg => {
  if(msg.author.bot) return;
  if (/^(deadline|terminy|dl|su|sudo)/.test(msg.content)) router(client, msg);
});

client.login(process.env.BOT_TOKEN);