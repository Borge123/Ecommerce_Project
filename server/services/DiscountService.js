const Discount = require("../models/Discount");
const Inventory = require("../models/Inventory");
module.exports = class DiscountService {
  static async createDiscount(data) {
    try {
      const discount = {
        name: data.name,
        discount_percent: data.discount_percent,
        active: data.active,
      };

      const response = await new Discount(discount).save();
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async addDiscount(id, sku, discount_id) {
    try {
      const response = await Inventory.updateOne(
        { _id: id, "skus.sku": sku },
        {
          $set: {
            "skus.$": {
              discount_id: discount_id,
            },
          },
        }
      );

      if (response) {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  static async removeDiscount(id, sku) {
    try {
      const response = await Inventory.updateOne(
        { _id: id, "skus.sku": sku },
        {
          $set: {
            "skus.$": {
              discount_id: "",
            },
          },
        }
      );

      if (response) {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updatePrice(id, data) {
    try {
      let result;
      for (item of data.items) {
        result = await Inventory.updateOne(
          { _id: id },
          {
            $set: {
              "items.$": {
                price: data.price,
              },
            },
          }
        );
      }

      if (result) {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
};
