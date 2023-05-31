import { Model, Schema, model } from "mongoose";
import { IPost } from "../interfaces";

const PostSchema = new Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    body: { type: String },
    likes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  },
  {
    timestamps: true,
  }
);

export const Post: Model<IPost> = model<IPost>("Post", PostSchema);
