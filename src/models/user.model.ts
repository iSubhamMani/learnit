import { User } from "@/interfaces/user.interface";
import mongoose, { Model, Schema } from "mongoose";

const userSchema = new Schema<User>(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photoURL: {
      type: String,
      required: true,
    },
    answeredQuestions: {
      type: [Schema.Types.ObjectId],
      ref: "Discussion",
      default: [],
    },
    askedQuestions: {
      type: [Schema.Types.ObjectId],
      ref: "Discussion",
      default: [],
    },
    reputation: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const UserModel =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);
