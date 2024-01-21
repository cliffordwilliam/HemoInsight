const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = class Stripe {
  static async createIntent(payload) {
    try {
      let { amount } = payload;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // int
        currency: "usd", // 17950 = $179 50 cents
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return {
        paymentIntent: paymentIntent.client_secret,
      };
    } catch (error) {
      throw error;
    }
  }
};
