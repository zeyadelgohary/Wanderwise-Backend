import { Schema, model, Document, Types } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  friends: Types.ObjectId[]; // User IDs
  tripsHistory: Types.ObjectId[]; // Trip IDs
  likes: Types.ObjectId[]; // Trip or Item IDs
  preferences: Preference;
  tripsRated: TripRating[];
}

interface Preference {
  family: number;
  sports: number;
  art: number;
  entertainment: number;
  history: number;
  adventure: number;
  count: number;
}

interface TripRating {
  tripId: Types.ObjectId;
  rating: number;
  tripName: string;
}

const preferenceSchema = new Schema<Preference>({
  family: { type: Number },
  sports: { type: Number },
  art: { type: Number },
  entertainment: { type: Number },
  history: { type: Number },
  adventure: { type: Number },
  count: { type: Number },
});

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // email regex
        "Please enter a valid email address",
      ],
    },
    preferences: {
      type: preferenceSchema,
      required: true,
    },
    tripsRated: [
      {
        tripId: { type: Schema.Types.ObjectId },
        rating: { type: Number },
        tripName: { type: String },
      },
    ],
    password: { type: String, required: true },
    birthDate: { type: Date },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tripsHistory: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    likes: [
      {
        item: { type: Schema.Types.ObjectId },
        type: { type: String, enum: ["Trip", "Item"] },
      },
    ],
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

export const User = model<IUser>("User", UserSchema);
export default Preference;
