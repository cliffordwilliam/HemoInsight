require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const PORT = process.env.PORT || 3000;
const mongoConnect = require("./mongoConnect");
const Middleware = require("./middleware");

// Typedefs
const userTypedef = require("./typedefs/userTypedef");
const childTypedef = require("./typedefs/childTypedef");
const serviceTypedef = require("./typedefs/serviceTypedef");
const reportTypedef = require("./typedefs/reportTypedef");
const reportServiceTypedef = require("./typedefs/reportServiceTypedef");
const stripeTypedef = require("./typedefs/stripeTypedef");

// Resolvers
const userResolvers = require("./resolvers/userResolver");
const childResolvers = require("./resolvers/childResolver");
const serviceResolvers = require("./resolvers/serviceResolver");
const reportResolvers = require("./resolvers/reportResolver");
const reportServiceResolvers = require("./resolvers/reportServiceResolver");
const stripeResolvers = require("./resolvers/stripeResolver");

const typeDefs = [
  userTypedef,
  childTypedef,
  serviceTypedef,
  reportServiceTypedef,
  reportTypedef,
  stripeTypedef,
];

const resolvers = [
  userResolvers,
  childResolvers,
  serviceResolvers,
  reportServiceResolvers,
  reportResolvers,
  stripeResolvers,
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

(async () => {
  try {
    await mongoConnect.connect();

    const { url } = await startStandaloneServer(server, {
      listen: {
        port: PORT,
      },
      // middleware
      context: async ({ req }) => {
        return {
          tokenGuard: async () => Middleware.tokenGuard(req),
        };
      },
    });
    console.log(`Listening: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
