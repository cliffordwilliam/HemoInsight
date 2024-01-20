const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");

module.exports = class Report {
    static collection() {
        return getDatabase().collection("reports");
    }

    static async findAll() {
        try {
            return await this.collection()
                .aggregate([
                    {
                        $lookup: {
                            from: "reportServices",
                            localField: "_id",
                            foreignField: "reportId",
                            as: "servicesConnection",
                        },
                    },
                    {
                        $lookup: {
                            from: "services",
                            localField: "servicesConnection.serviceId",
                            foreignField: "_id",
                            as: "services",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "userOwner",
                        },
                    },
                    {
                        $unwind: {
                            path: "$userOwner",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "childs",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "childOwner",
                        },
                    },
                    {
                        $unwind: {
                            path: "$childOwner",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $project: {
                            "userOwner.password": 0,
                        },
                    },
                ])
                .toArray();
        } catch (error) {
            throw error;
        }
    }

    static async findOneBy(query) {
        try {
            const array = await this.collection()
                .aggregate([
                    {
                        $match: {
                            _id: query._id,
                        },
                    },
                    {
                        $lookup: {
                            from: "reportServices",
                            localField: "_id",
                            foreignField: "reportId",
                            as: "servicesConnection",
                        },
                    },
                    {
                        $lookup: {
                            from: "services",
                            localField: "servicesConnection.serviceId",
                            foreignField: "_id",
                            as: "services",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "userOwner",
                        },
                    },
                    {
                        $unwind: {
                            path: "$userOwner",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "childs",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "childOwner",
                        },
                    },
                    {
                        $unwind: {
                            path: "$childOwner",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $project: {
                            "userOwner.password": 0,
                        },
                    },
                ])
                .toArray();
            return array[0];
        } catch (error) {
            throw error;
        }
    }

    static async createReport(payload) {
        try {
            const formatPayload = {
                ownerId: new ObjectId(payload.ownerId),
                status: "unpaid",
                services: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                userOwner: [],
                childOwner: [],
                appointment: payload.appointment,
            };
            const result = await this.collection().insertOne(formatPayload);
            const array = await this.collection()
                .aggregate([
                    {
                        $match: {
                            _id: result.insertedId,
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "userOwner",
                        },
                    },
                    {
                        $unwind: {
                            path: "$userOwner",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "childs",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "childOwner",
                        },
                    },
                    {
                        $unwind: {
                            path: "$childOwner",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                ])
                .toArray();
            return array[0];
        } catch (error) {
            throw error;
        }
    }

    static async findAllByOwnerId({ ownerId }) {
        try {
            console.log(ownerId, `ini ownerId  dari Models`);
            return await this.collection()
                .aggregate([
                    {
                        $match: {
                            ownerId: ownerId,
                        },
                    },
                    {
                        $lookup: {
                            from: "reportServices",
                            localField: "_id",
                            foreignField: "reportId",
                            as: "servicesConnection",
                        },
                    },
                    {
                        $lookup: {
                            from: "services",
                            localField: "servicesConnection.serviceId",
                            foreignField: "_id",
                            as: "services",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "userOwner",
                        },
                    },
                    {
                        $unwind: {
                            path: "$userOwner",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: "childs",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "childOwner",
                        },
                    },
                    {
                        $unwind: {
                            path: "$childOwner",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $project: {
                            "userOwner.password": 0,
                        },
                    },
                ])
                .toArray();
        } catch (error) {
            throw error;
        }
    }

    static async deleteReportById(reportId) {
        try {
            return await this.collection().deleteOne({
                _id: new ObjectId(reportId),
            });
        } catch (error) {
            console.log(error);
        }
    }
};
