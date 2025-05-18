import Product from "../models/Product.js";

const resolvers = {
  Query: {
    products: async () => await Product.find(),
    product: async (_, { id }) => await Product.findById(id),
  },
  Mutation: {
    addProduct: async (_, args) => {
      const product = new Product(args);
      return await product.save();
    },
  },
};

export default resolvers;
