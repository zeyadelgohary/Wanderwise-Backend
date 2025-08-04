import { NextFunction, Request, Response } from "express";
import { AsyncWrapper } from "../utils/AsyncWrapper";
import authService from "./auth.service";
import { UserType } from "../users/user.types";

class AuthController {
  private authService;

  constructor() {
    this.authService = authService;
  }

  signup = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: UserType = req.body;
      const response = await this.authService.signup(user);

      return res.status(200).json({ status: "success", data: response });
    },
  );

  login = AsyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const response = await this.authService.login(email, password);

      return res.status(200).json({ status: "success", data: response });
    },
  );
}

export default new AuthController();
