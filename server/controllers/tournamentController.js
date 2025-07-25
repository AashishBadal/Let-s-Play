// controllers/tournamentController.js
import Tournament from '../models/tournamentModel.js';
import { validationResult } from 'express-validator';

/**
 * @desc    Create a new tournament
 * @route   POST /api/tournaments
 * @access  Private/Admin
 */
const createTournament = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      rules,
      startDate,
      endDate,
      slots,
      prizePool,
      firstPrize,
      secondPrize,
      thirdPrize,
      entryFee
    } = req.body;

    // Create tournament object
    const tournament = new Tournament({
      title,
      description,
      rules,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      slots: Number(slots),
      prizePool: Number(prizePool),
      prizes: {
        first: Number(firstPrize),
        second: Number(secondPrize),
        third: Number(thirdPrize)
      },
      entryFee: Number(entryFee)
    });

    // Save to database
    const createdTournament = await tournament.save();

    res.status(201).json({
      success: true,
      message: 'Tournament created successfully',
      tournament: createdTournament
    });

  } catch (error) {
    console.error('Error creating tournament:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create tournament',
      error: error.message
    });
  }
};

export { createTournament };