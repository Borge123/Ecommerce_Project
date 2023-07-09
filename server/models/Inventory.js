const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InventorySchema = new Schema(
  {
    item: {
      name: {
        type: String,
        required: true,
        unique: true,
      },

      description: {
        type: String,
        required: true,
      },
    },
    skus: [
      {
        sku: {
          type: String,
          unique: true,
          required: true,
        },

        price: {
          type: Number,
          required: true,
          discount_id: {
            type: Schema.Types.ObjectID,
            ref: "Discount",
          },
        },
        stock_quantity: {
          type: Number,
          required: true,
        },

        options: {
          size: {
            name: {
              type: String,
              required: true,
            },
          },

          color: {
            name: {
              type: String,
              required: true,
            },
          },

          img_url: {
            type: String,
            required: true,
          },
        },
      },
    ],

    categories: [
      {
        category: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
InventorySchema.post("save", function (doc) {
  console.log("%s has been saved", doc._id);
});

module.exports = Inventory = mongoose.model("Inventory", InventorySchema);
