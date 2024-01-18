const { ObjectId } = require("mongodb");
const Helper = require("../helper");
const Service = require("../models/service");

const serviceQueries = {

  services: async () => {
    try {
      return await Service.findAll();
    } catch (error) {
      throw error;
    }
  },
  service: async (_, { id }) => {
    try {
      return await Service.findOneBy({ _id: new ObjectId(id) });
    } catch (error) {
      throw error;
    }
  },
  serviceTitleDescription: async (_, { title }) => {
    try {
      return await Service.findTitleDescription(title);
    } catch (error) {
      throw error;
    }
  },
};

const serviceResolvers = {
  Query: serviceQueries,
};

module.exports = serviceResolvers;
