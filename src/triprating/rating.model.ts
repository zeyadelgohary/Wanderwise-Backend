import mongoose, { Schema, Document } from "mongoose";

interface ITripRating extends Document {
  tripName: string;

  ratings: Map<string, number>;
}

const TripRatingSchema: Schema = new Schema<ITripRating>({
  tripName: { type: String, required: true },
  ratings: { type: Map, of: Number },
});

const TripRatingModel = mongoose.model<ITripRating>(
  "TripRating",
  TripRatingSchema,
);

export default TripRatingModel;
