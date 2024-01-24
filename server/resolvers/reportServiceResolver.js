const { ObjectId } = require("mongodb");
const ReportService = require("../models/reportService");

const reportServiceQueries = {
  reportServices: async () => {
    try {
      return await ReportService.findAll();
    } catch (error) {
      throw error;
    }
  },
  reportservice: async (_parent, { id }) => {
    try {
      return await ReportService.findOneBy({ _id: new ObjectId(id) });
    } catch (error) {
      throw error;
    }
  },
};

const reportServiceMutations = {
  createReportServices: async (_, { payload }) => {
    try {
      return await ReportService.createReportService(payload);
    } catch (error) {
      throw error;
    }
  },
  deleteReportServices: async (_, { payload }) => {
    try {
      return await ReportService.deleteReportService(payload);
    } catch (error) {
      throw error;
    }
  },
};

const reportServiceResolvers = {
  Query: reportServiceQueries,
  Mutation: reportServiceMutations,
};

module.exports = reportServiceResolvers;
