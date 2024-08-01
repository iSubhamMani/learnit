import { Schema } from "mongoose";

export interface User {
  _id: string;
  displayName: string;
  email: string;
  photoURL: string;
  answeredQuestions: Schema.Types.ObjectId[];
  askedQuestions: Schema.Types.ObjectId[];
  reputation: number;
}
