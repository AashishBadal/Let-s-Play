import express from 'express';
import { check } from 'express-validator';
import { 
  createTournament,
  getTournaments,
  getTournamentById 
} from '../controllers/tournamentController.js';
import { userAuth, adminAuth } from '../middleware/userAuth.js';

const router = express.Router();

// Validation rules
const tournamentValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('game', 'Game is required').not().isEmpty(),
  check('startDate', 'Start date is required').not().isEmpty(),
  check('endDate', 'End date is required').not().isEmpty(),
  check('maxTeams', 'Maximum teams is required').isInt({ min: 2 }),
  check('format', 'Tournament format is required').not().isEmpty(),
];

router.route('/')
  .post(userAuth, adminAuth, tournamentValidation, createTournament)
  .get(getTournaments);

router.route('/:id')
  .get(getTournamentById);

export default router;