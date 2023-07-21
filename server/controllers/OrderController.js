const OrderService = require("../services/OrderService");
const { calcTotal } = require("../helpers/calcTotal");
module.exports = class OrderController {
  static async createOrder(req, res, next) {
    try {
      const newOrder = await OrderService.createOrder(req.user, req.body);

      if (newOrder) {
        return res
          .status(200)
          .json({ "Order": "Success", "Created": newOrder });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async updateOrderItems(req, res, next) {
    const { id, sku, quantity } = req.body;
    try {
      const checkIfExists = await OrderService.getOrderById(id);

      if (checkIfExists) {
        const result = await OrderService.updateOrderItem(id, sku, quantity);
        if (result) {
          const inspectUpdate = await OrderService.getOrderById(id);
          const total = await calcTotal(inspectUpdate.items);
          await OrderService.updateOrderTotal(id, total);

          return res
            .status(200)
            .json({ "Order": "Success", "updated": result });
        }
      } else {
        return res.status(400).json({ "Order": "order not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }
};
