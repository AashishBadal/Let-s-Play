import express from 'express';
import {
  registerOrganizer,
  getOrganizerProfile,
  updateOrganizerProfile
} from '../controllers/organizerController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post('/register', upload.fields([
  { name: 'documentImage', maxCount: 1 },
  { name: 'holdingDocumentImage', maxCount: 1 }
]), registerOrganizer);

router.route('/profile')
  .get( getOrganizerProfile)
  .put( upload.fields([
    { name: 'documentImage', maxCount: 1 },
    { name: 'holdingDocumentImage', maxCount: 1 }
  ]), updateOrganizerProfile);

export default router;