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
          name: "Hemo Insight Inc",
          address: process.env.NODEMAILER_USER,
        },
        to: targetAddress,
        subject: "Hemo Insight Payment Successful",
        html: `
        <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      h1, p {
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Invoice</h1>
    <h2>Hemo Insight Inc</h2>
    <p>Thank you for your payment! Here are the details of your transaction:</p>

    <p>Your payment of RP ${amountPaid
      .toFixed(3)
      .toLocaleString(
        "id-ID"
      )} has been received. If you have any questions, please contact our support team.</p>

    <p>Thank you for choosing our services!</p>
  </body>
</html>

      `,
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
