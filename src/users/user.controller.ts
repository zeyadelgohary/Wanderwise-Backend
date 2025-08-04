import userService from "./user.service";
import { AsyncWrapper } from "../utils/AsyncWrapper";
import { UpdateUserType } from "./user.types";
import { Trip } from "../trips/trip.model";

class UserController {
  private userService;

  constructor() {
    this.userService = userService;
  }

  getProfile = AsyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    
    const user = await this.userService.getProfile(id);
   

    return res.status(200).json({ status: "success", data: user });
  });

  updateProfile = AsyncWrapper(async (req, res, next) => {
    const user: UpdateUserType = req.body;
    const id = req.params.id;

    const updatedUser = await this.userService.updateProfile(user, id);
    return res.status(200).json({ status: "success", data: updatedUser });
  });

  likeItem = AsyncWrapper(async (req, res, next) => {
    const userId = req.params.id;
    const itemId = req.body.id;
    const type = req.body.type;

    const data = await this.userService.likeItem(userId, itemId, type);
    return res.status(200).json({ status: "success", data: data });
  });
  preferences = AsyncWrapper(async (req, res, next) => {
    const userId = req.params.id;
    const { interactionType, preferences } = req.body;
    const rating = req.body.rating;

    const user = await this.userService.preferences(
      userId,
      interactionType,
      preferences,
      rating,
    );

    return res.status(200).json({ status: "success", data: user });
  });

  createTrip = AsyncWrapper(async (req, res, next) => {

   const {userId,name,trips,startDate,endDate,estimatedBudget=0,mood,solo,type} = req.body;
   const trip = await this.userService.createTrip(name ,trips,startDate,endDate,estimatedBudget,mood,solo,type);
   const user = await this.userService.getProfile(userId);
   user.tripsHistory.push(trip._id);
  await user.save();
  return res.status(200).json({ status: "success", data: trip });
  });

  updateTrip = AsyncWrapper(async (req, res, next) => {
    const {items} = req.body;
    const tripId = req.params.tripId;
    const trip = await this.userService.updateTrip(tripId,items);
    return res.status(200).json({ status: "success", data: trip });
  });
  addItemsToTrip = AsyncWrapper(async (req, res, next) => {
    const {items} = req.body;
    const tripId = req.params.tripId;
    const trip = await this.userService.addItemsToTrip(tripId,items);
    return res.status(200).json({ status: "success", data: trip });
  });

}

export default new UserController();
