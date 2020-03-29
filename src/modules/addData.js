const mysql = require('promise-mysql');

const addData = async (mode, data = {}) => {

  let connection;
  const config = {
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };

  try {

    connection = await mysql.createConnection(config);
    let result;

    result = await connection.query(`INSERT INTO subscribers(subscriber_discord_id, subscriber_subscription_type) VALUES(${data.userId}, ${(data.type == 'message') ? 10 : 20})`);
    console.log(await result);
    return { code: 0 };

  }
  catch (error) {
    return error;
  }
  finally {
    if (connection && connection.end) connection.end();
  }

};

module.exports = addData;