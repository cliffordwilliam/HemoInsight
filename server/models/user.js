const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");
const Helper = require("../helper");
const redis = require("../redis");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

module.exports = class User {
  static collection() {
    return getDatabase().collection("users");
  }

  static async findAll() {
    try {
      const cachedData = await redis.get("redisUser");
      if (cachedData) {
        console.log("User model -> GOT redisUser cache");
        return JSON.parse(cachedData);
      } else {
        console.log("User model -> NO redisUser cache");
        const newData = await this.collection()
          .aggregate([
            {
              $lookup: {
                from: "childs",
                localField: "_id",
                foreignField: "userId",
                as: "childs",
              },
            },
            {
              $project: {
                password: 0,
              },
            },
          ])
          .toArray();
        await redis.set("redisUser", JSON.stringify(newData));
        return newData;
      }
    } catch (error) {
      throw error;
    }
  }

  static async register(payload) {
    try {
      let { username, password, email } = payload;
      // bad email format? 400
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Helper.error("Invalid email format", 400);
      }
      // name taken? 400
      const existingUser = await User.findOneBy({ username: username });
      if (existingUser) {
        Helper.error("Username is already taken", 400);
      }
      // pass < 5? 400
      if (password.length < 5) {
        Helper.error("Password must be at least 5 characters long", 400);
      }
      // hash
      payload.password = await Helper.hash(password);
      // POST
      const result = await this.collection().insertOne(payload);
      const user = await this.findOneBy({
        _id: new ObjectId(result.insertedId),
      });

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
        to: email,
        subject: "Welcome to Hemo Insight",
        text: "Easier to get routine check up access. ",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      const { password: _, ...userWithoutPassword } = user;
      await redis.del("redisUser");
      return { userWithoutPassword };
    } catch (error) {
      throw error;
    }
  }

  static async findOneBy(query) {
    try {
      return await this.collection().findOne(query);
    } catch (error) {
      throw error;
    }
  }

  static async login(payload) {
    try {
      const { username, password } = payload;
      // no user? 404
      let user = await User.findOneBy({ username: username }, false);
      if (!user) {
        Helper.error("User not found", 404);
      }
      // wrong pass? 401
      const passwordMatch = await Helper.compare(password, user.password);
      if (!passwordMatch) {
        Helper.error("Incorrect password", 401);
      }
      // payload -> token
      const token = Helper.sign({ username });
      // return user + token
      const { password: _, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }
};
