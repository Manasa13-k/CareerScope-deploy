import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user reference'],
      index: true,
    },
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
      required: [true, 'Please add a career reference'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can only bookmark a specific career once
bookmarkSchema.index({ user: 1, career: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
