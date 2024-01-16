const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");
const Helper = require("../helper");

module.exports = class User {
  static collection() {
    return getDatabase().collection("users");
  }

  static async findAll() {
    try {
      // return await this.collection()
      //   .find({}, { projection: { password: 0 } })
      //   .toArray();
      return await this.collection()
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
    } catch (error) {
      throw error;
    }
  }

  static async findOneBy(query, hidePassword = true) {
    try {
      const projection = hidePassword ? { password: 0 } : {};
      return await this.collection().findOne(query, { projection: projection });
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
      // pass < 5? 400
      if (password.length < 5) {
        Helper.error("Password must be at least 5 characters long", 400);
      }
      // name taken? 400
      const existingUser = await User.findOneBy({ username: username });
      if (existingUser) {
        Helper.error("Username is already taken", 400);
      }
      // hash
      payload.password = await Helper.hash(password);
      // POST
      const result = await this.collection().insertOne(payload);
      const user = await this.findOneBy({
        _id: new ObjectId(result.insertedId),
      });
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
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
