module.exports = {
  validateNewOrder: async (req, res, next) => {
    for (const el of req.body.items) {
      const { sku, quantity, price, total } = el;

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

      if (total === undefined || total === null) {
        return res.status(400).json({ "total": "total is required." });
      }

      if (total === "" || typeof total !== "number") {
        return res.status(400).json({
          "total": "total needs to be a number and is required.",
        });
      }
    }

    next();
  },
};
