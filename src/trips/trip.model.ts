import { model, Schema, Types } from "mongoose";

export interface WeightedMood {
  weight: number;
  mood: string;
}

interface ITrip extends Document {
  name: string
  startDate: Date;
  endDate: Date;
  estimatedBudget: number;
  mood: WeightedMood[]; // [{weight, mood}]
  items: Types.ObjectId[]; // all items inside the trip
  solo: boolean;
  type: "Recommended" | "Manual";
}

const TripSchema = new Schema<ITrip>({
  name : { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  estimatedBudget: { type: Number },
  mood: {
    type: [{ weight: Number, mood: Schema.Types.ObjectId }],
    default: [],
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  solo: { type: Boolean, default: true, required: true },
  type: { type: String, enum: ["Recommended", "Manual"], required: true },
});

export const Trip = model<ITrip>("Trip", TripSchema);
