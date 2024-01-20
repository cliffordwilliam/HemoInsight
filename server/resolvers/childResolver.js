const Helper = require("../helper");
const Child = require("../models/child");

const childQueries = {
  childs: async () => {
    // const loggedUser = await context.tokenGuard();
    try {
      const users = await Child.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  },
};

const childMutations = {
  createChild: async (_, { payload }, context) => {
    // guard
    const loggedUser = await context.tokenGuard();
    payload.userId = loggedUser.id; // add child owner
    try {
      const newChild = await Child.createChild(payload);
      return newChild;
    } catch (error) {
      throw error;
    }
  },
};

const childResolvers = {
  Query: childQueries,
  Mutation: childMutations,
};

module.exports = childResolvers;
