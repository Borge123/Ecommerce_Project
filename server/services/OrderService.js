const Order = require("../models/Order");

module.exports = class OrderService {
  static async createOrder(data) {
    try {
      let itemsLength;

      if (data.skus.length != 0) {
        itemsLength = data.skus.length - 1;
      } else {
        itemsLength = 0;
      }
      const order = {
        user_id: data.user_id,
        status: data.status,
        items: [
          {
            sku: data.items[itemsLength].sku,
            name: data.items[itemsLength].name,
            quantity: data.items[itemsLength].quantity,
            price: data.items[itemsLength].price,
            total: data.items[itemsLength].total,
          },
        ],
      };

      if (data.items.length > 1) {
        for (let i = 0; i < data.items.length - 1; i++) {
          //prevent duplicate item objects being added
          const result = order.items.find(
            ({ item }) => item === data.items[i].item
          );

          if (!result) {
            order.items.push(data.items[i]);
          }
        }
      }

      const response = await new Order(order).save();
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUserOrders(user_id) {
    try {
      const orders = Order.find({ user_id: user_id });

      if (orders.length > 0) {
        return orders;
      } else {
        throw new Error("did not find any orders");
      }
    } catch (error) {
      throw error;
    }
  }

  static async getOrderById(id) {
    try {
      const order = await Order.findById(id);

      if (order) {
        return order;
      } else {
        throw new Error("did not find any order");
      }
    } catch (error) {
      throw error;
    }
  }
};
