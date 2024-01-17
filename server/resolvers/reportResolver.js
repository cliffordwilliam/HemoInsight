const Report = require("../models/report");

const reportQueries = {
    getReports: async () => {
        try {
            const reports = await Report.findAll();
            return reports;
        } catch (error) {
            throw error;
        }
    },
    getReportById: async (_parent, args) => {
        try {
            const report = await Report.findOneById(args.reportId);
            return report;
        } catch (error) {
            throw error;
        }
    },
    getReportsByPatientId: async (_parent, args) => {
        try {
            const reports = await Report.findAllByPatientId(args.patientId);
            return reports;
        } catch (error) {
            throw error;
        }
    },
};

const reportMutations = {
    createReport: async (_, { payload }) => {
        try {
            const newReport = await Report.postReport(payload);
            return newReport;
        } catch (error) {
            throw error;
        }
    },
};

const reportResolvers = {
    Query: reportQueries,
    Mutation: reportMutations,
};

module.exports = reportResolvers;
