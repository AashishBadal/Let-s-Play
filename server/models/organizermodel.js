import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const OrganizerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Organizer name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true
  },
  documentImage: {
    type: String, // This will store the path/URL to the document image
    required: [true, 'Document image is required']
  },
  holdingDocumentImage: {
    type: String, // This will store the path/URL to the image of person holding the document
    required: [true, 'Image holding document is required']
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
OrganizerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Organizer = mongoose.model('Organizer', OrganizerSchema);

export default Organizer;