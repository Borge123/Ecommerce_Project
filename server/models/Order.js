const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      validate(status) {
        const validStatuses = ["in process", "cancelled", "complete"];
        if (!validStatuses.includes(status.toLowerCase())) {
          throw new Error("Not a valid status");
        }
      },

      default: "in process",
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
module.exports = Order = mongoose.model("Order", OrderSchema);
