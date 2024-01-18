module.exports = stripeTypedef = `#graphql
  type Stripe {
    paymentIntent: String
  }

  type Mutation {
    createIntent(payload: IntentInput): Stripe
  }

  input IntentInput {
    amount: Int!
  }
`;
