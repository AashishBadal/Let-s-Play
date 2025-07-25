// routes/tournamentRoutes.js
import express from 'express';
import { createTournament } from '../controllers/tournamentController.js';
import { tournamentValidationRules } from '../validators/tournamentValidator.js';
const router = express.Router();

router.post(
  '/',
  tournamentValidationRules(),
  createTournament
);

export default router;