const Helper = require("../helper");
const Stripe = require("../models/stripe");

const stripeMutations = {
  createIntent: async (_, { payload }, context) => {
    // guard
    // const loggedUser = await context.tokenGuard();
    // payload.userId = loggedUser.id;
    console.log(payload);
    try {
      const newIntent = await Stripe.createIntent(payload);
      return newIntent;
    } catch (error) {
      throw error;
    }
  },
};

const stripeResolvers = {
  Mutation: stripeMutations,
};

module.exports = stripeResolvers;
