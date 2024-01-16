const Helper = require("../helper");
const User = require("../models/user");

const userQueries = {
  users: async () => {
    // const loggedUser = await context.tokenGuard();
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  },
};

const userMutations = {
  register: async (_, { payload }) => {
    // const loggedUser = await context.tokenGuard();
    try {
      const newUser = await User.register(payload);
      return newUser;
    } catch (error) {
      throw error;
    }
  },
  login: async (_, { payload }) => {
    // const loggedUser = await context.tokenGuard();
    try {
      const { user, token } = await User.login(payload);
      return { user, token };
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
