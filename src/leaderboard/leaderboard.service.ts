import { LeaderBoard } from "./leaderboard.type";
import LeaderBoardModel from "./leaderboard.model";

class LeaderBoardService {
  async addPlayer(player: LeaderBoard) {
    try {
      if (!player.name) {
        throw new Error("Player name is required");
      }

      const existingPlayer = await LeaderBoardModel.findOne({
        name: player.name,
      });

      if (existingPlayer) {
        existingPlayer.count += player.count || 1;
        await existingPlayer.save();
      } else {
        const newPlayer = new LeaderBoardModel({
          name: player.name,
          count: player.count || 1,
        });

        await newPlayer.save();
      }
    } catch (error) {
      console.error("Error adding player:", error);
    }
  }

  async getLeaderBoard() {
    try {
      const players = await LeaderBoardModel.find().sort({ count: -1 });

      if (players.length === 0) {
        return [];
      }

      return players;
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw new Error("Failed to fetch leaderboard");
    }
  }
}
export default new LeaderBoardService();
