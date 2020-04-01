const graphql = require("graphql"),
  {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
  } = graphql;

const Todo = require("../models/todo");

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    priority: { type: GraphQLInt },
    checked: { type: GraphQLBoolean }
  })
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        name: { type: GraphQLString },
        priority: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let todo = new Todo({
          name: args.name,
          priority: args.priority,
          checked: false
        });
        return todo.save();
      }
    },
    checkTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        checked: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(args.id, {
          checked: args.checked
        });
      }
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Todo.findByIdAndDelete(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
