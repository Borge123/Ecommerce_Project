const OrderService = require("../services/OrderService");

module.exports = class OrderController {
  static async createOrder(req, res, next) {
    try {
      const newOrder = await OrderService.createOrder(req.body);

      if (newOrder) {
        return res
          .status(200)
          .json({ "Order": "Success", "Created": newOrder });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }
};
