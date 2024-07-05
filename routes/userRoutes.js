const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/profile").get(protect, getUserProfile);

module.exports = router;
