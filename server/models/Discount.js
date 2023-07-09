const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DiscountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    discount_percent: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Discount = mongoose.model("Discount", DiscountSchema);
