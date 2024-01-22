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
    loggedIn: User
  }

  type Mutation {
    register(payload: RegisterInput): User
    login(payload: LoginInput): AuthPayload
    upgrade: String
  }

  input RegisterInput {
    username: String! # req
    password: String! # req
    email: String! # req
    weight: String! # req
    height: String! # req
    birthdate: String! # req
    address: String! # req
    commorbidity: String! # req
  }

  input LoginInput {
    username: String! # req
    password: String! # req
  }
  
  type AuthPayload {
    user: User
    token: String
  }
`;
