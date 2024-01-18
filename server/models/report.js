const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");

module.exports = class Report {
  static collection() {
    return getDatabase().collection("reports");
  }

  static async findAll() {
    try {
      return await this.collection()
        .aggregate([
          {
            $lookup: {
              from: "reportServices",
              localField: "_id",
              foreignField: "reportId",
              as: "servicesConnection",
            },
          },
          {
            $lookup: {
              from: "services",
              localField: "servicesConnection.serviceId",
              foreignField: "_id",
              as: "services",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "ownerId",
              foreignField: "_id",
              as: "userOwner",
            },
          },
          {
            $lookup: {
              from: "childs",
              localField: "ownerId",
              foreignField: "_id",
              as: "childOwner",
            },
          },
          {
            $project: {
              "userOwner.password": 0,
            },
          },
        ])
        .toArray();
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

  static async createReport(payload) {
    try {
      const formatPayload = {
        ownerId: new ObjectId(payload.ownerId),
        status: "unpaid",
        services: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        userOwner: [],
        childOwner: [],
        appointment: payload.appointment
      };
      const result = await this.collection().insertOne(formatPayload);
      return await this.findOneBy({
        _id: result.insertedId,
      });
    } catch (error) {
      throw error;
    }
  }
};
