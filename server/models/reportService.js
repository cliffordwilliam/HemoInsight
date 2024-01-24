const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");

module.exports = class ReportService {
  static collection() {
    return getDatabase().collection("reportServices");
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

  static async createReportService(payload) {
    try {
      const formatPayload = {
        reportId: new ObjectId(payload.reportId),
        serviceId: new ObjectId(payload.serviceId),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await this.collection().insertOne(formatPayload);
      return await this.findOneBy({
        _id: result.insertedId,
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteReportService(reportServiceId) {
    try {
      console.log(reportServiceId, "to be deleted from model ");
      await this.collection().deleteOne({ _id: new ObjectId(reportServiceId) });
    } catch (error) {
      throw error;
    }
  }
};
