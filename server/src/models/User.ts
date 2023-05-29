import { Model, Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      default: "",
    },
    password: { type: String },
    bio: { type: String, default: "" },
    followersIds: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = model<IUser>("User", UserSchema);
