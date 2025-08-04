import mongoose, { Schema, Document } from "mongoose";

interface ILeaderBoard extends Document {
  name: string;

  count: number;
}

const LeaderBoardSchema: Schema = new Schema({
  name: { type: String, required: true },
  count: { type: Number },
});

const LeaderBoardModel = mongoose.model<ILeaderBoard>(
  "LeaderBoard",
  LeaderBoardSchema,
);

export default LeaderBoardModel;
