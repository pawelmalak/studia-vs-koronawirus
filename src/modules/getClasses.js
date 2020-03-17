const MongoClient = require('mongodb').MongoClient;

/**
 * 
 * @brief 
 * @param 
 * @return array of 
 * 
 */
const getClasses = async () => {
  
  const client = await MongoClient.connect(process.env.DB_SERVER, { useUnifiedTopology: true })
    .catch(err => console.log(err));

  if (!client) return;

  try {

    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('classes');
    const query = {};
    const result = await collection.find(query).toArray();
    return result;

  }
  catch (err) {
    return err;
  }
  finally {
    client.close();
  }

}

module.exports = getClasses;