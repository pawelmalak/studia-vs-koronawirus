// Bot modules
const helpEmbem = require('./botModules/helpEmbem');
const getUpcoming = require('./botModules/getUpcoming');
const subscribePrivate = require('./botModules/subscribePrivate');
const subscribePublic = require('./botModules/subscribePublic');

const botRouter = (client, msg) => {

  const msgContent = msg.content.replace(/(deadlines|terminy|dl)/g, '');
  const msgChannel = msg.channel;

  // help route
  if (/( -h| --help)$/.test(msgContent)) msgChannel.send(helpEmbem);

  // upcoming events route
  else if (/( -g| --get)/.test(msgContent)) (async () => msgChannel.send(await getUpcoming()))();

  // subscribe routes
  else if (/ -S/.test(msgContent)) (async () => await subscribePrivate(client, msg))();
  else if (/ -s/.test(msgContent)) (async () => await subscribePublic(client, msg))();

  // wip
  else if (msgContent == '') {
    msgChannel.send(`${msg.content}: brakujący argument\n\nNapisz „${msg.content} --help” dla uzyskania informacji.`)
  }
  // else if (/^(su |sudo )(dl|deadlines|terminy)$/gm.test(msgContent)) {
  //   msgChannel.send(`Błąd: ${msg.author} nie występuje w pliku sudoers. Ten incydent zostanie zgłoszony.`)
  //     .then(msg => console.log('sent msg'))
  //     .catch(console.error);
  // }

};

module.exports = botRouter;