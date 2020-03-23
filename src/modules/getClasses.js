const mysql = require('promise-mysql');
/**
 * 
 * @brief Connects to the database and returns array of classes
 * @param -
 * @return array of classes
 * 
 */
const getClasses = async () => {
  let connection;
  const config = {
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };

  try {

    connection = await mysql.createConnection(config);
    const result = await connection.query("SELECT * FROM classes");

    return result;

  }
  catch (error) {
    return error;
  }
  finally {
    if (connection && connection.end) connection.end();
  }

}

module.exports = getClasses;