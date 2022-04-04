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

  async getUser({userId}) {
    const userFound = await this.mongoDB.get(this.collection, userId);
    return userFound || {};
  }

  async createUser({ user }) {
    const createUserId = await this.mongoDB.create(this.collection, user);
    return createUserId;
  }

  

}

module.exports = UsersService;