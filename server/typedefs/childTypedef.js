module.exports = childTypedef = `#graphql
  type Child {
    _id: ID
    username: String
    birthdate: String
    weight:Int
    height:Int
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
    weight:Int! # req
    height:Int! # req
    address: String! # req
    commorbidity: String! # req
  }
`;
