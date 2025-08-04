import { Router } from "express";
import ratingController from "./rating.controller";

const ratingRouter = Router();
ratingRouter.post("/", ratingController.Rate);
ratingRouter.get("/", ratingController.getRate);
export default ratingRouter;
