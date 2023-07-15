const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");
const UserController = require("../controllers/UserController");
const {
  validateSignup,
  validateUpdateUser,
  validateLogin,
} = require("../middlewares/userValidation");

const { checkIfAdmin } = require("../middlewares/auth");
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

router.post("/signup", validateSignup, UserController.signup);
router.post("/login", validateLogin, UserController.login);
router.put(
  "/updateUser",
  checkIfAdmin,
  validateUpdateUser,
  UserController.updateUser
);
module.exports = router;
