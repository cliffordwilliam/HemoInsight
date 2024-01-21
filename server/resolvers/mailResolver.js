const Mail = require("../models/mail");

const mailMutations = {
  mail: async (_, { payload }, context) => {
    const loggedUser = await context.tokenGuard();
    payload.targetAddress = loggedUser.email;
    try {
      return await Mail.mail(payload);
    } catch (error) {
      throw error;
    }
  },
};

const mailResolvers = {
  Mutation: mailMutations,
};

module.exports = mailResolvers;
