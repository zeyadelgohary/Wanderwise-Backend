import { AsyncWrapper } from "../utils/AsyncWrapper";

import { Request, Response, NextFunction } from "express";
import leaderboardService from "./leaderboard.service";
import { LeaderBoard } from "./leaderboard.type";

class LeaderBoardController {
  private leaderBoardService;

  constructor() {
    this.leaderBoardService = leaderboardService;
  }

  addPlayer = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const p: LeaderBoard = req.body;
      const player = await this.leaderBoardService.addPlayer(p);
      return res.status(200).json({ status: "success", data: player });
    },
  );
  getPlayers = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const players = await this.leaderBoardService.getLeaderBoard();
      return res.status(200).json({ status: "success", data: players });
    },
  );
}

export default new LeaderBoardController();
