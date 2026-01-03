import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  { _id: false }
);


const cartItemSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    image: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);


const orderItemSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  items: [orderItemSchema],
  shippingAddress: addressSchema,
  total: Number,
  status: {
    type: String,
    default: "PLACED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartItemSchema],
  orderHistory: [orderSchema]
});

export default mongoose.model("Users", userSchema);
