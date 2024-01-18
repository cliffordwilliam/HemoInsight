const bycrypt = require("bcrypt");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

module.exports = class Helper {
  static error(message, status) {
    throw new GraphQLError(message, {
      extensions: {
        http: {
          status: status,
        },
      },
    });
  }

  static async hash(value) {
    try {
      return await bycrypt.hash(value, 10);
    } catch (error) {
      throw error;
    }
  }

  static async compare(typedPassword, databasePassword) {
    try {
      return await bycrypt.compare(typedPassword, databasePassword);
    } catch (error) {
      throw error;
    }
  }

  static sign(value) {
    return jwt.sign(value, process.env.JWT_SECRET);
  }

  static verify(value) {
    return jwt.verify(value, process.env.JWT_SECRET);
  }
};
