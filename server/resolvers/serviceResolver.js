const { ObjectId } = require("mongodb");
const Helper = require("../helper");
const Service = require("../models/service");

const serviceQueries = {
    getServices: async () => {
        try {
            const services = await Service.findAll();
            return services;
        } catch (error) {
            throw error;
        }
    },
    serviceById: async (_parent, args) => {
        try {
            const service = await Service.findOneBy({
                _id: new ObjectId(args.id),
            });
            return service;
        } catch (error) {
            throw error;
        }
    },
    serviceByName: async (_parent, args) => {
        try {
            const service = await Service.findOneByName(args.title);
            console.log(service);
            return service;
        } catch (error) {
            throw error;
        }
    },
};

const serviceResolvers = {
    Query: serviceQueries,
};

module.exports = serviceResolvers;
