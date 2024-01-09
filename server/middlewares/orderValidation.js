module.exports = {
  validateNewOrder: async (req, res, next) => {
    //Possibly pick a discount based on order total
    for (const el of req.body) {
      const { name, sku, quantity, price } = el;
      if (name === undefined || name === null) {
        return res.status(400).json({ "name": "name is required." });
      }

      if (name === "" || typeof name !== "string") {
        return res.status(400).json({
          "name": "name needs to be a string and is required.",
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

      const { size, color, src } = el.options;
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

      if (src === undefined || src === null) {
        return res.status(400).json({ "img_url": "img_url is required." });
      }

      if (src === "" || typeof src !== "string") {
        return res.status(400).json({
          "img_url": "img_url needs to be a string and is required.",
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
