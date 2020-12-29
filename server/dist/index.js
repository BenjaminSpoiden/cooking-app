"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const User_1 = require("./entities/User");
const constants_1 = require("./constants");
const Product_1 = require("./entities/Product");
const ProductResolver_1 = require("./resolvers/ProductResolver");
const PORT = 4400;
const main = async () => {
    const connection = await typeorm_1.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "spoid",
        database: "cooking-db",
        entities: [
            User_1.User, Product_1.Product
        ],
        synchronize: true,
        logging: true,
    });
    const expressApp = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = new ioredis_1.default();
    expressApp.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        },
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }),
        secret: "meow",
        resave: false
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver, ProductResolver_1.ProductResolver],
            validate: false
        }),
        context: ({ req, res }) => ({
            req,
            res
        })
    });
    apolloServer.applyMiddleware({ app: expressApp, cors: {
            origin: "http://localhost:3000",
            credentials: true
        } });
    expressApp.get("/", (_, res) => {
        res.send("hello server");
    });
    expressApp.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
};
main().catch(error => console.error(error));
//# sourceMappingURL=index.js.map