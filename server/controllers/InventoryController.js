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

      return res.status(200).json({ "Item": "Success", "Created": newItem });
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

  static async updateSku(req, res, next) {
    try {
      const { id, sku } = req.body;
      const itemExist = await InventoryService.getItemById(id);

      if (itemExist) {
        const updatedSku = await InventoryService.updateSku(id, sku, req.body);
        if (updatedSku) {
          return res.status(200).json({
            "Updated item": "Success",
            "item": itemExist?.item.name,
          });
        } else {
          return res.status(400).json({ "Item": "item not found" });
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
