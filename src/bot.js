const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setUsername('terminowy-bot');

  client.user.setPresence({ activity: {
    name: 'in development',
    type: 'LISTENING',
  }, status: 'online' });
});
 
client.on('message', msg => {
  if (/^(deadline|terminy)/.test(msg.content)) {
    msg.reply('init cmd');
  }
});


 
client.login(process.env.BOT_TOKEN);