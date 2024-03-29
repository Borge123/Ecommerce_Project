const express = require("express");
const router = express.Router();
//const redisStore = require("../redis/redisStore");
const InventoryController = require("../controllers/InventoryController");
const UserController = require("../controllers/UserController");
const OrderController = require("../controllers/OrderController");
const DiscountController = require("../controllers/DiscountController");
const CartController = require("../controllers/CartController");
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
  validateAddBillingInfo,
} = require("../middlewares/userValidation");

const {
  validateNewOrder,
  validateUpdateOrderItem,
  validateUpdateOrderStatus,
} = require("../middlewares/orderValidation");

const {
  validateCreateDiscount,
  validateAddDiscount,
  validateRemoveDiscount,
} = require("../middlewares/DiscountValidation");

const { validateUpdateCart } = require("../middlewares/CartValidation");
const {
  checkIfAdmin,
  checkIfRegistered,
  authorize,
} = require("../middlewares/auth");

const { sessionChecker } = require("../middlewares/sessionChecker");
/* GET home page. */
router.get("/", async function (req, res, next) {
  // const test = await redisStore.client.get("sess:" + req.session.id);
  // if (test) {
  //   const parsedData = JSON.parse(test);
  //   //console.log(parsedData);
  // }

  // if (!req.session.cart) {
  //   req.session.cart = {
  //     cart: {
  //       "data": "testData",
  //     },
  //   };
  // }

  const allSessions = req.sessionStore.all(function (err, sessions) {
    if (err) {
      return err;
    } else {
      return sessions;
    }
  });

  console.log(await allSessions);

  //console.log(req.session.id);
  // console.log(req.session.cart);
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
  "/updatesku",
  checkIfAdmin,
  validateUpdateSku,
  InventoryController.updateSku
);

router.put(
  "/updateitem",
  checkIfAdmin,
  validateUpdateItem,
  InventoryController.updateItem
);

router.delete("/deleteItem", checkIfAdmin, InventoryController.deleteItem);

//Users
router.get("/users", checkIfAdmin, UserController.getAllUsers);
router.get("/protected", authorize, UserController.getAuthorizedUserInfo);
router.post("/signup", validateSignup, UserController.signup);
router.post("/login", validateLogin, UserController.login);
router.post("/logout", UserController.logout);
router.post("/refresh", UserController.refreshJwt);
router.put(
  "/updateuser",
  authorize,
  validateUpdateUser,
  UserController.updateUser
);
router.put("/changepassword", authorize, UserController.changePassword);

router.put(
  "/addBillingInfo",
  authorize,
  validateAddBillingInfo,
  UserController.addBillingInfo
);

router.delete(
  "/deleteUser",
  authorize,
  validateDeleteUser,
  UserController.deleteUser
);

//orders
router.get("/alluserorders", authorize, OrderController.getAllUserOrders);
router.get("/orders", checkIfAdmin, OrderController.getAllOrders);
router.get(
  "/orderinprogress",
  authorize,
  OrderController.getUserOrderInProgress
);
router.post(
  "/createorder",
  authorize,
  validateNewOrder,
  OrderController.createOrder,
  OrderController.createOrderUpdateItemQuantity
);
router.put(
  "/updateOrderItems",
  validateUpdateOrderItem,
  authorize,
  OrderController.updateOrderItem
);
router.put(
  "/addItemsToExistingOrder",
  validateNewOrder,

  authorize,
  OrderController.addItemsToExistingOrder
);

router.put(
  "/updateOrderStatus",
  validateUpdateOrderStatus,
  authorize,
  OrderController.updateOrderStatus
);

router.delete(
  "/cancelOrder",
  authorize,
  OrderController.cancelOrder,
  OrderController.cancelOrderUpdateItems
);
// discounts

router.post(
  "/newDiscount",
  checkIfAdmin,
  validateCreateDiscount,
  DiscountController.createDiscount
);

router.post(
  "/addDiscount",
  checkIfAdmin,
  validateAddDiscount,
  DiscountController.addDiscount
);
router.put(
  "/removeDiscount",
  checkIfAdmin,
  validateRemoveDiscount,
  DiscountController.removeDiscount
);

// cart

router.post("/updateCart", validateUpdateCart, CartController.updateCart);
router.get("/getCartItems", sessionChecker, CartController.getCartItems);
module.exports = router;
