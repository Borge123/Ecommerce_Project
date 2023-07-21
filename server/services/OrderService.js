const Order = require("../models/Order");

module.exports = class OrderService {
  static async createOrder(user_id, data) {
    try {
      const total = data.items.reduce(
        (acc, currentVal) => acc + currentVal.price * currentVal.quantity,
        0
      );

      let itemsLength;

      if (data.items.length != 0) {
        itemsLength = data.items.length - 1;
      } else {
        itemsLength = 0;
      }
      const order = {
        user_id: user_id,
        status: "in process",
        items: [
          {
            sku: data.items[itemsLength].sku,
            quantity: data.items[itemsLength].quantity,
            price: data.items[itemsLength].price,
          },
        ],
        total: total,
      };

      if (data.items.length > 1) {
        for (let i = 0; i < data.items.length - 1; i++) {
          //prevent duplicate item objects being added
          const result = order.items.find(
            ({ sku }) => sku === data.items[i].sku
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

  static async updateOrderStatus(id, status) {
    try {
      const result = await Order.updateOne({ _id: id }, { status: status });
      if (result) {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderItem(id, sku, quantity) {
    try {
      let result;

      result = await Order.updateOne(
        { _id: id, "items.sku": sku },
        {
          $set: {
            "items.$.quantity": quantity,
          },
        }
      );

      if (result) {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderTotal(id, total) {
    try {
      let result;

      result = await Order.updateOne(
        { _id: id },
        {
          $set: {
            total: total,
          },
        }
      );

      if (result) {
        return result;
      }
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

  static async deleteOrder(id) {
    try {
      const result = await Order.deleteOne({ _id: id });
      if (result) {
        return result;
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
