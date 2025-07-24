import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import tournamentRouter from "./routes/tournamentRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const allowedOrigins = [
  "http://localhost:5173"
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowedOrigins }));

app.get("/", (req, res) => {
  res.send("API WORKING");
});

//api endpoints
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/tournaments", tournamentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
