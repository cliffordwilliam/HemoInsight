module.exports = userTypedef = `#graphql
  type Mutation {
    mail(payload: MailInput): String
  }
  input MailInput {
    amountPaid: Float! # req
  }
`;
