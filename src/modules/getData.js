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

    if (mode == 'classes') result = await connection.query(`
      SELECT *
        FROM classes
      WHERE class_active = 1
    `);
    else if (mode == 'events') result = await connection.query(`
      SELECT *
        FROM events
      WHERE event_class = ${params.classId}
        AND event_deadline > NOW()
      ORDER BY event_deadline ASC
    `);
    else if (mode == 'updated') result = await connection.query(`
      SELECT *
        FROM events
      INNER JOIN
        classes
          ON events.event_class = classes.class_id
      WHERE events.event_deadline > NOW()
      ORDER BY events.event_updatedAt DESC
      LIMIT 1
    `);
    else if (mode == 'added') result = await connection.query(`
      SELECT *
        FROM events
      INNER JOIN
        classes
          ON events.event_class = classes.class_id
      WHERE events.event_deadline > NOW()
      ORDER BY events.event_createdAt DESC
      LIMIT 1
    `);
    else if (mode == 'upcoming') result = await connection.query(`
      SELECT events.*, classes.class_name AS event_class_name
        FROM events
      LEFT JOIN classes
        ON events.event_class = classes.class_id
      WHERE event_deadline > NOW()
      ORDER BY event_deadline ASC
      LIMIT 3
    `);
    else if (mode == 'subscribers') result = await connection.query(`
      SELECT *
        FROM subscribers
    `);
    else if (mode == 'visits') result = await connection.query(`
      SELECT *
        FROM visits
        ORDER BY visit_id DESC
        LIMIT 20
    `);
    else if (mode == 'visitsbyip') result = await connection.query(`
      SELECT COUNT(visit_ip) AS visit_count, visit_ip, visit_isp, visit_isp_name
        FROM visits
        GROUP BY visit_ip
        ORDER BY visit_count DESC
        LIMIT 10
    `);

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