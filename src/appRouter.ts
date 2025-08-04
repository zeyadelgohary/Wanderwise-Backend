import { Router } from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./users/user.router";
import ratingRouter from "./triprating/rating.router";
import leaderboardRouter from "./leaderboard/leaderboard.router";
import tripItemRouter from "./tripItems/tripItem.router";
import submissionsRouter from "./submissions/submissions.router";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/users", userRouter);
appRouter.use("/tripRatings", ratingRouter);
appRouter.use("/leaderboard", leaderboardRouter);
appRouter.use("/tripItems", tripItemRouter);
appRouter.use("/submissions", submissionsRouter);

export default appRouter;
