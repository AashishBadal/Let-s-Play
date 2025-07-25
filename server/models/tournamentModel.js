// models/Tournament.js
import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tournament title is required'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  rules: {
    type: String,
    required: [true, 'Rules and regulations are required'],
    trim: true,
    maxlength: [5000, 'Rules cannot exceed 5000 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Start date must be in the future'
    }
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  slots: {
    type: Number,
    required: [true, 'Number of slots is required'],
    min: [1, 'There must be at least 1 slot'],
    max: [1000, 'Cannot have more than 1000 slots']
  },
  prizePool: {
    type: Number,
    min: [0, 'Prize pool cannot be negative'],
    default: 0
  },
  prizes: {
    first: {
      type: Number,
      min: [0, 'Prize cannot be negative'],
      default: 0
    },
    second: {
      type: Number,
      min: [0, 'Prize cannot be negative'],
      default: 0
    },
    third: {
      type: Number,
      min: [0, 'Prize cannot be negative'],
      default: 0
    }
  },
  entryFee: {
    type: Number,
    min: [0, 'Entry fee cannot be negative'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
tournamentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a compound index for better query performance
tournamentSchema.index({ startDate: 1, endDate: 1 });

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;