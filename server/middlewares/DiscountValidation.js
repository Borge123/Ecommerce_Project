const DiscountService = require("../services/DiscountService");
const InventoryService = require("../services/InventoryService");
module.exports = {
  validateCreateDiscount: async (req, res, next) => {
    const { name, discount_percent, active } = req.body;

    if (name === undefined || name === null) {
      return res.status(400).json({ "name": "name is required." });
    }

    if (name === "" || typeof name !== "string") {
      return res.status(400).json({
        "name": "name needs to be a string and is required.",
      });
    }

    if (discount_percent === undefined || discount_percent === null) {
      return res
        .status(400)
        .json({ "discount_percent": "discount_percent is required." });
    }

    if (discount_percent === "" || typeof discount_percent !== "number") {
      return res.status(400).json({
        "discount_percent":
          "discount_percent needs to be a number and is required.",
      });
    }

    if (active === undefined || active === null) {
      return res.status(400).json({ "active": "active is required." });
    }

    if (active === "" || typeof active !== "boolean") {
      return res.status(400).json({
        "active": "active needs to be a boolean and is required.",
      });
    }

    next();
  },

  validateAddDiscount: async (req, res, next) => {
    const { id, discount_id } = req.body;
    if (id === undefined || id === null) {
      return res.status(400).json({ "id": "id is required." });
    }

    if (id === "" || typeof id !== "string") {
      return res.status(400).json({
        "id": "id needs to be a string and is required.",
      });
    }

    if (discount_id === undefined || discount_id === null) {
      return res
        .status(400)
        .json({ "discount_id": "discount_id is required." });
    }

    if (discount_id === "" || typeof discount_id !== "string") {
      return res.status(400).json({
        "discount_id": "discount_id needs to be a string and is required.",
      });
    }

    try {
      const itemExists = await InventoryService.getOneItem(id);
      const discountExists = await DiscountService.getDiscountById(discount_id);

      if (itemExists && discountExists) {
        if (!itemExists.item.discount_id) {
          req.item = itemExists;
          req.discount = discountExists;
          next();
        } else {
          return res.status(400).json({
            "Item": "Item already has discount added",
          });
        }
      } else {
        return res.status(400).json({
          "Item/discount": "Item/discount not found.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  validateRemoveDiscount: async (req, res, next) => {
    const { id } = req.body;

    if (id === undefined || id === null) {
      return res.status(400).json({ "id": "id is required." });
    }

    if (id === "" || typeof id !== "string") {
      return res.status(400).json({
        "id": "id needs to be a string and is required.",
      });
    }
    try {
      const itemExists = await InventoryService.getOneItem(id);
      if (itemExists) {
        if (itemExists.item.discount_id != undefined) {
          req.item = itemExists;
          next();
        } else {
          return res.status(400).json({
            "Item": "Item doesnt have a discount added.",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
