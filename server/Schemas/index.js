const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const todoData = require("../MOCK_DATA.json");

const todoType = require("./TypeDefs/TodoType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllTodos: {
      type: new GraphQLList(todoType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return todoData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createTodo: {
      type: todoType,
      args: {
        todoContent: { type: GraphQLString },
      },
      resolve(parent, args) {
        const id = todoData.length > 0 ? todoData[todoData.length - 1].id + 1 : 1;
        todoData.push({
          id: id,
          todoContent: args.todoContent,
        });
        return {id: id};
      },
    },
    deleteTodo: {
      type: todoType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let index = todoData.map((todo) => todo.id).indexOf(args.id);
        if (index > -1) {
          todoData.splice(index, 1);
        }
        return {id: args.id};
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
