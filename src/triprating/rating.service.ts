import { AppError } from "../utils/AppError";
import TripRatingModel from "./rating.model";
import { TripRating } from "./rating.type";

class RatingService {
  async addRating(rating: TripRating) {
    try {
      const tripData: TripRating = rating;

      const newTrip = new TripRatingModel(tripData);
      await newTrip.save();
      if (!newTrip) {
        throw new AppError("Error in adding rating", 400);
      }

      return newTrip;
    } catch (error) {
      console.log(error);
      throw new AppError("Error adding Rating", 400);
    }
  }
}
export default new RatingService();
