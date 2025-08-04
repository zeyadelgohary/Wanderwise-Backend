import { AsyncWrapper } from "../utils/AsyncWrapper";
import TripRatingModel from "./rating.model";
import ratingService from "./rating.service";
import { TripRating } from "./rating.type";
import { Request, Response, NextFunction } from "express";

class RatingController {
  private ratingService;

  constructor() {
    this.ratingService = ratingService;
  }

  Rate = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const rating: TripRating = req.body as TripRating;
      const newRating = await this.ratingService.addRating(rating);
      return res.status(200).json({ status: "success", data: newRating });
    },
  );

  getRate = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const Ratings = await TripRatingModel.find();
      return res.status(200).json({ status: "success", data: Ratings });
    },
  );
}

export default new RatingController();
