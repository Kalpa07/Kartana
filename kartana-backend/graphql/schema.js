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
    title: String!
    price: Float!
    image: String
    quantity: Int!
  }

  type Address {
    name: String!
    phone: String!
    street: String!
    city: String!
    state: String!
    pincode: String!
  } 

  input AddressInput {
    name: String!
    phone: String!
    street: String!
    city: String!
    state: String!
    pincode: String!
  }

  type OrderItem {
    title: String!
    price: Float!
    quantity: Int!
    image: String
  }

  input OrderItemInput {
    title: String!
    price: Float!
    quantity: Int!
    image: String
  }

  type Order {
    orderId: ID!
    createdAt: String!
    total: Float!
    status: String!
    items: [OrderItem!]!
    shippingAddress: Address!
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
    getCart(userId: ID!): [CartItem]
    getOrders(userId: ID!): [Order]
  }

  type Mutation {
    createUser(data: CreateUserInput!): User
    createProduct(data: ProductInput!): Product
    login(email: String!, password: String!): User

    addToCart(
      userId: ID!
      title: String!
      price: Float!
      image: String
      quantity: Int!
    ): [CartItem]

    updateCartQuantity(
      userId: ID!
      title: String!
      quantity: Int!
    ): [CartItem]

    removeFromCart(userId: ID!, title: String):
    [CartItem]

    placeOrder(
      userId: ID!
      items: [OrderItemInput!]!
      shippingAddress: AddressInput!
    ): Order!
  }
`;

export default typeDefs;
