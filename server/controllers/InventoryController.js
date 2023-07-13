const InventoryService = require("../services/InventoryService");

module.exports = class InventoryController {
  static async createItem(req, res, next) {
    try {
      // const skus = await InventoryService.checkDuplicateSkus(req.body.skus);
      // console.log(skus.length);
      // const categories = await InventoryService.checkDuplicateCategories(
      //   req.body.categories
      // );

      const newItem = await InventoryService.createItem(req.body);

      res.json(newItem);
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(400).json({ error: "duplicate key error" });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }
  }
};
