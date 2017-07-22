import { graphiqlExpress, graphqlExpress } from "graphql-server-express"

import bodyParser from "body-parser"
import express from "express"
import { makeExecutableSchema } from "graphql-tools"
import resolvers from "./resolvers"
import types from "GQLSchema"

var typeDefs = [types]

var schema = makeExecutableSchema({ typeDefs, resolvers })

var app = express()

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }))
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))
app.listen(4000, () => console.log("Now browse to localhost:4000/graphiql"))
