import { Document, Types } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  //   avatar: string;
  bio: string;
  followersIds: Types.ObjectId[];
  refreshToken: string;
}
