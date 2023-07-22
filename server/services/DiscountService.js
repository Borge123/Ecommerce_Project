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
            "skus.$.discount_id": discount_id,
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

  static async removeDiscount(id, sku, data) {
    //expects to receive sku object as data
    try {
      let newObj = {
        options: data.options,
        sku: data.sku,
        price: data.price,
        stock_quantity: data.stock_quantity,
        _id: data._id.toString(),
        discount_id: data.discount_id.toString(),
      };
      let { discount_id, ...rest } = newObj;

      //destructuring data object to remove discount_id property

      const response = await Inventory.updateOne(
        { _id: id, "skus.sku": sku },
        {
          $set: {
            "skus.$": rest,
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

  static async getDiscountById(id) {
    try {
      const discount = await Discount.findById(id);

      if (discount) {
        return discount;
      }
    } catch (error) {
      throw error;
    }
  }
};
