import { Router } from "express";
import userController from "./user.controller";

const userRouter = Router();

userRouter.patch("/:id", userController.updateProfile);
userRouter.post("/likes/:id", userController.likeItem);
userRouter.get("/:id", userController.getProfile);
userRouter.post("/preferences/:id", userController.preferences);
userRouter.post("/trips",userController.createTrip);
userRouter.put("/trips/:tripId",userController.updateTrip);
userRouter.patch("/trips/:tripId",userController.addItemsToTrip);

export default userRouter;
