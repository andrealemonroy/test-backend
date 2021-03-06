const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = config.dbUser;
const PASSWORD = config.dbPassword;
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.vnocv.mongodb.net/rimac?retryWrites=true`; // prettier-ignore

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
          reject(error);
        }
        resolve(this.client.db(this.dbName));
      });
    });
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      console.log('db', db)
      return db.collection(collection).find(query).toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }

  getSumTotal(collection) {
    return this.connect().then((db) => {
      return db.collection(collection).countDocuments();
    });
  }

  getDocumentsLocation(collection) {
    return this.connect().then((db) => {
      return db.collection(collection).distinct('location');
    });
  }

  getDocumentsByLocation(collection, location) {
    return this.connect().then((db) => {
      return db.collection(collection).find({location: location
      }).toArray();
    });
  }
}

module.exports = MongoLib;