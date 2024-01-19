const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");
const Helper = require("../helper");
const redis = require("../redis");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const cron = require("node-cron");

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

      if (paymentIntent) {
        // Nodemailer
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
          },
        });
        let mailOptions = {
          from: {
            name: "Hemo Insight",
            address: process.env.NODEMAILER_USER,
          },
          // to: "ccliffordwilliam@gmail.com",
          to: "ambariyah300@gmail.com",
          subject: "Payment Successfull on Hemo Insight",
          text: "Here are the details of your subscription. Enjoy our services.",
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        // Cron as Reminder
        let mailReminder = {
          from: {
            name: "Hemo Insight",
            address: process.env.NODEMAILER_USER,
          },
          to: "ambariyah300@gmail.com",
          subject: "Reminder Next Check-Up Schedule",
          text: "The period of you check-up is today. Please make a schedule",
        };

        let transporterReminder = transporter.sendMail(
          mailReminder,
          function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );

        const task = cron.schedule(
          "35 17 * * *",
          function () {
            transporterReminder.then(console.log("success send email"));
          },
          {
            scheduled: true,
            timezone: "Asia/Jakarta",
          }
        );

        task.start();
      }

      return {
        paymentIntent: paymentIntent.client_secret,
      };
    } catch (error) {
      throw error;
    }
  }
};
