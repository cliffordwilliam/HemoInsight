const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");
const Helper = require("../helper");

module.exports = class Child {
  static collection() {
    return getDatabase().collection("childs");
  }

  static async findAll() {
    try {
      return await this.collection().find().toArray();
    } catch (error) {
      throw error;
    }
  }

  static async findOneBy(query) {
    try {
      return await this.collection().findOne(query);
    } catch (error) {
      throw error;
    }
  }

  static async createChild(payload) {
    try {
      const result = await this.collection().insertOne(payload);
      return await this.findOneBy({
        _id: result.insertedId,
      });
    } catch (error) {
      throw error;
    }
  }
};
