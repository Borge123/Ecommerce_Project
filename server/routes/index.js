const express = require("express");
const router = express.Router();
const redisStore = require("../redis/redisStore");
const InventoryController = require("../controllers/InventoryController");
const UserController = require("../controllers/UserController");
const {
  validateItem,
  validateUpdateSku,
  validateUpdateItem,
} = require("../middlewares/InventoryValidation");
const {
  validateSignup,
  validateUpdateUser,
  validateLogin,
  validateDeleteUser,
} = require("../middlewares/userValidation");

const { checkIfAdmin } = require("../middlewares/auth");
const { sessionChecker } = require("../middlewares/sessionChecker");
/* GET home page. */
router.get("/", async function (req, res, next) {
  //console.log());
  // await redisStore.client.set("user-session:123", {
  //   "name": "John",
  //   "surname": "Smith",
  //   "company": "Redis",
  //   "age": 29,
  // });
  //console.log(redisStore.client);

  const test = await redisStore.client.get("sess:" + req.session.id);
  if (test) {
    const parsedData = JSON.parse(test);
    console.log(parsedData.key);
  }

  if (!req.session.key) {
    //req.session.key = test2;
    req.session.key = {
      cart: {
        "data": "testData",
      },
    };
  }

  console.log(req.session);
  console.log(req.session.id);

  res.send("hello");
});

//Inventories
router.get("/items", InventoryController.getAllItems);

router.post(
  "/createItem",
  checkIfAdmin,
  validateItem,
  InventoryController.createItem
);

router.put(
  "/updateSku",
  checkIfAdmin,
  validateUpdateSku,
  InventoryController.updateSku
);

router.put(
  "/updateItem",
  checkIfAdmin,
  validateUpdateItem,
  InventoryController.updateItem
);

router.delete("/deleteItem", checkIfAdmin, InventoryController.deleteItem);

//Users
router.get("/users", checkIfAdmin, UserController.getAllUsers);
router.post("/signup", validateSignup, UserController.signup);
router.post("/login", validateLogin, UserController.login);
router.put(
  "/updateUser",
  checkIfAdmin,
  validateUpdateUser,
  UserController.updateUser
);

router.delete(
  "/deleteUser",
  checkIfAdmin,
  validateDeleteUser,
  UserController.deleteUser
);
module.exports = router;
