import Users from "../models/Users.js";
import Products from "../models/Products.js";
import bcrypt from "bcrypt";

const resolvers = {
  Query: {
    users: async () => await Users.find(),
    userByEmail: async (_, { email }) => await Users.findOne({ email }),
    products: async () => await Products.find(),
    product: async (_, { id }) => await Products.findById(id),
  },

  Mutation: {
    createUser: async (_, { data }) => {
      const exists = await Users.findOne({ email: data.email });
      if (exists) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = new Users({ ...data, password: hashedPassword });
      return await newUser.save();
    },

    createProduct: async (_, { data }) => {
      return await new Products(data).save();
    },

    login: async (_, { email, password }) => {
      const user = await Users.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      return {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    },
  },
};

export default resolvers;
