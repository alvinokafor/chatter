import { Model, Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true, lowercase: true, trim: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: { type: String },
  bio: { type: String },
  followersIds: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
});

export const User: Model<IUser> = model<IUser>("User", UserSchema);
