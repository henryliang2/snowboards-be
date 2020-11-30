const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { schema } = require('./schema')
const resolvers = require('./resolvers');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*'
}));

// Database Connection
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : process.env.DB_HOSTNAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : 'postgres'
  }
});

const rootValue = {
  snowboard: async(args) => resolvers.snowboard(args.name, knex),
  manufacturer: async(args) => resolvers.manufacturer(args.name, knex),
  style: async(args) => resolvers.style(args.type, knex)
}

// Middleware

app.use('/graphql', graphqlHTTP({ 
  schema, 
  rootValue,
  graphiql: process.env.ENVIRONMENT === 'development' ? true : false 
}))

// Initialize Server

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});