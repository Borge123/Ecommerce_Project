const Discount = require("../models/Discount");
const Inventory = require("../models/Inventory");
const Order = require("../models/Order");
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

  static async addDiscount(id, discount_id) {
    try {
      const response = await Inventory.updateOne(
        { _id: id },
        {
          $set: {
            "item.discount_id": discount_id,
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

  static async removeDiscount(id) {
    //expects to receive sku object as data
    try {
      // let newObj = {
      //   name: data.item.name,
      //   description: data.item.description,
      //   discount_id: data.item.discount_id.toString(),
      // };
      //destructuring object to remove discount_id property
      // let { discount_id, ...rest } = newObj;

      const response = await Inventory.updateOne(
        { _id: id },
        {
          $unset: {
            "item.discount_id": "",
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

  static async addDiscountToOrder(id, discount_id) {
    try {
      const response = await Order.updateOne(
        { _id: id },
        {
          $set: {
            discount_id: discount_id,
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
