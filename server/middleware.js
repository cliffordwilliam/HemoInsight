const Helper = require("./helper");
const User = require("./models/user");

module.exports = class Middleware {
  static async tokenGuard(req) {
    // no token? 401
    const headerAuthorization = req.headers.authorization;
    if (!headerAuthorization) {
      Helper.error("Unauthorized", 401);
    }
    // no owner? 401
    const token = headerAuthorization.split(" ")[1];
    const payload = Helper.verify(token);
    const user = await User.findOneBy({ username: payload.username });
    if (!user) {
      Helper.error("Invalid token", 401);
    }
    // return owner
    const loggedUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };
    return loggedUser;
  }
};
