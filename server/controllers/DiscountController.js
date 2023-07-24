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
      const { id, discount_id } = req.body;
      const itemExists = req.item;
      const discountExists = req.discount;

      if (itemExists && discountExists) {
        const addedDiscount = await DiscountService.addDiscount(
          id,
          discount_id
        );
        if (addedDiscount) {
          const checkIfDiscountAdded = await InventoryService.getOneItem(id);
          if (checkIfDiscountAdded.item.discount_id != undefined) {
            const discount = await InventoryService.decreasePrice(
              checkIfDiscountAdded
            );
          }

          //console.log(discount);
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
      const { id } = req.body;

      const itemExists = req.item;
      let normalPrice;
      if (itemExists) {
        if (itemExists.item.discount_id.discount_percent != undefined) {
          normalPrice = await InventoryService.increasePrice(itemExists);
        }

        if (normalPrice) {
          const removedDiscount = await DiscountService.removeDiscount(id);
          if (removedDiscount) {
            return res
              .status(200)
              .json({ "Discount": "Success", "removed": removedDiscount });
          }
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
