import { AsyncWrapper } from "../utils/AsyncWrapper";
import tripItemService from "./tripItem.service";
import { Request, Response, NextFunction } from "express";

class TripItemController {
  private tripItemService;

  constructor() {
    this.tripItemService = tripItemService;
  }

  getTripItem = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const trip = await this.tripItemService.getTripItem(req.query);
      res.status(200).json({ status: "success", data: trip });
    },
  );
  getTripItemById = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const trip = await this.tripItemService.getTripItemById(id);
      res.status(200).json({ status: "success", data: trip });
    },
  );
}

export default new TripItemController();
