const Helper = require("../helper");
const User = require("../models/user");

module.exports = userTypedef = `#graphql
  type User {
    _id: ID
    username: String
    password: String
    email: String
    birthdate: String
    address: String
    status: String
    commorbidity: String
    childs: [Child]
  }

  type Query {
    users: [User] # GET all
  }

  type Mutation {
    register(payload: RegisterInput): User # register
    login(payload: LoginInput): AuthPayload # login
  }

  input RegisterInput {
    username: String! # req
    password: String! # req
    email: String! # req
  }

  input LoginInput {
    username: String
    password: String
  }

  type AuthPayload {
  user: User
  token: String
}
`;
