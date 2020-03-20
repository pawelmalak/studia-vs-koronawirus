const botRouter = (client, msg) => {

  const msgContent = msg.content.replace(/(deadlines|terminy|dl)/g, '');
  const msgChannel = msg.channel;

  // help route
  if (/( -h| --help)$/.test(msgContent)) {
    msgChannel.send(`
    Składnia: deadlines [OPCJA]\nAlias: dl, terminy\n\nOpcje:\n\t-h, --help\twyświetla pomoc\n\t-g, --get\twyświetla najbliższe 3 terminy (indev)
    `);
  }
  // get route
  else if (/( -g| --get)/.test(msgContent)) {
    msgChannel.send('to be implemented')
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