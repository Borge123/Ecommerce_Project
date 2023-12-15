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

    discount_id: {
      type: Schema.Types.ObjectID,
      ref: "Discount",
    },
    items: [
      {
        sku: {
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
        options: {
          size: {
            type: String,
            required: true,
          },

          color: {
            type: String,
            required: true,
          },

          img_url: {
            type: String,
            required: true,
          },
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Order = mongoose.model("Order", OrderSchema);
