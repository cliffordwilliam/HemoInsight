const schedule = require("node-schedule");
const nodemailer = require("nodemailer");

module.exports = class Schedule {
  static async schedule({ targetAddress, scheduleInput }) {
    try {
      const job = schedule.scheduleJob(scheduleInput, () => {
        const nextInvocation = job.nextInvocation();
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
          subject: "Hemo Insight Reminder",
          text: `Reminder for! ${nextInvocation.toLocaleString()}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            throw error;
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
      return "ok";
    } catch (error) {
      throw error;
    }
  }
};
