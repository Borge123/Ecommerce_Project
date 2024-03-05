const OrderService = require("../services/OrderService");
const InventoryService = require("../services/InventoryService");
const { calcTotal } = require("../helpers/calcTotal");
const ObjectId = require("mongoose").Types.ObjectId;
module.exports = class OrderController {
  static async createOrder(req, res, next) {
    //TODO figure out how to check entire order for valid quantity numbers before order can be created
    try {
      const items = req.body;
      const order = await OrderService.getUserOrderInProgress(req.userId);

      if (order) {
        const id = order._id.toString();

        const result = await OrderService.addToExistingOrder(id, order, items);
        if (result) {
          // const inspectUpdate = await OrderService.getOrderById(id);
          // const total = await calcTotal(inspectUpdate.items);
          // await OrderService.updateOrderTotal(id, total);

          // return res
          //   .status(200)
          //   .json({ "Order": "Success", "updated": result });
          next();
        }
      } else {
        const newOrder = await OrderService.createOrder(req.userId, items);

        if (newOrder) {
          // return res
          //   .status(200)
          //   .json({ "Order": "Success", "Created": newOrder });
          next();
        }
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }
  static async updateItemQuantity(req, res, next) {
    //TODO figure out how to check entire order for valid quantity numbers before order can be created
    try {
      const items = req.body;

      //TODO test if i can loop over order then update each item
      for (const el of items) {
        let item = await InventoryService.getItemById(el._id);
        if (item) {
          let updateQuantity = await InventoryService.subtractQuantity(
            el._id,
            el.sku,
            el.quantity
          );

          if (updateQuantity) {
            return res
              .status(200)
              .json({ "Order created and quantity updated": updateQuantity });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async getAllOrders(req, res, next) {
    try {
      const orders = await OrderService.getAllOrders();

      if (orders) {
        return res.status(200).json({ "Orders": "Success", "Orders": orders });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async updateOrderItem(req, res, next) {
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

  static async addItemsToExistingOrder(req, res, next) {
    const items = req.body;

    try {
      const order = await OrderService.getUserOrderInProgress(req.userId);

      if (order) {
        const id = order._id.toString();

        const result = await OrderService.addToExistingOrder(id, order, items);
        if (result) {
          // const inspectUpdate = await OrderService.getOrderById(id);
          // const total = await calcTotal(inspectUpdate.items);
          // await OrderService.updateOrderTotal(id, total);

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
        return res.status(400).json({ "Orders": "orders not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }

  static async getUserOrderInProgress(req, res, next) {
    try {
      const order = await OrderService.getUserOrderInProgress(req.userId);

      if (order) {
        return res.status(200).json({ "Order": order });
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
