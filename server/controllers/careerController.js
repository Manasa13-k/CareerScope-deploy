import mongoose from 'mongoose';
import Career from '../models/Career.js';
import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all careers with search, filter, pagination, and sorting
// @route   GET /api/careers
// @access  Public
export const getCareers = asyncHandler(async (req, res) => {
  let query = {};

  // 1. Text Search (title, overview, skills, tools)
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  // 2. Category Filter (by category slug)
  if (req.query.category) {
    const categoryDoc = await Category.findOne({ slug: req.query.category });
    if (categoryDoc) {
      query.category = categoryDoc._id;
    } else {
      // Category not found, return empty results immediately
      return res.status(200).json({
        success: true,
        count: 0,
        total: 0,
        pagination: {},
        data: [],
      });
    }
  }

  // 3. Difficulty Filter
  if (req.query.difficulty) {
    query.difficulty = req.query.difficulty;
  }

  // 4. Sorting Setup
  let sortOption = {};
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'highest-salary':
        sortOption = { 'salary.median': -1 };
        break;
      case 'difficulty':
        sortOption = { difficulty: 1 }; // alphabetical or custom if needed
        break;
      case 'duration':
        sortOption = { learningDuration: 1 };
        break;
      case 'title':
      default:
        sortOption = { title: 1 }; // Default A-Z
        break;
    }
  } else {
    sortOption = { title: 1 }; // Default A-Z
  }

  // 5. Pagination Setup
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const total = await Career.countDocuments(query);

  const careers = await Career.find(query)
    .populate({
      path: 'category',
      select: 'name slug icon',
    })
    .sort(sortOption)
    .skip(startIndex)
    .limit(limit);

  // Pagination result formatting
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: careers.length,
    total,
    pagination,
    data: careers,
  });
});

// @desc    Get career by slug
// @route   GET /api/careers/:slug
// @access  Public
export const getCareerBySlug = asyncHandler(async (req, res) => {
  const career = await Career.findOne({ slug: req.params.slug }).populate({
    path: 'category',
    select: 'name slug icon description',
  });

  if (!career) {
    res.status(404);
    throw new Error(`Career not found with slug: ${req.params.slug}`);
  }

  res.status(200).json({
    success: true,
    data: career,
  });
});

// @desc    Create a career
// @route   POST /api/careers
// @access  Private/Admin
export const createCareer = asyncHandler(async (req, res) => {
  const { category } = req.body;

  // Verify that category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    res.status(400);
    throw new Error('Valid category reference is required');
  }

  // Verify that career title is unique
  const titleExists = await Career.findOne({ title: req.body.title });
  if (titleExists) {
    res.status(400);
    throw new Error('Career with this title already exists');
  }

  const career = await Career.create(req.body);

  res.status(211).json({
    success: true,
    data: career,
  });
});

// @desc    Update a career
// @route   PUT /api/careers/:id
// @access  Private/Admin
export const updateCareer = asyncHandler(async (req, res) => {
  let career = await Career.findById(req.params.id);

  if (!career) {
    res.status(404);
    throw new Error(`Career not found with id: ${req.params.id}`);
  }

  // If updating category, check if category exists
  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      res.status(400);
      throw new Error('Valid category reference is required');
    }
  }

  career = await Career.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: career,
  });
});

// @desc    Delete a career
// @route   DELETE /api/careers/:id
// @access  Private/Admin
export const deleteCareer = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);

  if (!career) {
    res.status(404);
    throw new Error(`Career not found with id: ${req.params.id}`);
  }

  await career.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Career deleted successfully',
  });
});
