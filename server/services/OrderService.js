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
            options: {
              size: data.items[itemsLength].options.size,
              color: data.items[itemsLength].options.color,
              img_url: data.items[itemsLength].options.img_url,
            },
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
      console.log(error);
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
      const orders = Order.find({ user_id: user_id });

      if (orders.length > 0) {
        return orders;
      } else {
        throw new Error("did not find any orders");
      }
    } catch (error) {
      console.log(error);
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
