// native modules import
import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

import { connect } from './database.js';
import models from './models/index.js';
import { areGroupsAvailable } from './services/group.js';
import { verifyJwt, verifyJwtForSubscriptions } from './services/jwt.js';
import typeDefs from './schema.js';
import resolvers from './resolvers/index.js';

const app = express();
const pubsub = new PubSub();

// establish mongoDB connection
connect(process.env.MONGODB_URI);

// check group availibity for chat app
(async () => {
    const checkGroupAvailability = await areGroupsAvailable()
    if (checkGroupAvailability) {
        console.log("Groups available")
    }
    else {
        console.log("Error in creating or retrieving groups")
    }
})();

// auth middleware to verify JWT
app.use(verifyJwt);

// create apollo server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req, connection }) => {
        if (connection) {
            const isAuth = verifyJwtForSubscriptions(connection)
            return { isAuth, pubsub };
        }
        else {
            return { req, models, pubsub };
        }
    }
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(process.env.PORT);