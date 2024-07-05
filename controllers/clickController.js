const asyncHandler = require("express-async-handler");
const Click = require("../models/Click");
const Url = require("../models/Url");
const User = require("../models/User");

// @desc    Store click data
// @route   POST /api/click
// @access  Public
const storeClickData = asyncHandler(async (req, res) => {
  const { urlId, city, country, device } = req.body;

  if (!urlId) {
    res.status(400);
    throw new Error("URL ID is required");
  }
  const url = await Url.findById(urlId);
  if (!url) {
    res.status(404);
    throw new Error("URL not found");
  }
  const click = new Click({
    urlId,
    city,
    country,
    device,
  });

  const savedClick = await click.save();
  res.status(201).json(savedClick);
});

// @desc    Get click data
// @route   GET /api/click/:urlId
// @access  Private
const getClickData = asyncHandler(async (req, res) => {
  const { urlId } = req.params;

  const url = await Url.findById(urlId);
  if (!url) {
    res.status(404);
    throw new Error("URL not found");
  }

  if (url.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to view this data");
  }

  const clicks = await Click.find({ urlId });
  res.status(200).json(clicks);
});

// @desc    Get all click data
// @route   GET /api/click
// @access  Private
const getAllClickData = asyncHandler(async (req, res) => {
  const urls = await Url.find({ userId: req.user._id });

  const urlIds = urls.map((url) => url._id.toString());
  const clicks = await Click.find({ urlId: { $in: urlIds } });

  res.status(200).json(clicks);
});

module.exports = { storeClickData, getClickData, getAllClickData };
