import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { UserType } from "../users/user.types";
import bcrypt from "bcrypt";
import { User } from "../users/user.model";
import { AppError } from "../utils/AppError";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

class AuthService {
  private accessTokenSecret: Secret;
  private refreshTokenSecret: Secret;

  constructor() {
    this.accessTokenSecret = process.env.JWT_SECRET || "access_secret";
    this.refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
  }

  authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, this.accessTokenSecret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: "Invalid token." });
    }
  }

  generateAccessToken(payload: object) {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "90d" });
  }

  async signup(user: UserType) {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await User.create({ ...user, password: hashedPassword });
    const newUser = await createdUser.populate({
      path: "tripsHistory",
      populate: { path: "items" }, 
    });

    return {
      user: newUser,
      token: this.generateAccessToken({ id: newUser._id }),
    };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).populate({
      path: "tripsHistory",
      populate: { path: "items" }, 
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }

    return {
      user: user.toJSON(),
      token: this.generateAccessToken({ id: user._id }),
    };
  }

  //generateRefreshToken(payload: object) {
  //  return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '7d' });
  //}

  //verifyRefreshToken(token: string) {
  //  try {
  //		const decoded = jwt.verify(token, this.refreshTokenSecret);

  //		const newAccessToken = this.generateAccessToken({ id: (decoded as any).id, role: (decoded as any).role });
  //		return newAccessToken;
  //  } catch (err) {
  //    throw new Error('Invalid refresh token');
  //  }
  //}
}

export default new AuthService();
