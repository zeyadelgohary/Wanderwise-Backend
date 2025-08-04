import { Item } from "../tripItems/tripItem.model";
import { Trip } from "../trips/trip.model";
import { AppError } from "../utils/AppError";
import Preference, { User } from "./user.model";
import InteractionType, { UpdateUserType } from "./user.types";
import { number, z } from "zod";
import { WeightedMood } from "../trips/trip.model";
import { Types } from "mongoose";

class UserService {
  async getProfile(id: string) {
    try {
      const user = await User.findById(id).populate({
        path: "tripsHistory",
        populate: { path: "items" }, 
      });
      if (!user) throw new AppError("User not found", 404);
    
      return user;
    } catch (e: any) {
      throw new AppError(e.message, 400);
    }
  }

  async updateProfile(user: UpdateUserType, id: string) {
    try {
      const updateUserSchema = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        birthDate: z.date().optional(),
      });

      const validatedData = updateUserSchema.parse(user);

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        validatedData,
        { new: true },
      );
      return updatedUser;
    } catch (e: any) {
      throw new AppError(e.message, 400);
    }
  }

  // TODO: Test with real data
  async likeItem(userId: string, itemId: string, type: string) {
    try {
      if (!itemId) throw new AppError("Item id is required", 400);
      if (!type || (type !== "Trip" && type !== "Item"))
        throw new AppError("Type should be one of 'Trip' or 'Item'", 400);

  
      const user = await User.findById(userId);
      if (!user) throw new AppError("User not found", 404);

      const existingLikeIndex = user.likes.findIndex(
        (like: any) => like.item.toString() === itemId && like.type === type
      );

      let updatedUser;
      if (existingLikeIndex === -1) {
      
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { likes: { item: itemId, type } } },
          { new: true }
        );
      } else {
        
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $pull: { likes: { item: itemId, type } } },
          { new: true }
        );
      }

      return updatedUser;
    } catch (e: any) {
      throw new AppError(e.message, 400);
    }
}

  async preferences(
    userId: string,
    interactionType: InteractionType,
    preferences: Array<Preference>,
    rating?: number,
  ) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError("User not found", 404);
      }
      let weight = 1;
      if (interactionType === InteractionType.SEARCH) {
        weight = 0.1;
      } else if (interactionType === InteractionType.LIKE) {
        weight = 0.2;
      } else if (interactionType === InteractionType.RATE) {
        if (rating !== undefined) {
          const ratingWeights = [0.05, 0.1, 0.3, 0.5, 0.7];
          weight = ratingWeights[rating - 1] || 0;
        }
      }
      if (!user.preferences) {
        user.preferences = {
          family: 0,
          sports: 0,
          art: 0,
          entertainment: 0,
          history: 0,
          adventure: 0,
          count: 0,
        };
      }
      for (const pref of preferences) {
        user.preferences.family += pref.family * weight;
        user.preferences.sports += pref.sports * weight;
        user.preferences.art += pref.art * weight;
        user.preferences.entertainment += pref.entertainment * weight;
        user.preferences.history += pref.history * weight;
        user.preferences.adventure += pref.adventure * weight;
      }
      user.preferences.count += preferences.length;

      const total =
        user.preferences.family +
        user.preferences.sports +
        user.preferences.art +
        user.preferences.entertainment +
        user.preferences.history +
        user.preferences.adventure;

      if (total > 0) {
        user.preferences.family /= total;
        user.preferences.sports /= total;
        user.preferences.art /= total;
        user.preferences.entertainment /= total;
        user.preferences.history /= total;
        user.preferences.adventure /= total;
      }

      const u = await user.save();
      return u;
    } catch (e: any) {
      throw new AppError(e.message, 400);
    }
  }

  async createTrip(name : string ,items:Types.ObjectId[],startDate:Date ,endDate: Date,estimatedBudget:number,mood:WeightedMood[],solo:boolean,type:"Recommended" | "Manual"){
   
    const trip = new Trip({
      name,
      startDate,
      endDate,
      estimatedBudget,
      mood,
      items,
      solo,
      type,
      
    });
    if (!trip){
      throw new AppError("Trip not created",400);
    }
    await trip.save();
    return trip;
  }

  async updateTrip(tripId: string, items: Types.ObjectId[]) {
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { items },
      { new: true, runValidators: true }
    ).populate("items");
    if (!trip) {
      throw new AppError("Trip not found", 404);
    }
    return trip;
  }
  

  async addItemsToTrip(tripId: string, items: Types.ObjectId[]) {
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { $addToSet: { items: { $each: items } } }, // Ensures no duplicate items
      { new: true }
    ).populate("items");
    console.log(trip)
    if (!trip) {
      throw new AppError("Trip not found", 404);
    }
    return trip;
  }
  
}

export default new UserService();
