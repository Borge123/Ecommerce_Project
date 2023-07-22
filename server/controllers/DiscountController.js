const DiscountService = require("../services/DiscountService");
const InventoryService = require("../services/InventoryService");
module.exports = class DiscountController {
  static async createDiscount(req, res, next) {
    try {
      const newDiscount = await DiscountService.createDiscount(req.body);
      if (newDiscount) {
        return res
          .status(200)
          .json({ "Discount": "Success", "Created": newDiscount });
      }
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: error.name + " " + error.message });
      } else {
        return res
          .status(500)
          .json({ error: error.name + " " + error.message });
      }
    }
  }

  static async addDiscount(req, res, next) {
    try {
      const { id, sku, discount_id } = req.body;
      const itemExists = await InventoryService.getItemByIdAndSku(id, sku);
      const discountExists = await DiscountService.getDiscountById(discount_id);

      if (itemExists && discountExists) {
        const addedDiscount = await DiscountService.addDiscount(
          id,
          sku,
          discount_id
        );
        if (addedDiscount) {
          return res
            .status(200)
            .json({ "Discount": "Success", "Added": addedDiscount });
        }
      }
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: error.name + " " + error.message });
      } else {
        return res
          .status(500)
          .json({ error: error.name + " " + error.message });
      }
    }
  }

  static async removeDiscount(req, res, next) {
    try {
      const { id, sku } = req.body;
      const itemExists = await InventoryService.getItemByIdAndSku(id, sku);
      //console.log(itemExists);

      const dataObj = await itemExists.skus.find((el) => el.sku === sku);
      //console.log(dataObj);

      if (itemExists) {
        const removedDiscount = await DiscountService.removeDiscount(
          id,
          sku,
          dataObj
        );
        if (removedDiscount) {
          return res
            .status(200)
            .json({ "Discount": "Success", "removed": removedDiscount });
        }
      }
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: error.name + " " + error.message });
      } else {
        return res
          .status(500)
          .json({ error: error.name + " " + error.message });
      }
    }
  }
};
