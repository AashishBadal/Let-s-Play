import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import tournamentRouter from "./routes/tournamentRoutes.js";
import organizerRouter from "./routes/organizerRoutes.js"; // New organizer routes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const allowedOrigins = [
  "http://localhost:5173"
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ 
  credentials: true, 
  origin: allowedOrigins 
}));

// Routes
app.get("/", (req, res) => {
  res.send("Tournament API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/tournaments", tournamentRouter);
app.use("/api/organizers", organizerRouter); // New organizer routes


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});