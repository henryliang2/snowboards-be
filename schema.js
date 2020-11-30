const { buildSchema} = require('graphql');

const schema = buildSchema(`
  type Query {
    snowboard(name: String!): Snowboard,
    manufacturer(name: String!): Manufacturer,
    style(type: String!): [Snowboard],
  }

  type Snowboard {
    id: Int,
    name: String,
    manufacturer: String,
    style: String,
    directional: Boolean,
    wide: Boolean,
    image: String
  }

  type Manufacturer {
    name: String,
    snowboards: [Snowboard],
    location: String
  }
`)

module.exports = {
  schema
}