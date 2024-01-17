const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");

module.exports = class Service {
    static collection() {
        return getDatabase().collection("Services");
    }

    //get all services available
    static async findAll() {
        try {
            return await this.collection().find().toArray();
        } catch (error) {
            throw error;
        }
    }

    //find one services for detailed information
    static async findOneBy(query) {
        try {
            return await this.collection().findOne(query);
        } catch (error) {
            throw error;
        }
    }

    //SEARCH here
    static async findOneByName(query) {
        try {
            return await this.collection()
                .find({
                    $or: [
                        { title: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },
                    ],
                })
                .toArray();
        } catch (error) {
            throw error;
        }
    }
};
