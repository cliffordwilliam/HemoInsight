const schedule = require("node-schedule");

module.exports = class Schedule {
  static async schedule(query) {
    try {
      const job = schedule.scheduleJob(query, () => {
        const nextInvocation = job.nextInvocation();
        console.log(
          `Job will be executed at: ${nextInvocation.toLocaleString()}`
        );
      });
      return "ok";
    } catch (error) {
      throw error;
    }
  }
};
