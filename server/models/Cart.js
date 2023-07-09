const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    items: [
      {
        sku: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
          default: 0,
        },
        discount_id: {
          type: Schema.Types.ObjectID,
          ref: "Discount",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);
module.exports = Cart = mongoose.model("Cart", CartSchema);
