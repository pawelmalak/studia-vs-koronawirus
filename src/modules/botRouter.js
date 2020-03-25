const em = require('discord.js').MessageEmbed;
const addData = require('./addData');

const botRouter = (client, msg) => {

  const msgContent = msg.content.replace(/(deadlines|terminy|dl)/g, '');
  const msgChannel = msg.channel;

  // help route
  if (/( -h| --help)$/.test(msgContent)) {
    const embem = new em()
      .setColor('#ff4757')
      .setTitle('Składnia: deadlines [OPCJA]')
      .addField('Alias: ', 'dl ,terminy')
      // .addField('\u200B', '\u200B')
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

    msgChannel.send(embem);
  }
  // get route
  else if (/( -g| --get)/.test(msgContent)) {
    msgChannel.send('to be implemented')
  }
  // test
  else if (/ -S/.test(msgContent)) {
    (async () => {
      await addData('subscribe', {
        type: 'message',
        userId: msg.author.id
      });
      const x = await client.users.fetch(msg.author.id);
      x.send('test');
    })();
  }
  // test
  else if (/ -s/.test(msgContent)) {
    (async () => {
      await addData('subscribe', {
        type: 'mention',
        userId: msg.author.id
      });
      const x = await client.users.fetch(msg.author.id);
      x.send('test');
    })();
  }
  else if (/ -foo/.test(msgContent)) {
    (async () => {
      const x = await client.users.fetch('230376374639001601');
      x.send('test');
    })();
  }
  // missing argument route
  else if (msgContent == '') {
    msgChannel.send(`${msg.content}: brakujący argument\n\nNapisz „${msg.content} --help” dla uzyskania informacji.`)
  }
  // easter egg route
  else if (/^(su | sudo )(deadlines|terminy|dl)/.test(msgContent)) {
    msgChannel.send(`Błąd: ${msg.author} nie występuje w pliku sudoers. Ten incydent zostanie zgłoszony.`)
      .then(msg => console.log('sent msg'))
      .catch(console.error);
  }

};

module.exports = botRouter;