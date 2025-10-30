import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", searchRoutes);

app.listen(3001, () => console.log("Backend running on port 3001"));
