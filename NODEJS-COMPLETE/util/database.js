const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://suraj:Suraj123@cluster0.yizdy.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No DB found";
};

exports.MongoClient = mongoConnect;
exports.getDb = getDb;
