const graphql = require("graphql"),
  {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
  } = graphql;

const Todo = require("../models/todo");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLInt },
    verified: { type: GraphQLBoolean },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find({ owner_id: parent.id });
      },
    },
  }),
});

//GraphQL schema for User

const AuthType = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  }),
});

// GraphQL schema for Todo
const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    priority: { type: GraphQLInt },
    checked: { type: GraphQLBoolean },
    owner_id: { type: GraphQLID },
  }),
});

// GraphQL schema for collection of individual schemas
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, req) {
        return User.find({});
      },
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args, req) {
        return Todo.find({ owner_id: "5e9b32151c9d44000035b5e8" });
      },
    },
    login: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        const user = await User.findOne({ email: args.email });
        console.log(user);
        console.log(
          args.password,
          bcrypt.compareSync(user.password, args.password)
        );
        if (!user) {
          console.log("not user");
          throw new Error("Invalid Credentials");
        }
        const isEqual = bcrypt.compareSync(args.password, user.password);
        if (!isEqual) {
          console.log("not equal");
          throw new Error("Invalid Credentials");
        }
        var token = jwt.sign(
          { userId: user._id, email: user.email },
          "supersecret123",
          {
            expiresIn: 60 * 60,
          }
        );
        console.log({
          id: user._id,
          token,
          sessionExpiration: 60 * 60,
        });
        return {
          id: user._id,
          token,
          sessionExpiration: 60 * 60,
        };
      },
    },
  },
});

// Mutation schemas to update the database with the help of resolvers
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: AuthType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email });
        if (user) {
          throw new Error("User Exists");
        }
        let user = new User({
          name: args.name,
          email: args.email,
          password: bcrypt.hashSync(args.password, 10),
          phone: args.phone,
          verified: false,
        });
        const newuser = await user.save();
        var token = jwt.sign(
          { userId: user._id, email: user.email },
          "supersecret123",
          {
            expiresIn: 60 * 60,
          }
        );
        return {
          id: newuser._id,
          token,
          sessionExpiration: 60 * 60,
        };
      },
    },
    addTodo: {
      type: TodoType,
      args: {
        name: { type: GraphQLString },
        priority: { type: GraphQLInt },
        owner_id: { type: GraphQLID },
      },
      resolve(parent, args) {
        let todo = new Todo({
          name: args.name,
          priority: args.priority,
          checked: false,
          owner_id: "5e9b32151c9d44000035b5e8",
        });
        return todo.save();
      },
    },
    checkTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        checked: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(args.id, {
          checked: args.checked,
        });
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Todo.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
