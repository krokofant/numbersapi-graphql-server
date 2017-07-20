const express = require("express")
const bodyParser = require("body-parser")
const fetch = require("node-fetch")
const graphqlFields = require("graphql-fields")
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express")
const { makeExecutableSchema } = require("graphql-tools")

async function fetchNumber(number, type) {
  let r = await fetch(`http://numbersapi.com/${number}/${type}`)
  let text = await r.text()
  return { [`${type}`]: text }
}

var typeDefs = [
  `
type Query {
  hello: String
  number(number: Int!, type: String): Number
}

type Number {
  trivia: String
  math: String
  date: String
  year: String
}

schema {
  query: Query
}`
]

var resolvers = {
  Query: {
    async number(root, { number }, _, info) {
      const topLevelFields = Object.keys(graphqlFields(info))
      let responses = await Promise.all(
        topLevelFields.map(async field => fetchNumber(number, field))
      )
      return Object.assign({}, ...responses)
    }
  }
}

var schema = makeExecutableSchema({ typeDefs, resolvers })
var app = express()
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }))
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))
app.listen(4000, () => console.log("Now browse to localhost:4000/graphiql"))
