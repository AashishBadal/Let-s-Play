import Organizer from '../models/organizerModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

// @desc    Register a new organizer
// @route   POST /api/organizers/register
// @access  Public
const registerOrganizer = asyncHandler(async (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  const organizerExists = await Organizer.findOne({ email });
  if (organizerExists) {
    res.status(400);
    throw new Error('Organizer already exists');
  }

  const organizer = new Organizer({
    name,
    email,
    password,
    contactNumber,
    documentImage: req.files?.documentImage?.[0]?.path || '',
    holdingDocumentImage: req.files?.holdingDocumentImage?.[0]?.path || ''
  });

  const salt = await bcrypt.genSalt(10);
  organizer.password = await bcrypt.hash(organizer.password, salt);

  const createdOrganizer = await organizer.save();

  if (createdOrganizer) {
    generateToken(res, createdOrganizer._id);
    res.status(201).json({
      _id: createdOrganizer._id,
      name: createdOrganizer.name,
      email: createdOrganizer.email,
      contactNumber: createdOrganizer.contactNumber,
      documentImage: createdOrganizer.documentImage,
      holdingDocumentImage: createdOrganizer.holdingDocumentImage
    });
  } else {
    res.status(400);
    throw new Error('Invalid organizer data');
  }
});

// @desc    Get organizer profile
// @route   GET /api/organizers/profile
// @access  Private
const getOrganizerProfile = asyncHandler(async (req, res) => {
  const organizer = await Organizer.findById(req.user._id);

  if (organizer) {
    res.json({
      _id: organizer._id,
      name: organizer.name,
      email: organizer.email,
      contactNumber: organizer.contactNumber,
      documentImage: organizer.documentImage,
      holdingDocumentImage: organizer.holdingDocumentImage
    });
  } else {
    res.status(404);
    throw new Error('Organizer not found');
  }
});

// @desc    Update organizer profile
// @route   PUT /api/organizers/profile
// @access  Private
const updateOrganizerProfile = asyncHandler(async (req, res) => {
  const organizer = await Organizer.findById(req.user._id);

  if (organizer) {
    organizer.name = req.body.name || organizer.name;
    organizer.email = req.body.email || organizer.email;
    organizer.contactNumber = req.body.contactNumber || organizer.contactNumber;
    
    if (req.files?.documentImage) {
      organizer.documentImage = req.files.documentImage[0].path;
    }
    
    if (req.files?.holdingDocumentImage) {
      organizer.holdingDocumentImage = req.files.holdingDocumentImage[0].path;
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      organizer.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedOrganizer = await organizer.save();

    res.json({
      _id: updatedOrganizer._id,
      name: updatedOrganizer.name,
      email: updatedOrganizer.email,
      contactNumber: updatedOrganizer.contactNumber,
      documentImage: updatedOrganizer.documentImage,
      holdingDocumentImage: updatedOrganizer.holdingDocumentImage
    });
  } else {
    res.status(404);
    throw new Error('Organizer not found');
  }
});

export {
  registerOrganizer,
  getOrganizerProfile,
  updateOrganizerProfile
};