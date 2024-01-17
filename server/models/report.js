const { ObjectId } = require("mongodb");
const { getDatabase } = require("../mongoConnect");

module.exports = class Report {
    static collection() {
        return getDatabase().collection("Reports");
    }

    //get all reports
    static async findAll() {
        try {
            return await this.collection().find().toArray();
        } catch (error) {
            throw error;
        }
    }

    //get one specific reports
    static async findOneById(reportId) {
        try {
            return await this.collection().findOne({
                _id: new ObjectId(reportId),
            });
        } catch (error) {
            throw error;
        }
    }

    //All reports under a name NB MIGHT NEED TO CONVERT PATIENTID INTO {}ID LATER ON, CURRENTLY DATA HARDCODED, NOT IN {}ID FORMAT.
    static async findAllByPatientId(patientId) {
        try {
            return await this.collection()
                .find({
                    patientId: patientId,
                })
                .toArray();
        } catch (error) {
            throw error;
        }
    }

    //NB: Result still null.
    static async postReport(payload) {
        try {
            const cleanedPayload = {
                userId: new ObjectId(payload.userId),
                patientId: new ObjectId(payload.patientId),
                status: payload.status,
                services: payload.services,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const newReport = await this.collection().insertOne(cleanedPayload);
            return await this.collection().findOne({
                _id: newReport.insertedId,
            });
        } catch (error) {
            throw error;
        }
    }
};
