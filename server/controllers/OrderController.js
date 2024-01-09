const OrderService = require("../services/OrderService");
const { calcTotal } = require("../helpers/calcTotal");
const ObjectId = require("mongoose").Types.ObjectId;
module.exports = class OrderController {
  static async createOrder(req, res, next) {
    try {
      const newOrder = await OrderService.createOrder(req.userId, req.body);

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

  static async updateOrderStatus(req, res, next) {
    const { id, status } = req.body;
    try {
      const checkIfExists = await OrderService.getOrderById(id);

      if (checkIfExists) {
        const result = await OrderService.updateOrderStatus(id, status);
        if (result) {
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

  static async getAllUserOrders(req, res, next) {
    try {
      // const userId = new ObjectId(req.userId);
      // console.log(userId);
      const orders = await OrderService.getAllUserOrders(req.userId);
      if (orders) {
        return res.status(200).json({ "Orders": orders });
      } else {
        return res.status(400).json({ "Order": "order not found" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
