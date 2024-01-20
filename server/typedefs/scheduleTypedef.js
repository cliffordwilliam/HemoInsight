module.exports = scheduleTypedef = `#graphql
  type Mutation {
    schedule(payload: ScheduleInput): String
  }
  input ScheduleInput {
    targetAddress: String! # req ccliffordwilliam@gmail.com
    scheduleInput: String! # req HOW TO WRITE IT -> // https://www.npmjs.com/package/node-schedule
    }
`;
