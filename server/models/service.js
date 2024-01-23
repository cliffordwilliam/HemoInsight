const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");

module.exports = class Service {
  static collection() {
    return getDatabase().collection("services");
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

  static async findTitleDescription(query) {
    try {
      return await this.collection()
        .find({
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        })
        .toArray();
    } catch (error) {
      throw error;
    }
  }

  static async findServiceByHospital(query) {
    try {
      return await this.collection()
        .find({
          $or: [{ clinic: { $regex: query ? query : "", $options: "i" } }],
        })
        .toArray();
    } catch (error) {
      throw error;
    }
  }
};
