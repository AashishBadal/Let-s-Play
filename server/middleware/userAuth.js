import jwt from "jsonwebtoken";
import "dotenv/config";
import Tournament from "../models/tournamentModel.js";
import { use } from "react";

// Your existing user authentication
export const userAuth = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized - please login" });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.user = { _id: tokenDecode.id }; // Standardize to match Mongoose user object
            next();
        } else {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: error.name === 'TokenExpiredError' 
                ? "Session expired - please login again" 
                : "Invalid authentication token"
        });
    }
}

// Admin authorization middleware
export const adminAuth = async (req, res, next) => {
    try {
        // Assuming your user model has an isAdmin field
        if (!req.user?.isAdmin) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized - admin privileges required" 
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Authorization check failed" 
        });
    }
}

// Tournament organizer authorization
export const organizerAuth = async (req, res, next) => {
    try {
        const tournament = await Tournament.findById(req.params.tournamentId || req.params.id);
        
        if (!tournament) {
            return res.status(404).json({ 
                success: false, 
                message: "Tournament not found" 
            });
        }

        const isOrganizer = tournament.organizers.some(
            org => org.userId.toString() === req.user._id.toString()
        );

        if (!isOrganizer && !req.user.isAdmin) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized - tournament organizer privileges required" 
            });
        }

        req.tournament = tournament; // Attach tournament to request for later use
        next();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Authorization check failed" 
        });
    }
}

// Team member authorization
export const teamMemberAuth = async (req, res, next) => {
    try {
        const tournament = await Tournament.findOne({
            _id: req.params.tournamentId,
            "teams.members": req.user._id
        });

        if (!tournament && !req.user.isAdmin) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized - team member privileges required" 
            });
        }

        req.tournament = tournament;
        next();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Authorization check failed" 
        });
    }
}

// Tournament registration status check
export const checkRegistrationOpen = async (req, res, next) => {
    try {
        const tournament = await Tournament.findById(req.params.tournamentId || req.params.id);
        
        if (!tournament) {
            return res.status(404).json({ 
                success: false, 
                message: "Tournament not found" 
            });
        }

        const now = new Date();
        if (now < new Date(tournament.registration.startDate) || 
            now > new Date(tournament.registration.endDate)) {
            return res.status(400).json({ 
                success: false, 
                message: "Tournament registration is currently closed" 
            });
        }

        req.tournament = tournament;
        next();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Registration status check failed" 
        });
    }
}

export default userAuth;