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
const { createTokens } = require("../middleware/auth-func");

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
      async resolve(parent, args, req, res) {
        console.log("todos list", req.isAuth, req.userId);
        try {
          if (req.isAuth) {
            console.log("todos data", req.userId);
            return Todo.find({ owner_id: req.userId });
          }
          throw new Error("Not Authorized");
        } catch (error) {
          console.log(error);
        }
      },
    },
    login: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, req, res) {
        var user;
        console.log("login args", args);
        user = await User.findOne({ email: args.email });
        if (!user) {
          console.log("not user");
          throw new Error("no user Invalid Credentials");
        }
        bcrypt.compare(args.password, user.password, (err, isEqual) => {
          if (!isEqual) {
            throw new Error("not equal Invalid Credentials");
          }
        });
        const [token, refreshToken] = await createTokens(user);
        console.log("from login");

        const tokenData = {
          id: user._id,
          token,
          sessionExpiration: 300,
        };

        req.res.cookie("login", refreshToken, {
          expires: new Date(Date.now() + 86400000 * 7),
          httpOnly: true,
          secure: false,
          sameSite: true,
          overwrite: true,
        });

        return tokenData;
      },
    },
    userCheck: {
      type: AuthType,
      async resolve(parent, args, req, res) {
        var user;
        if (req.isAuth && req.userId) {
          console.log("userId", req.userId);
          user = await User.findById(req.userId);
          const [token, refreshToken] = await createTokens(user);
          console.log("from userCheck");
          console.log({
            id: user._id,
            token,
            refreshToken,
          });

          const tokenData = {
            id: user._id,
            token,
            sessionExpiration: 300,
          };

          return tokenData;
        }

        if (!user) {
          console.log("not user in user check");
          throw new Error("no user Invalid Credentials");
        }
      },
    },
    //
    logout: {
      type: GraphQLString,
      async resolve(parent, args, req, res) {
        console.log("from user logout");
        req.res.clearCookie("login");
        return "Logout";
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

        const [token, refreshToken] = await createTokens(newuser);
        console.log("from signup");
        console.log({
          id: user._id,
          token,
          refreshToken,
          sessionExpiration: 300,
        });

        const tokenData = {
          id: user._id,
          token,
          sessionExpiration: 300,
        };

        req.res.cookie("login", refreshToken, {
          expires: new Date(Date.now() + 86400000 * 7),
          httpOnly: true,
          secure: true,
          sameSite: false,
          overwrite: true,
        });

        return tokenData;
      },
    },
    addTodo: {
      type: TodoType,
      args: {
        name: { type: GraphQLString },
        priority: { type: GraphQLInt },
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
