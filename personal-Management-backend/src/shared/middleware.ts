import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { jwtAuth } from "../utils/jwt-auth";

const app = express();

///middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(jwtAuth);
app.use(express.urlencoded({ extended: false }));

export default app;
