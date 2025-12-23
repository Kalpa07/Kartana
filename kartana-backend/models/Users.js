import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  cart:  [cartItemSchema],
  orderHistory: { type: Array, default: [] }
});

export default mongoose.model("Users", userSchema);
