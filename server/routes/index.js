const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");
const UserController = require("../controllers/UserController");

/* GET home page. */
router.get("/", function (req, res, next) {
  const testData = {
    item: {
      name: "testitem",
      description: "testdesc",
    },
    skus: [
      {
        sku: "kfkf",
        price: 22,
        discount_id: "fdff",
        stock_quantity: 2,
        options: {
          size: "L",
          color: "blue",
          img_url: "sfdfsf",
        },
      },
    ],
    categories: [
      {
        category: "testcategory",
      },
    ],
  };

  console.log(testData.skus.length);
  res.send({ testData });
});

router.post("/createItem", InventoryController.createItem);

router.post("/createUser", UserController.createUser);
module.exports = router;
