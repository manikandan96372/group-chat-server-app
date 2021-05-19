import { gql } from 'apollo-server-express';


export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Group {
        id: ID!
        groupname: String!
        description: String
    }

    type Messages {
        id: ID!
        body: String!
        sender: String!
        group: String!
    }

    type Query {
        groups(page: Int!, limit: Int!): [Group]
        users(page: Int!, limit: Int!): [User]
    }

    type Mutation {
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
        createMessage(body: String!, sender: String!, group: String!): Messages
    }

    type Subscription {
        messages: Messages
    }
`