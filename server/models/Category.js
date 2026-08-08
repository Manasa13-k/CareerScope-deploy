import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      default: 'Folder', // Default icon string name for frontend UI
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before validation
categorySchema.pre('validate', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = this.name
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
