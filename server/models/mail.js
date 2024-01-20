const nodemailer = require("nodemailer");

module.exports = class Mail {
  static async mail(payload) {
    try {
      let { targetAddress } = payload;
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
        to: targetAddress,
        subject: "Hemo Insight Payment OK",
        text: `Payment!`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return "ok";
    } catch (error) {
      throw error;
    }
  }
};
