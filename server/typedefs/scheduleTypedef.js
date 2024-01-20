// https://www.npmjs.com/package/node-schedule
module.exports = scheduleTypedef = `#graphql
  type Mutation {
    schedule(payload: String): String
  }
`;
