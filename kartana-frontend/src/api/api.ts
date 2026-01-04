import { ApolloClient, InMemoryCache } from "@apollo/client";
import type { CartItem, Order, Address } from "@/lib/types";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL!;

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

/* ================= AUTH ================= */

export const apiLogin = async (email: string, password: string) => {
  const data = await graphqlRequest<{
    login: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }>(
    `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        email
        firstName
        lastName
      }
    }
    `,
    { email, password }
  );

  return data.login;
;
};

export const apiSignup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const data = await graphqlRequest<{
    createUser: {
      id: string;
      email: string;
    };
  }>(
    `
    mutation CreateUser($data: CreateUserInput!) {
      createUser(data: $data) {
        id
        email
      }
    }
    `,
    {
      data: { firstName, lastName, email, password },
    }
  );

  return data.createUser;
};

/* ================= CART ================= */


export const apiGetCart = async (userId: string) => {
  const data = await graphqlRequest<{
    getCart: CartItem[];
  }>(
    `
    query GetCart($userId: ID!) {
      getCart(userId: $userId) {
        title
        price
        image
        quantity
      }
    }
    `,
    { userId }
  );

  const cart = data.getCart.map(item => ({
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));

  return cart;
};

export const apiAddToCart = async (
  userId: string,
  cartItem: { title: string; price: number; image?: string; quantity: number }
) => {
  const query = `
    mutation AddToCart(
      $userId: ID!
      $title: String!
      $price: Float!
      $image: String
      $quantity: Int!
    ) {
      addToCart(
        userId: $userId
        title: $title
        price: $price
        image: $image
        quantity: $quantity
      ) {
        title
        quantity
      }
    }
  `;

  const variables = {
    userId,
    ...cartItem,
  };

  const res = await graphqlRequest<{ addToCart: CartItem[] }>(query, variables);
  return res.addToCart;
};

export const apiUpdateCartQuantity = async (
  userId: string,
  title: string,
  quantity: number
) => {
  const data = await graphqlRequest<{
    updateCartQuantity: CartItem[];
  }>(
    `
    mutation UpdateCartQuantity(
      $userId: ID!
      $title: String!
      $quantity: Int!
    ) {
      updateCartQuantity(
        userId: $userId
        title: $title
        quantity: $quantity
      ) {
        title
        price
        quantity
        image
      }
    }
    `,
    { userId, title, quantity }
  );

  return data.updateCartQuantity;
};


export const apiRemoveFromCart = async (
  userId: string,
  title: string
) => {
  const data = await graphqlRequest<{
    removeFromCart: CartItem[];
  }>(
    `
    mutation RemoveFromCart(
      $userId: ID!
      $title: String!
    ) {
      removeFromCart(
        userId: $userId
        title: $title
      ) {
        title
        price
        quantity
        image
      }
    }
    `,
    { userId, title }
  );

  return data.removeFromCart;
};

/* ================= ORDERS ================= */

export const apiPlaceOrder = async (
  userId: string,
  cartItems: CartItem[],
  shippingAddress: Address
) => {
  const query = `
    mutation PlaceOrder(
      $userId: ID!
      $items: [OrderItemInput!]!
      $shippingAddress: AddressInput!
    ) {
      placeOrder(
        userId: $userId
        items: $items
        shippingAddress: $shippingAddress
      ) {
        orderId
        createdAt
        total
        status
        items {
          title
          price
          quantity
          image
        }
      }
    }
  `;

  const variables = {
    userId,
    items: cartItems.map(item => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    shippingAddress,
  };

  const res = await graphqlRequest<{ placeOrder: Order }>(query, variables);
  return res.placeOrder;
};

export const apiFetchOrders = async (userId: string) => {
  const data = await graphqlRequest<{ getOrders: Order[] }>(
    `
    query GetOrders($userId: ID!) {
      getOrders(userId: $userId) {
        orderId
        createdAt
        total
        status
        shippingAddress {
          name
          phone
          street
          city
          state
          pincode
        }
        items {
          title
          price
          quantity
        }
      }
    }
    `,
    { userId }
  );

  return data.getOrders;
};
