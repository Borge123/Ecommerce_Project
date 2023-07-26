const { calcTotal } = require("../helpers/calcTotal");
module.exports = class CartController {
  static async updateCart(req, res, next) {
    try {
      //   const test = await redisStore.client.get("sess:" + req.session.id);
      //   if (test) {
      //     const parsedData = JSON.parse(test);
      //     console.log(req.session.id);
      //   }
      const cart = req.body;
      cart.total = await calcTotal(cart.items);

      if (cart.total) {
        req.session.cart = cart;

        return res
          .status(200)
          .json({ "Cart": "Success", "Updated": req.session?.cart });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }
  static async getCartItems(req, res, next) {
    try {
      //console.log(req.session.id);
      //   const cart = await redisStore.client.get("sess:" + req.session.id);
      //   if (cart) {
      //     const parsedData = JSON.parse(cart);
      //     //console.log(parsedData);
      //   }

      return res
        .status(200)
        .json({ "Cart": "Success", "Data": req.session?.cart });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.name + " " + error.message });
    }
  }
};
