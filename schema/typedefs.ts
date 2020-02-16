export{}
const { gql } = require('apollo-server-express')

const typeDefs = gql`
directive @rateLimit(
  max: Int,
  window: String,
  message: String,
  identityArgs: [String],
  arrayLengthField: String
) on FIELD_DEFINITION

type Note {
    content:String!
    id:ID!
}
  type Query {
    hello: String @rateLimit(window: "30s", max: 2, message: "No more hellos for u, sry!")
    findAllNotes:[Note]!
    findNote(id:ID!):Note
  }
`;
module.exports=typeDefs