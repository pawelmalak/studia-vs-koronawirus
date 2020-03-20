const em = require('discord.js').MessageEmbed;

const botNotify = (client) => {
  // '296381234953584640'

  const sa = new em()
    .setColor('#ff4757')
    .setTitle('Dysk')
    .addField('Link: ','https://mega.nz/?fbclid=IwAR1Y-J8A171lnBMC1n-k5UpMes95IY0dj2T5u51AvWGtuyTqFRdzRsKxigk#F!d35UTCYZ!I9HwVpWKjOYesX4jwYWj-A');

  client.channels.fetch('296381234953584640')
    .then(x => x.send(sa));

};

module.exports = botNotify;