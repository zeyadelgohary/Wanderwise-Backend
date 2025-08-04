import { Router } from "express";
import submissionsController from "./submissions.controller";

const submissionsRouter = Router();
submissionsRouter.post("/", submissionsController.createSubmission);
submissionsRouter.get("/", submissionsController.getSubmissions);

export default submissionsRouter;
