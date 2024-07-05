const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createUrl,
  getAllUrls,
  getUrl,
  deleteUrl,
  redirectUrl,
} = require("../controllers/urlController");

const router = express.Router();

router.route("/").post(protect, createUrl).get(protect, getAllUrls);
router.route("/:id").get(protect, getUrl).delete(protect, deleteUrl);
router.route("/redirect/:short_url").get(redirectUrl);

module.exports = router;
