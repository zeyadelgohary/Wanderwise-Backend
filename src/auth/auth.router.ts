import { Router } from "express";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

export default authRouter;
