import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

// @desc    Get category by slug
// @route   GET /api/categories/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    res.status(404);
    throw new Error(`Category not found with slug: ${req.params.slug}`);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, icon } = req.body;

  // Check if category name already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({
    name,
    description,
    icon,
  });

  res.status(211).json({
    success: true,
    data: category,
  });
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error(`Category not found with id: ${req.params.id}`);
  }

  // Update category details (automatically regenerates slug if name changes)
  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error(`Category not found with id: ${req.params.id}`);
  }

  // Delete category
  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});
