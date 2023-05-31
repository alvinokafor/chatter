import { Document, Types } from "mongoose";

export interface IPost extends Document {
  userId: Types.ObjectId;
  title: string;
  body: string;
  likes: Types.ObjectId[];
}
