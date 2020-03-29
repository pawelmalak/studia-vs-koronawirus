const em = require('discord.js').MessageEmbed;

const helpEmbem = new em()
  .setColor('#ff4757')
  .setTitle('Składnia: deadlines [OPCJA]')
  .addField('Alias: ', 'dl ,terminy')
  .addFields(
    {
      name: 'Opcja',
      value: `
        -h, --help\n
        -g, --get\n
        -S\n
        -s
      `,
      inline: true
    },
    {
      name: 'Opis',
      value: `
        Wyświetla to okno pomocy\n
        Wyświetlna najbliższe 3 terminy (indev)\n
        Zapisuje konto użytkownika do powiadomień w formie wiadomości (indev)\n
        Zapisuje konto użytkownika do powiadomień w formie @user (indev)
      `,
      inline: true
    },
  );

module.exports = helpEmbem;