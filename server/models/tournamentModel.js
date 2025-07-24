import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  game: {
    type: String,
    required: true,
    enum: ['Valorant', 'League of Legends', 'Dota 2', 'Counter-Strike 2', 'Fortnite', 'Rocket League', 'Other'],
    index: true
  },
  description: {
    type: String,
    maxlength: 2000
  },
  startDate: {
    type: Date,
    required: true,
    index: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  prizePool: {
    total: {
      type: Number,
      min: 0,
      default: 0
    },
    distribution: [{
      position: {
        type: Number,
        required: true,
        min: 1
      },
      prize: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        default: 'USD',
        enum: ['USD', 'EUR', 'GBP', 'INR', 'Other']
      }
    }]
  },
  entryFee: {
    amount: {
      type: Number,
      min: 0,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'INR', 'Other']
    },
    perTeam: {
      type: Boolean,
      default: true
    }
  },
  maxTeams: {
    type: Number,
    min: 2,
    required: true
  },
  currentTeams: {
    type: Number,
    min: 0,
    default: 0
  },
  registration: {
    status: {
      type: String,
      required: true,
      enum: ['open', 'closed', 'full'],
      default: 'open'
    },
    startDate: Date,
    endDate: {
      type: Date,
      validate: {
        validator: function(value) {
          return value < this.startDate;
        },
        message: 'Registration end must be before tournament start'
      }
    }
  },
  rules: [{
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000
    }
  }],
  format: {
    type: String,
    enum: ['single-elimination', 'double-elimination', 'round-robin', 'swiss', 'custom'],
    required: true
  },
  organizers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'observer']
    }
  }],
  streamLink: String,
  bannerImage: String,
  logo: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  platformRestrictions: [String], // e.g., ['PC', 'PlayStation', 'Xbox']
  regionRestrictions: [String],   // e.g., ['NA', 'EU', 'Asia']
  minTeamSize: {
    type: Number,
    min: 1,
    default: 1
  },
  maxTeamSize: {
    type: Number,
    min: 1,
    default: 5
  }
});
const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;
