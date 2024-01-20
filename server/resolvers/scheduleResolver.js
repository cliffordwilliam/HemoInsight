const Helper = require("../helper");
const Schedule = require("../models/schedule");

const scheduleMutations = {
  schedule: async (_, { payload }, context) => {
    // guard
    const loggedUser = await context.tokenGuard();
    try {
      return await Schedule.schedule(payload);
    } catch (error) {
      throw error;
    }
  },
};

const scheduleResolvers = {
  Mutation: scheduleMutations,
};

module.exports = scheduleResolvers;
