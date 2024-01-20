const { ObjectId } = require("mongodb");
const Report = require("../models/report");

const reportQueries = {
  reports: async () => {
    try {
      return await Report.findAll();
    } catch (error) {
      throw error;
    }
  },
  report: async (_parent, { id }) => {
    try {
      return await Report.findOneBy({ _id: new ObjectId(id) });
    } catch (error) {
      throw error;
    }
  },
};

const reportMutations = {
  createReport: async (_, { payload }) => {
    try {
      const newReport = await Report.createReport(payload);
      return newReport;
    } catch (error) {
      throw error;
    }
  },
};

const reportResolvers = {
  Query: reportQueries,
  Mutation: reportMutations,
};

module.exports = reportResolvers;
