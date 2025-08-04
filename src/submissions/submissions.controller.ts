import { AsyncWrapper } from "../utils/AsyncWrapper";
import { Request, Response, NextFunction } from "express";
import { Submission } from "./submissions.model";

class SubmissionController {
  createSubmission = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = req.body.submissions;
      console.log(data);
      const output = await Submission.insertMany(data);
      console.log(output);
      return res.json({ status: "success", data: output });
    }
  );
  getSubmissions = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const trip = await Submission.find();
      res.status(200).json({ status: "success", data: trip });
    }
  );
}

export default new SubmissionController();
