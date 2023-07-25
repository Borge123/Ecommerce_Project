module.exports = {
  validateUpdateCart: async (req, res, next) => {
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

      const { size, color, img_url } = el.options;
      if (size === undefined || size === null) {
        return res.status(400).json({ "size": "size is required." });
      }

      if (size === "" || typeof size !== "string") {
        return res.status(400).json({
          "size": "size needs to be a string and is required.",
        });
      }
      if (color === undefined || color === null) {
        return res.status(400).json({ "color": "color is required." });
      }

      if (color === "" || typeof color !== "string") {
        return res.status(400).json({
          "color": "color needs to be a string and is required.",
        });
      }

      if (img_url === undefined || img_url === null) {
        return res.status(400).json({ "img_url": "img_url is required." });
      }

      if (img_url === "" || typeof img_url !== "string") {
        return res.status(400).json({
          "img_url": "img_url needs to be a string and is required.",
        });
      }
    }
    next();
  },
};
