import express from "express";
import path from "path";
import dotenv from "dotenv";
import uiRoutes from "./routes/uiRoutes.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// 🔥 FIXED __dirname correctly for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------------------------------
// EJS VIEW ENGINE SETTINGS
// -------------------------------------------------
app.set("view engine", "ejs");

// 🔥 FIXED — ensure it points to /frontend/views
app.set("views", path.join(__dirname, "views"));

// -------------------------------------------------
// BODY PARSER
// -------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------------------------------
// STATIC FILES (CSS/JS/IMAGES)
// -------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

// -------------------------------------------------
// ROUTES
// -------------------------------------------------
app.use("/", uiRoutes);

// -------------------------------------------------
// HEALTH CHECK (FOR AUTOGRADER)
// -------------------------------------------------
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// -------------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Frontend running on http://localhost:${PORT}`));
