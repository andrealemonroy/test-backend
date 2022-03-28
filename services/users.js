const MongoLib = require('../lib/mongo');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUsers({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async getUser(user) {
    const user = await this.mongoDB.findOne(this.collection, user);
    return user || {};
  }

}

module.exports = UsersService;