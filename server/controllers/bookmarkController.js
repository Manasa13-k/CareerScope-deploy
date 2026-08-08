import Bookmark from '../models/Bookmark.js';
import Career from '../models/Career.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all bookmarks for current user
// @route   GET /api/bookmarks
// @access  Private
export const getBookmarks = asyncHandler(async (req, res) => {
  // Find all bookmarks for the authenticated user and populate career details
  const bookmarks = await Bookmark.find({ user: req.user.id })
    .populate({
      path: 'career',
      select: 'title slug overview difficulty salary learningDuration',
      populate: {
        path: 'category',
        select: 'name slug icon',
      },
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookmarks.length,
    data: bookmarks,
  });
});

// @desc    Add a career to bookmarks
// @route   POST /api/bookmarks
// @access  Private
export const addBookmark = asyncHandler(async (req, res) => {
  const { careerId } = req.body;

  if (!careerId) {
    res.status(400);
    throw new Error('Career ID is required');
  }

  // 1. Check if career exists in database
  const career = await Career.findById(careerId);
  if (!career) {
    res.status(404);
    throw new Error('Career not found');
  }

  // 2. Check if already bookmarked by this user
  const existingBookmark = await Bookmark.findOne({
    user: req.user.id,
    career: careerId,
  });

  if (existingBookmark) {
    res.status(400);
    throw new Error('Career is already bookmarked');
  }

  // 3. Create bookmark
  const bookmark = await Bookmark.create({
    user: req.user.id,
    career: careerId,
  });

  // Populate career info before returning
  await bookmark.populate({
    path: 'career',
    select: 'title slug overview difficulty',
  });

  res.status(211).json({
    success: true,
    data: bookmark,
  });
});

// @desc    Remove career from bookmarks
// @route   DELETE /api/bookmarks/:careerId
// @access  Private
export const removeBookmark = asyncHandler(async (req, res) => {
  const { careerId } = req.params;

  // Find and delete the bookmark for the authenticated user
  const bookmark = await Bookmark.findOneAndDelete({
    user: req.user.id,
    career: careerId,
  });

  if (!bookmark) {
    res.status(404);
    throw new Error('Bookmark not found for this career');
  }

  res.status(200).json({
    success: true,
    message: 'Career removed from bookmarks successfully',
  });
});
