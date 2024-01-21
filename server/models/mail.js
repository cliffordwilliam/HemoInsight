const nodemailer = require("nodemailer");

module.exports = class Mail {
  static async mail(payload) {
    try {
      let { targetAddress, amountPaid } = payload;
      // transporter
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      // mail options
      let mailOptions = {
        from: {
          name: "Hemo Insight",
          address: process.env.NODEMAILER_USER,
        },
        to: targetAddress,
        subject: "Hemo Insight Payment OK",
        text: `You've paid: RP ${amountPaid
          .toFixed(3)
          .toLocaleString("id-ID")}`,
      };
      // send mail
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      // res OK string
      return "ok";
    } catch (error) {
      throw error;
    }
  }
};
