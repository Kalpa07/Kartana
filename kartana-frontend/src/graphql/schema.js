import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    price: Float!
    description: String!
    category: String!
    image: String!
    rating: Rating!
  }

  type Rating {
    rate: Float!
    count: Int!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    cart: [Product]!
    orderHistory: [Product]!
  }

  type Query {
    products: [Product]
    user(id: ID!): User
  }

  type Mutation {
    addToCart(userId: ID!, productId: ID!): User
    placeOrder(userId: ID!): User
  }
`;

module.exports = typeDefs;
