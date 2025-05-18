import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    image: String
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, description: String, image: String): Product
  }
`;

export default typeDefs;
