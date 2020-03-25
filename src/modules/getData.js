const mysql = require('promise-mysql');

const getData = async (mode, params = {}) => {

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

    if (mode == 'classes') result = await connection.query("SELECT * FROM classes");
    else if (mode == 'events') result = await connection.query(`SELECT * FROM events WHERE event_class = ${params.classId} AND event_deadline > NOW() ORDER BY event_deadline ASC`);
    else if (mode == 'updated') result = await connection.query("SELECT * FROM events WHERE event_deadline > NOW() ORDER BY event_updatedAt DESC LIMIT 1");
    else if (mode == 'added') result = await connection.query("SELECT * FROM events WHERE event_deadline > NOW() ORDER BY event_createdAt DESC LIMIT 1");

    return result;

  }
  catch (error) {
    return error;
  }
  finally {
    if (connection && connection.end) connection.end();
  }

};

module.exports = getData;