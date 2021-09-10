const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('Todos');
            }
            throw new AuthenticationError("Log In!");
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        saveTodo: async (parent, args, context) => {

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { Todos: { ...args } } }
            )
            return updatedUser;
        },
        login: async (parent, { email, password }) => {
            console.log(email, password)
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Not a valid Email")
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Error");
            }

            const token = signToken(user);

            return { token, user };
        },

        removeTodo: async (parent, { _id }, context) => {
            console.log(context.user._id);
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { Todos: { _id } } }
            )
            return updatedUser
        },

        updateTodo: async (parent, args, context) => {
            console.log(context.user.id);
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "Todos._id": args._id },

                { $set: { "Todos.$.input": args.input } }
            )
            return updatedUser
        }
    }
}

module.exports = resolvers;