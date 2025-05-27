import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ALLOWED_ORIGINS }));
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(route);

app.listen(5000, () => console.log("Connected to server"));
