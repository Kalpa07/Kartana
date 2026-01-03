import Users from "../models/Users.js";
import Products from "../models/Products.js";
import bcrypt from "bcrypt";

const resolvers = {
  Query: {
    users: async () => await Users.find(),
    userByEmail: async (_, { email }) => await Users.findOne({ email }),
    products: async () => await Products.find(),
    product: async (_, { id }) => await Products.findById(id),

    getCart: async (_, { userId }) => {
      const user = await Users.findById(userId);
      return user.cart;
    },

    getOrders: async (_, { userId }) => {
      const user = await Users.findById(userId);
      if (!user) throw new Error("User not found");

      return user.orderHistory;
    },

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


    addToCart: async (_, { userId, title, price, image, quantity }) => {
      const user = await Users.findById(userId);
      if (!user) throw new Error("User not found");

      const existingItem = user.cart.find(item => item.title === title);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        user.cart.push({ title, price, image, quantity });
      }

      await user.save();
      return user.cart;
    },

    updateCartQuantity: async (_, { userId, title, quantity }) => {
      const user = await Users.findById(userId);

      user.cart = user.cart.map(item =>
        item.title === title
          ? { ...item.toObject(), quantity }
          : item
      );

      await user.save();
      return user.cart;
    },

    removeFromCart: async (_, { userId, title }) => {
      const user = await Users.findById(userId);

      user.cart = user.cart.filter(item => item.title !== title);

      await user.save();
      return user.cart;
    },

    placeOrder: async (_, { userId, items, shippingAddress }) => {
      const user = await Users.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.cart.length) {
        throw new Error("Cart is empty");
      }

      const total = user.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const order = {
        orderId: Date.now().toString(),
        items: user.cart.map(item => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress,
        total,
        status: "PLACED",
        createdAt: new Date(),
      };

      user.orderHistory.push(order);
      user.cart = [];

      await user.save();

      return order;
    },
  },
};

export default resolvers;
