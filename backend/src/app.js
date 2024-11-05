import express from "express";
import authRoutes from "./routes/authRoutes.js";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);

export default app;