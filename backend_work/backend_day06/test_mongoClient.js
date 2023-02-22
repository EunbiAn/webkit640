// mongodb 3.3.4 버전에서
// const MongoClient = require("mongodb").MongoClient;

// const dbUrl = "mongodb://127.0.0.1";
// let db = null;
// MongoClient.connect(dbUrl, { useUnifiedTopology: true }, function(err, client) {
//     if(err) throw err;
//     db = client.db("vehicle");
//     if(db) {
//         console.log("db 연결 성공!");
//         const car = db.collection("car");
//         car.findOne({}, function(findErr, carData) {
//             if(findErr) throw err;
//             console.log(carData.name, carData.price, carData.company);
//         });
//         client.close();
//     } else {
//         console.log("db 연결 안됨!");
//     }
// });
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    const db = client.db("vehicle");
    const car = db.collection("car");
    const cursor = car.find({}, { projection: { _id: 0 } });
    await cursor.forEach(console.log);
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

