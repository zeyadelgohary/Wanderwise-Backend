import { Router } from "express";
import leaderboardController from "./leaderboard.controller";

const leaderboardRouter = Router();
leaderboardRouter.post("/", leaderboardController.addPlayer);
leaderboardRouter.get("/", leaderboardController.getPlayers);
export default leaderboardRouter;
