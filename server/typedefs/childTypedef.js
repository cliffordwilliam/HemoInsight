module.exports = childTypedef = `#graphql
  type Child {
    _id: ID
    username: String
    birthdate: String
    address: String
    commorbidity: String
    userId: ID
  }

  type Query {
    childs: [Child]
  }

  type Mutation {
    createChild(payload: ChildInput): Child
  }

  input ChildInput {
    username: String! # req
    birthdate: String! # req
    address: String! # req
    commorbidity: String! # req
    userId: Int! # req
  }
`;
