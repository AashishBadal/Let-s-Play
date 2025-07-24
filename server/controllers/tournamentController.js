import Tournament from '../models/tournamentModel.js';
import { validationResult } from 'express-validator';

/**
 * @desc    Create a new tournament
 * @route   POST /api/tournaments
 * @access  Private/Admin
 */
export const createTournament = async (req, res) => {
  // 1. Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // 2. Extract data from request body
    const {
      title,
      game,
      description,
      startDate,
      endDate,
      prizePool,
      entryFee,
      maxTeams,
      registration,
      rules,
      format,
      platformRestrictions,
      minTeamSize,
      maxTeamSize
    } = req.body;

    // 3. Additional validation checks
    // Check if end date is after start date
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        success: false,
        error: 'End date must be after start date'
      });
    }

    // Check registration dates
    if (registration.startDate && registration.endDate) {
      if (new Date(registration.endDate) >= new Date(startDate)) {
        return res.status(400).json({
          success: false,
          error: 'Registration must end before tournament starts'
        });
      }
    }

    // Check prize distribution sums to total
    if (prizePool.distribution) {
      const calculatedTotal = prizePool.distribution.reduce(
        (sum, item) => sum + item.prize, 0
      );
      if (calculatedTotal !== prizePool.total) {
        return res.status(400).json({
          success: false,
          error: 'Prize distribution does not match total prize pool'
        });
      }
    }

    // Check team sizes
    if (minTeamSize > maxTeamSize) {
      return res.status(400).json({
        success: false,
        error: 'Minimum team size cannot be greater than maximum team size'
      });
    }

    // 4. Create tournament object
    const tournamentData = {
      title,
      game,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      prizePool: {
        total: prizePool.total || 0,
        distribution: prizePool.distribution || []
      },
      entryFee: {
        amount: entryFee.amount || 0,
        currency: entryFee.currency || 'USD',
        perTeam: entryFee.perTeam !== undefined ? entryFee.perTeam : true
      },
      maxTeams,
      currentTeams: 0, // Initialize with 0 teams
      registration: {
        status: registration.status || 'open',
        startDate: registration.startDate ? new Date(registration.startDate) : null,
        endDate: registration.endDate ? new Date(registration.endDate) : null
      },
      rules: rules || [],
      format,
      platformRestrictions: platformRestrictions || [],
      minTeamSize: minTeamSize || 1,
      maxTeamSize: maxTeamSize || 5,
      organizers: [{
        userId: req.user._id, // Assuming you have user data in req.user
        role: 'admin'
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 5. Save to database
    const tournament = await Tournament.create(tournamentData);

    // 6. Return success response
    res.status(201).json({
      success: true,
      data: tournament,
      message: 'Tournament created successfully'
    });

  } catch (err) {
    // 7. Handle errors
    console.error('Error creating tournament:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    // Duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A tournament with this title already exists'
      });
    }

    // Other errors
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Other controller functions can be added here and exported
export const getTournaments = async (req, res) => {
  // Implementation for getting tournaments
};

export const getTournamentById = async (req, res) => {
  // Implementation for getting a single tournament
};