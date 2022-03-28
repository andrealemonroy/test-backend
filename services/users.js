const MongoLib = require('../lib/mongo');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }


  async getUser(user) {
    const user = await this.mongoDB.get(this.collection, user);
    return user || {};
  }

}

module.exports = UsersService;