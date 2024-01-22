const Helper = require("../helper");
const User = require("../models/user");

const userQueries = {
  users: async () => {
    // const loggedUser = await context.tokenGuard();
    try {
      return await User.findAll();
    } catch (error) {
      throw error;
    }
  },

  loggedIn: async (_, { payload }, context) => {
    // guard
    const loggedUser = await context.tokenGuard();
    try {
      return await User.findLoggedIn({ _id: loggedUser.id });
    } catch (error) {
      throw error;
    }
  },
};

const userMutations = {
  register: async (_, { payload }) => {
    // const loggedUser = await context.tokenGuard();
    try {
      return await User.register(payload);
    } catch (error) {
      throw error;
    }
  },
  login: async (_, { payload }) => {
    // const loggedUser = await context.tokenGuard();
    try {
      return await User.login(payload);
    } catch (error) {
      throw error;
    }
  },

  upgrade: async (_, { payload }, context) => {
    // guard
    const loggedUser = await context.tokenGuard();
    try {
      return await User.upgrade({ id: loggedUser.id });
    } catch (error) {
      throw error;
    }
  },
};

const userResolvers = {
  Query: userQueries,
  Mutation: userMutations,
};

module.exports = userResolvers;
