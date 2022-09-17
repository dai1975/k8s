const { MongoClient } = require("mongodb");

const main = async (host, port, db, user, pass) => {
  const uri = `mongodb://${user}:${pass}@${host}:${port}/${db}?directConnection=true&tls=false`;
  console.log("uri: ", uri);
  const client = new MongoClient(uri);

  try {
    const conn = await client.connect();
    console.log("Connected successfully to server");

    const colls = await client.db(db).listCollections().toArray();
    console.log(colls);
  } catch (e) {
    console.dir(e);
  } finally {
    await client.close();
  }
}

if (process.argv.length < 3) {
  console.log("node main.js <host> [port]");
  process.exit(0);
}

const host = process.argv[2];
const port = (process.argv[3] == null) ? 27017 : parseInt(process.argv[3]);
main(host, port, 'rindb', 'rin', 'rinpw');
