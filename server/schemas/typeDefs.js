const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User{
        _id: ID!
        username: String!
        email: String!
        Todos: [Todo]!
    }
    type Todo {
        input: String!
        _id: ID!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        updateTodo(input: String!, _id: String!): User
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveTodo(input: String!): User
        removeTodo(_id: String!): User
    }
`
module.exports = typeDefs;