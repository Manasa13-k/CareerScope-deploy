import mongoose from 'mongoose';

const roadmapStepSchema = new mongoose.Schema({
  step: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const learningResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['Course', 'Book', 'Documentation', 'Tutorial', 'Video', 'Other'],
    default: 'Course',
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
});

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a career title'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    overview: {
      type: String,
      required: [true, 'Please add an overview'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please add a category reference'],
      index: true,
    },
    responsibilities: {
      type: [String],
      required: [true, 'Please add key responsibilities'],
    },
    technicalSkills: {
      type: [String],
      required: [true, 'Please add technical skills required'],
    },
    softSkills: {
      type: [String],
      required: [true, 'Please add soft skills required'],
    },
    tools: {
      type: [String],
      required: [true, 'Please add tools used in this career'],
    },
    education: {
      type: String,
      required: [true, 'Please add education requirements'],
      trim: true,
    },
    roadmap: {
      type: [roadmapStepSchema],
      required: [true, 'Please add step-by-step roadmap details'],
    },
    salary: {
      min: {
        type: Number,
        required: [true, 'Please add minimum salary'],
      },
      max: {
        type: Number,
        required: [true, 'Please add maximum salary'],
      },
      median: {
        type: Number,
        required: [true, 'Please add median salary'],
      },
      currency: {
        type: String,
        default: 'USD',
      },
    },
    futureScope: {
      type: String,
      trim: true,
    },
    learningResources: {
      type: [learningResourceSchema],
      required: [true, 'Please add learning resources'],
    },
    companies: {
      type: [String],
      required: [true, 'Please add top companies hiring for this role'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    learningDuration: {
      type: String,
      required: [true, 'Please add learning duration details (e.g. 6 months)'],
      trim: true,
    },
    faqs: {
      type: [faqSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before validation
careerSchema.pre('validate', function (next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = this.title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  }
  next();
});

// Single and text indexes for fast search and filter queries
careerSchema.index({ difficulty: 1 });
careerSchema.index({ 'salary.median': 1 });
careerSchema.index({ learningDuration: 1 });

// Create compound text index for search on title, overview, and skills
careerSchema.index({
  title: 'text',
  overview: 'text',
  technicalSkills: 'text',
  tools: 'text'
}, {
  weights: {
    title: 10,
    technicalSkills: 5,
    tools: 3,
    overview: 1
  },
  name: 'CareerTextSearchIndex'
});

const Career = mongoose.model('Career', careerSchema);
export default Career;
