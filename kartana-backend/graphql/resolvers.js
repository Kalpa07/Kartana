import Users from "../models/Users.js";
import Product from "../models/Product.js";

const resolvers = {
  Query: {
    users: async () => await Users.find(),
    userByEmail: async (_, { email }) => await Users.findOne({ email }),

    products: async () => await Product.find(),
    product: async (_, { id }) => await Product.findById(id),
  },

  Mutation: {
    createUser: async (_, { data }) => {
      const exists = await Users.findOne({ email: data.email });
      if (exists) throw new Error("User already exists");
      return await new Users(data).save();
    },

    createProduct: async (_, { data }) => {
      return await new Product(data).save();
    }
  }
};

export default resolvers;
