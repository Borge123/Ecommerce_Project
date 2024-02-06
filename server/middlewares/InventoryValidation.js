module.exports = {
  validateItem: async (req, res, next) => {
    const { name, description, img_url } = req.body;

    if (name === undefined || name === null) {
      return res.status(400).json({ "name": "name is required." });
    }

    if (name === "" || typeof name !== "string") {
      return res.status(400).json({
        "name": "name needs to be a string and is required.",
      });
    }

    if (description === undefined || description === null) {
      return res
        .status(400)
        .json({ "description": "description is required." });
    }

    if (description === "" || typeof description !== "string") {
      return res.status(400).json({
        "description": "description needs to be a string and is required.",
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

    for (const el of req.body.skus) {
      const { sku, price, stock_quantity } = el;
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
      if (stock_quantity === undefined || stock_quantity === null) {
        return res
          .status(400)
          .json({ "stock_quantity": "stock_quantity is required." });
      }

      if (stock_quantity === "" || typeof stock_quantity !== "number") {
        return res.status(400).json({
          "stock_quantity":
            "stock_quantity needs to be a number and is required.",
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

    const { category, subcategory } = req.body;

    if (category === undefined || category === null) {
      return res.status(400).json({ "category": "category is required." });
    }

    if (category === "" || typeof category !== "string") {
      return res.status(400).json({
        "category": "category needs to be a string and is required.",
      });
    }

    if (subcategory === undefined || subcategory === null) {
      return res
        .status(400)
        .json({ "subcategory": "subcategory is required." });
    }

    if (subcategory === "" || typeof subcategory !== "string") {
      return res.status(400).json({
        "subcategory": "subcategory needs to be a string and is required.",
      });
    }

    next();
  },

  validateUpdateSku: async (req, res, next) => {
    const { _id, newsku, price, stock_quantity } = req.body;
    if (_id === undefined || _id === null) {
      return res.status(400).json({ "id": "id is required." });
    }

    if (_id === "" || typeof _id !== "string") {
      return res.status(400).json({
        "id": "id needs to be a string and is required.",
      });
    }

    if (newsku === undefined || newsku === null) {
      return res.status(400).json({ "sku": "sku is required." });
    }

    if (newsku === "" || typeof newsku !== "string") {
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
    if (stock_quantity === undefined || stock_quantity === null) {
      return res
        .status(400)
        .json({ "stock_quantity": "stock_quantity is required." });
    }

    if (stock_quantity === "" || typeof stock_quantity !== "number") {
      return res.status(400).json({
        "stock_quantity":
          "stock_quantity needs to be a number and is required.",
      });
    }
    const { size, color, img_url } = req.body.options;
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
    next();
  },

  validateUpdateItem: async (req, res, next) => {
    const { _id, name, description, img_url } = req.body;

    if (_id === undefined || _id === null) {
      return res.status(400).json({ "id": "id is required." });
    }

    if (_id === "" || typeof _id !== "string") {
      return res.status(400).json({
        "id": "id needs to be a string and is required.",
      });
    }

    if (name === undefined || name === null) {
      return res.status(400).json({ "name": "name is required." });
    }

    if (name === "" || typeof name !== "string") {
      return res.status(400).json({
        "name": "name needs to be a string and is required.",
      });
    }

    if (description === undefined || description === null) {
      return res
        .status(400)
        .json({ "description": "description is required." });
    }

    if (description === "" || typeof description !== "string") {
      return res.status(400).json({
        "description": "description needs to be a string and is required.",
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

    next();
  },
};
