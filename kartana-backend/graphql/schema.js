import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    cart: [CartItem]
    orderHistory: [Order]
  }

  type CartItem {
    title: String
    price: Float
    image: String
    quantity: Int
  }

  type Order {
    orderId: String
    date: String
    items: [CartItem]
    total: Float
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Rating {
    rate: Float
    count: Int
  }

  type Product {
    id: ID!
    title: String!
    price: Float!
    image: String
    description: String
    category: String
    rating: Rating
  }

  input ProductInput {
    title: String!
    price: Float!
    image: String
    description: String
    category: String
  }

  type Query {
    users: [User]
    userByEmail(email: String!): User
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    createUser(data: CreateUserInput!): User
    createProduct(data: ProductInput!): Product
    login(email: String!, password: String!): User
  }
`;

export default typeDefs;
