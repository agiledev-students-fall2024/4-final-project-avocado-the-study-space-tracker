import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import filtersRoutes from "./routes/filtersRoutes.js";
import storesRoutes from "./routes/storesRoutes.js";
import savedRoutes from "./routes/savedRoutes.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../.env");
console.log("Loading .env from:", envPath);
dotenv.config({ path: envPath });

console.log("Environment variables loaded:", process.env);

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/filters", filtersRoutes);
app.use("/stores", storesRoutes);
app.use("/routes", savedRoutes);

export default app;