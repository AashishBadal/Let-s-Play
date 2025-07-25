// validators/tournamentValidator.js
import { body } from 'express-validator';

const tournamentValidationRules = () => {
  return [
    body('title')
      .trim()
      .notEmpty().withMessage('Title is required')
      .isLength({ max: 120 }).withMessage('Title cannot exceed 120 characters'),
    
    body('description')
      .trim()
      .notEmpty().withMessage('Description is required')
      .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
    
    body('rules')
      .trim()
      .notEmpty().withMessage('Rules are required')
      .isLength({ max: 5000 }).withMessage('Rules cannot exceed 5000 characters'),
    
    body('startDate')
      .notEmpty().withMessage('Start date is required')
      .isISO8601().withMessage('Invalid date format')
      .custom((value, { req }) => {
        if (new Date(value) <= new Date()) {
          throw new Error('Start date must be in the future');
        }
        return true;
      }),
    
    body('endDate')
      .notEmpty().withMessage('End date is required')
      .isISO8601().withMessage('Invalid date format')
      .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
          throw new Error('End date must be after start date');
        }
        return true;
      }),
    
    body('slots')
      .notEmpty().withMessage('Slots are required')
      .isInt({ min: 1, max: 1000 }).withMessage('Slots must be between 1 and 1000'),
    
    body('prizePool')
      .optional()
      .isFloat({ min: 0 }).withMessage('Prize pool cannot be negative'),
    
    body('firstPrize')
      .optional()
      .isFloat({ min: 0 }).withMessage('First prize cannot be negative'),
    
    body('secondPrize')
      .optional()
      .isFloat({ min: 0 }).withMessage('Second prize cannot be negative'),
    
    body('thirdPrize')
      .optional()
      .isFloat({ min: 0 }).withMessage('Third prize cannot be negative'),
    
    body('entryFee')
      .optional()
      .isFloat({ min: 0 }).withMessage('Entry fee cannot be negative')
  ];
};

export { tournamentValidationRules };