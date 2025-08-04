import { Router } from "express";
import tripItemController from "./tripItem.controller";

const tripItemRouter = Router();
tripItemRouter.get("/", tripItemController.getTripItem);
tripItemRouter.get("/:id", tripItemController.getTripItemById);

export default tripItemRouter;
