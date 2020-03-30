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

    if (mode == 'subscribe') result = await connection.query(`
      INSERT INTO subscribers
        (
          subscriber_discord_id,
          subscriber_subscription_type
        )
      VALUES
        (
          ${data.userId},
          ${(data.type == 'message') ? 10 : 20}
        )
    `);
    else if (mode == 'track') result = await connection.query(`
      INSERT INTO visits
        (
          visit_ip,
          visit_isp,
          visit_isp_name,
          visit_location_x,
          visit_location_y,
          visit_location_name,
          visit_location_country,
          visit_theme
        )
      VALUES
        (
          '${data.visit_ip}',
          '${data.visit_isp}',
          '${data.visit_isp_name}',
          ${data.visit_location_x},
          ${data.visit_location_y}, 
          '${data.visit_location_name}',
          '${data.visit_location_country}',
          ${data.visit_theme}
        )`
    );

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