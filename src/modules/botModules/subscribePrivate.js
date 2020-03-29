const addData = require('../addData');

const subscribePrivate = async (client, msg) => {

  const query = await addData('subscribe', {
    type: 'message',
    userId: msg.author.id
  });

  // debug
  console.log(/ER_DUP_ENTRY/.test(query));

  const user = await client.users.fetch(msg.author.id);
  user.send('subscribed to private msg!');

};

module.exports = subscribePrivate;