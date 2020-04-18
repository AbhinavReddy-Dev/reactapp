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

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     password: { type: GraphQLString },
//     email: { type: GraphQLString },
//     phone: { type: GraphQLInt },
//     verified: { type: GraphQLBoolean },
//     todos: {
//       type: new GraphQLList(TodoType),
//       resolve(parent, args) {
//         return Todo.find({ owner_id: parent.id });
//       },
//     },
//   }),
// });

//GraphQL schema for User

const AuthType = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  }),
});

// GraphQL schema for collection of individual schemas
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    login: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        const user = await User.findOne({ email: args.email });
        console.log(user);
        if (!user) {
          throw new Error("Invalid Credentials");
        }
        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error("Invalid Credentials");
        }
        var token = jwt.sign(
          { userId: user._id, email: user.email },
          "supersecret123",
          {
            expiresIn: 60 * 60,
          }
        );
        return {
          id: user._id,
          token,
          sessionExpiration: 60 * 60,
        };
      },
    },
  },
});

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
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
