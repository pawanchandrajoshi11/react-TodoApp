const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const todoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLInt },
    todoContent: { type: GraphQLString },
  }),
});

module.exports = todoType;
