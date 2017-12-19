const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers');
const typeDefs = require('./definition');

// Export the executable schema with the resolvers.
module.exports = makeExecutableSchema({ typeDefs, resolvers });
