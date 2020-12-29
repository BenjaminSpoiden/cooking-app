import "reflect-metadata"
import { Connection, createConnection } from "typeorm"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/UserResolver"
import Redis from "ioredis"
import session from "express-session"
import connectRedis from "connect-redis"
import { MyContext } from "./utils/types"
import { User } from "./entities/User"
import { COOKIE_NAME } from "./constants"
import { Product } from "./entities/Product"
import { ProductResolver } from "./resolvers/ProductResolver"

const PORT = 4400
const main = async() => {

    const connection: Connection = await createConnection({
        type:"postgres",
        host:"localhost",
        port: 5432,
        username: "spoid",
        database:"cooking-db",
        entities: [ 
            User, Product
        ],
        synchronize: true,
        logging: true,
    })

    // await connection.connect()
    // await connection.manager.clear(User)

    const expressApp = express()

    const RedisStore = connectRedis(session)
    
    const redisClient = new Redis()

    expressApp.use(
        session({
            name: COOKIE_NAME,
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
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, ProductResolver],
            validate: false
        }),
        context: ({req, res}: MyContext)  => ({
            req,
            res
            
        })
    })

    apolloServer.applyMiddleware({ app: expressApp, cors: {
        origin: "http://localhost:3000",
        credentials: true
    } })

    expressApp.get("/", (_, res) => {
        
        res.send("hello server")
        
    })
    expressApp.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    })
}

main().catch(error => console.error(error))





