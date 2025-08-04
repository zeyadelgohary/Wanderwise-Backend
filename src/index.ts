import mongoose from "mongoose";
import "dotenv/config";
import express from "express";
import { globalErrorHandler } from "./utils/GlobalErrorHandler";
import appRouter from "./appRouter";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(appRouter);
app.use(globalErrorHandler);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    data: {
      message: "Endpoint Not found",
    },
  });
});

mongoose.connect(process.env.DB_URL || "").then(() => {
  console.log("Connected to database");
});

app.listen(10000, () => {
  console.log("Listening on port 10000");
});
