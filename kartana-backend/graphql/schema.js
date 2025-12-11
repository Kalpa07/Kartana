import { gql } from "apollo-server-express";

const typeDefs = gql`

  # ============================
  # User Types
  # ============================
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

  # ============================
  # Product Types
  # ============================
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

  # ============================
  # Root Queries
  # ============================
  type Query {
    # User Queries
    users: [User]
    userByEmail(email: String!): User

    # Product Queries
    products: [Product]
    product(id: ID!): Product
  }

  # ============================
  # Root Mutations
  # ============================
  type Mutation {
    # User Mutations
    createUser(data: CreateUserInput!): User

    # Product Mutations
    createProduct(data: ProductInput!): Product
  }

`;

export default typeDefs;
