const Order = require("../services/OrderService");
module.exports = {
  validateNewOrder: async (req, res, next) => {
    //Possibly pick a discount based on order total
    for (const el of req.body.items) {
      const { sku, quantity, price } = el;

      if (sku === undefined || sku === null) {
        return res.status(400).json({ "sku": "sku is required." });
      }

      if (sku === "" || typeof sku !== "string") {
        return res.status(400).json({
          "sku": "sku needs to be a string and is required.",
        });
      }

      if (price === undefined || price === null) {
        return res.status(400).json({ "price": "price is required." });
      }

      if (price === "" || typeof price !== "number") {
        return res.status(400).json({
          "price": "price needs to be a number and is required.",
        });
      }
      if (quantity === undefined || quantity === null) {
        return res.status(400).json({ "quantity": "quantity is required." });
      }

      if (quantity === "" || typeof quantity !== "number") {
        return res.status(400).json({
          "quantity": "quantity needs to be a number and is required.",
        });
      }
    }

    next();
  },

  validateUpdateOrderItem: async (req, res, next) => {
    const { id, sku, quantity } = req.body;
    if (id === undefined || id === null) {
      return res.status(400).json({ "id": "id is required." });
    }

    if (id === "" || typeof id !== "string") {
      return res.status(400).json({
        "id": "id needs to be a string and is required.",
      });
    }

    if (sku === undefined || sku === null) {
      return res.status(400).json({ "sku": "sku is required." });
    }

    if (sku === "" || typeof sku !== "string") {
      return res.status(400).json({
        "sku": "sku needs to be a string and is required.",
      });
    }

    if (quantity === undefined || quantity === null) {
      return res.status(400).json({ "quantity": "quantity is required." });
    }

    if (quantity === "" || typeof quantity !== "number") {
      return res.status(400).json({
        "quantity": "quantity needs to be a number and is required.",
      });
    }

    next();
  },

  validateUpdateOrderStatus: async (req, res, next) => {
    const { id, status } = req.body;
    if (id === undefined || id === null) {
      return res.status(400).json({ "id": "id is required." });
    }

    if (id === "" || typeof id !== "string") {
      return res.status(400).json({
        "id": "id needs to be a string and is required.",
      });
    }

    if (status === undefined || status === null) {
      return res.status(400).json({ "status": "status is required." });
    }

    if (status === "" || typeof status !== "string") {
      return res.status(400).json({
        "status": "status needs to be a string and is required.",
      });
    }

    next();
  },
};
