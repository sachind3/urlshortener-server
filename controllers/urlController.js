const asyncHandler = require("express-async-handler");
const Url = require("../models/Url");
const Click = require("../models/Click");

// @desc    Create new URL
// @route   POST /api/url/create
// @access  Private

const createUrl = asyncHandler(async (req, res) => {
  const { title, original_url, short_url } = req.body;
  if (!title || !original_url || !short_url) {
    res.status(400);
    throw new Error("Title, original URL, and short URL are required");
  }
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!urlPattern.test(original_url)) {
    res.status(400);
    throw new Error("Invalid original URL format");
  }
  const existingShortUrl = await Url.findOne({ short_url });
  if (existingShortUrl) {
    res.status(400);
    throw new Error("Short URL already exists");
  }

  const newUrl = new Url({
    userId: req.user._id,
    title,
    original_url,
    short_url,
  });
  const savedUrl = await newUrl.save();
  res.status(201).json(savedUrl);
});

// @desc    Get all URLs
// @route   GET /api/url
// @access  Private
const getAllUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ userId: req.user._id });
  res.status(200).json(urls);
});

// @desc    Get single URL
// @route   GET /api/url/:id
// @access  Private
const getUrl = asyncHandler(async (req, res) => {
  const url = await Url.findById(req.params.id);

  if (!url) {
    res.status(404);
    throw new Error("URL not found");
  }

  if (url.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to view this URL");
  }

  res.status(200).json(url);
});

// @desc    Delete URL
// @route   DELETE /api/url/:id
// @access  Private
const deleteUrl = asyncHandler(async (req, res) => {
  const url = await Url.findById(req.params.id);

  if (!url) {
    res.status(404);
    throw new Error("URL not found");
  }

  if (url.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this URL");
  }

  // Delete the URL
  await Url.deleteOne({ _id: req.params.id });

  // Delete the corresponding clicks
  await Click.deleteMany({ urlId: req.params.id });

  res.status(200).json({ message: "URL and corresponding clicks removed" });
});

// @desc    Redirect to original URL
// @route   GET /api/url/redirect/:short_url
// @access  Public
const redirectUrl = asyncHandler(async (req, res) => {
  const { short_url } = req.params;

  const url = await Url.findOne({ short_url });
  if (!url) {
    res.status(404);
    throw new Error("URL not found");
  }

  res.status(200).json(url);
});

module.exports = { createUrl, getAllUrls, getUrl, deleteUrl, redirectUrl };
