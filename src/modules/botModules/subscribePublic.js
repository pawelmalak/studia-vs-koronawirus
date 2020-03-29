const addData = require('../addData');

const subscribePublic = async (client, msg) => {

  const query = await addData('subscribe', {
    type: 'mention',
    userId: msg.author.id
  });

  // debug
  console.log(/ER_DUP_ENTRY/.test(query));

  const user = await client.users.fetch(msg.author.id);
  user.send('subscribed to public msg!');

};

module.exports = subscribePublic;