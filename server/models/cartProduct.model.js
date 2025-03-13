import mongoose from "mongoose";

const cartProductsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const cartProductModel = mongoose.model("cartProduct", cartProductsSchema);

export default cartProductModel;
