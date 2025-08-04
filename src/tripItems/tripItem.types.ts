import { WeightedMood } from "../trips/trip.model";

export type TripItem = {
  name: string;
  city: string;
  url?: string;
  image?: string;
  duration: number;
  mood: WeightedMood[];
  price: number;
  rating: number;
  reviewCount: number;
  weightedRating: number;
  provider: string;
  category?: string;
  type: "do" | "eat" | "stay";
};
export interface QueryParams {
  query?: string;
  skip?: string;
  take?: string;
  sort?: "asc" | "desc";
  type?: string;
}
