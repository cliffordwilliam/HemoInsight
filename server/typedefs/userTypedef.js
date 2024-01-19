module.exports = userTypedef = `#graphql
  type User {
    _id: ID
    username: String
    password: String
    email: String
    birthdate: String
    weight:Int
    height:Int
    address: String
    status: String
    commorbidity: String
    childs: [Child]
  }

  type Query {
    users: [User]
    loggedIn: [User]
  }

  type Mutation {
    register(payload: RegisterInput): User
    login(payload: LoginInput): AuthPayload
  }

  input RegisterInput {
    username: String! # req
    password: String! # req
    email: String! # req
    weight:String
    height:String
    birthdate: String
    address: String
    commorbidity: String
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
