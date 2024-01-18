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
    users: [User]
  }

  type Mutation {
    register(payload: RegisterInput): User
    login(payload: LoginInput): AuthPayload
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
