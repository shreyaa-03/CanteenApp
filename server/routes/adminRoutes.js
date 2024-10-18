const express = require("express");
const addAdmin = require("../controllers/admin/addAdmin");
const {
  getAllAdmins,
  getSingleAdmin,
} = require("../controllers/admin/getAdmin");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { logout } = require("../controllers/userAuth/logout");
const {
  getPendingOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/admin/adminOrder/getPendingOrder");

router.use(validateToken);

router.route("/all").get(getAllAdmins);
router.route("/:phone").get(getSingleAdmin);
router.route("/add").post(addAdmin);
router.route("/logout").post(logout);
// router.route("/order/:status").get(getPendingOrders);
router.route("/order/all").get(getAllOrders);
router.route("/order/status/:id").patch(updateOrderStatus);

module.exports = router;
