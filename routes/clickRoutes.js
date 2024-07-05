const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  storeClickData,
  getClickData,
  getAllClickData,
} = require("../controllers/clickController");

const router = express.Router();

router.route("/").post(storeClickData).get(protect, getAllClickData);
router.route("/:urlId").get(protect, getClickData);

module.exports = router;
