const mysql = require('promise-mysql');
/**
 * 
 * @brief Connects to the database and returns array of events
 * @param {number:int} classId - id of class
 * @return array of events
 * 
 */
const getEvents = async (classId, classGroup) => {
  let connection;
  const config = {
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };

  try {

    connection = await mysql.createConnection(config);
    const result = await connection.query(`SELECT * FROM events WHERE event_class = ${classId} AND event_group = ${classGroup} AND event_deadline >= CURDATE() ORDER BY event_deadline ASC`);

    return result;

  }
  catch (error) {
    return error;
  }
  finally {
    if (connection && connection.end) connection.end();
  }

}

module.exports = getEvents;