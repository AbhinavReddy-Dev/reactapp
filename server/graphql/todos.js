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
    phone: { type: GraphQLString },
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
    sessionExpiration: { type: GraphQLInt },
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
      resolve(parent, args, req, res) {
        if (req.isAuth) {
          console.log("todos data", req.userId);
          return Todo.find({ owner_id: req.userId });
        }
        throw new Error("Not Authorized");
      },
    },
    login: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, req, res) {
        const user = await User.findOne({ email: args.email });
        // console.log(user);
        // console.log(args.password, user.password);
        if (!user) {
          console.log("not user");
          throw new Error("no user Invalid Credentials");
        }
        bcrypt.compare(args.password, user.password, (err, isEqual) => {
          // console.log(isEqual);
          if (!isEqual) {
            throw new Error("not equal Invalid Credentials");
          }
        });
        // let isEqual = await bcrypt.compare(args.password, user.password);

        var token = jwt.sign(
          { userId: user._id, email: user.email },
          "supersecret123",
          {
            expiresIn: "1d",
          }
        );
        console.log({
          id: user._id,
          token,
          sessionExpiration: 86400000,
        });
        const tokenData = {
          id: user._id,
          token,
          sessionExpiration: 86400000,
        };
        return tokenData;
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
        phone: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log("hey");
        let user = await User.findOne({ email: args.email });
        if (user) {
          throw new Error("User Exists");
        }
        const hash = await bcrypt.hash(args.password, 10);
        console.log(hash);
        user = new User({
          name: args.name,
          email: args.email,
          password: hash,
          phone: args.phone,
          verified: false,
        });
        const newuser = await user.save();
        // args.password = await bcrypt.hash(args.password, 10);
        // console.log(hashpasword);
        // const newuser = await User.findOne({ email: args.email });
        console.log(newuser);
        var token = jwt.sign(
          { userId: newuser._id, email: newuser.email },
          "supersecret123",
          {
            expiresIn: 86400000,
          }
        );
        const authToken = {
          id: newuser._id,
          token,
          sessionExpiration: 86400000,
        };
        return authToken;
      },
    },
    addTodo: {
      type: TodoType,
      args: {
        name: { type: GraphQLString },
        priority: { type: GraphQLInt },
        // owner_id: { type: GraphQLID },
      },
      resolve(parent, args, req) {
        let todo = new Todo({
          name: args.name,
          priority: args.priority,
          checked: false,
          owner_id: req.userId,
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
