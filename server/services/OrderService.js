const Order = require("../models/Order");

module.exports = class OrderService {
  static async createOrder(user_id, data) {
    try {
      const total = data.reduce(
        (acc, currentVal) => acc + currentVal.price * currentVal.quantity,
        0
      );

      let itemsLength;

      if (data.length != 0) {
        itemsLength = data.length - 1;
      } else {
        itemsLength = 0;
      }
      const order = {
        user_id: user_id,
        status: "in progress",

        items: [
          {
            name: data[itemsLength].name,
            sku: data[itemsLength].sku,
            quantity: data[itemsLength].quantity,
            price: data[itemsLength].price,
            options: {
              size: data[itemsLength].options.size,
              color: data[itemsLength].options.color,
              src: data[itemsLength].options.src,
            },
          },
        ],
        total: total,
      };
      if (data.discount_id) {
        order = { ...order, discount_id: data.discount_id };
      }

      if (data.length > 1) {
        for (let i = 0; i < data.length - 1; i++) {
          //prevent duplicate item objects being added
          const result = order.items.find(({ sku }) => sku === data[i].sku);

          if (!result) {
            order.items.push(data[i]);
          }
        }
      }

      const response = await new Order(order).save();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getAllOrders() {
    try {
      const result = await Order.find();
      if (result.length > 0) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateOrderStatus(id, status) {
    try {
      const result = await Order.updateOne({ _id: id }, { status: status });
      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  static async addToExistingOrder(id, prevOrder, newItems) {
    try {
      let orderItems = prevOrder.items;
      const prevOrderLength = prevOrder.items.length;

      for (let i = 0; i < prevOrderLength; i++) {
        for (let j = 0; j < newItems.length; j++) {
          if (newItems[j].sku === orderItems[i].sku) {
            orderItems[i].quantity =
              orderItems[i].quantity + newItems[j].quantity;
          }

          if (!orderItems.some((e) => e.sku === newItems[j].sku)) {
            orderItems.push(newItems[j]);
            console.log("no duplicate");
          }
        }
      }

      //const newOrderItems = orderItems;

      let result;
      const total = orderItems.reduce(
        (acc, currentVal) => acc + currentVal.price * currentVal.quantity,
        0
      );
      result = await Order.updateOne(
        { _id: id },
        {
          $set: {
            items: orderItems,
            total: total,
          },
        }
      );

      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
      throw error;
    }
  }

  static async updatePrice(data) {
    try {
      let response;
      let percentage = await data.discount_id.discount_percent;
      for (const el of data.items) {
        const differential = el.price * percentage;
        let newPrice = el.price - differential;
        newPrice = newPrice.toFixed(2);
        //console.log(newPrice);
        response = await Order.updateOne(
          { _id: data.id, "items.sku": el.sku },
          {
            $set: {
              "items.$.price": newPrice,
            },
          }
        );
      }

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getOneOrder(id) {
    try {
      const result = await Order.findOne({
        _id: id,
      }).populate({
        path: discount_id,
        select: { _id: 1, name: 1, discount_percent: 1, active: 1 },
        strictPopulate: false,
      });

      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllUserOrders(user_id) {
    try {
      const orders = await Order.find({ user_id: user_id });

      if (orders.length > 0) {
        return orders;
      } else {
        throw new Error("did not find any orders");
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async getUserOrderInProgress(user_id) {
    try {
      const orders = await Order.findOne({
        user_id: user_id,
      });

      if (orders) {
        return orders;
      } else {
        throw new Error("did not find any orders");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteOrder(id) {
    try {
      const result = await Order.deleteOne({ _id: id });
      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
      throw error;
    }
  }
};
