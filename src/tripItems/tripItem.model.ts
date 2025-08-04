import { model, Schema } from "mongoose";
import { WeightedMood } from "../trips/trip.model";

interface IItem extends Document {
  name: string;
  city: string;
  url?: string;
  image?: string;
  duration: number;
  mood: WeightedMood[]; // [{weight, mood}]
  price: number;
  rating: number;
  reviewCount: number;
  weightedRating: number;
  provider: string;
  category?: string;
  type: "do" | "eat" | "stay";
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  city: { type: String },
  url: { type: String },
  image: { type: String },
  duration: { type: Number },
  mood: {
    type: [{ weight: Number, mood: String }],
    default: [],
    required: true,
  },
  price: { type: Number },
  rating: { type: Number },
  reviewCount: { type: Number },
  weightedRating: { type: Number },
  provider: { type: String },
  category: { type: String },
  type: { type: String, enum: ["do", "eat", "stay"] },
});

export const Item = model<IItem>("Item", ItemSchema);
