const { buildSchema} = require('graphql');

const schema = buildSchema(`
  type Query {
    snowboard(name: String): Snowboard,
    manufacturer(name: String): Manufacturer,
    snowboards(type: String, manufacturer: String): [Snowboard]
  }

  type Snowboard {
    id: Int,
    name: String,
    manufacturer: String,
    style: String,
    directional: Boolean,
    wide: Boolean,
    image: String,
    description: String,
    website: String
  }

  type Manufacturer {
    name: String,
    snowboards: [Snowboard],
    location: String
    logo: String
  }
`)

module.exports = {
  schema
}