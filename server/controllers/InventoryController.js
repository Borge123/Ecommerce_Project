const InventoryService = require("../services/InventoryService");

module.exports = class InventoryController {
  static async createItem(req, res, next) {
    try {
      //console.log(req.body);
      //console.log(req.body);
      const newItem = await InventoryService.createItem(req.body);

      res.json(newItem);
    } catch (error) {
      console.log(error);
    }
  }
};
