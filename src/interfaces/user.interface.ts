import { Schema } from "mongoose";

export interface User {
  displayName: string;
  email: string;
  password: string;
  photoURL: string;
  answeredQuestions: Schema.Types.ObjectId[];
  askedQuestions: Schema.Types.ObjectId[];
  reputation: number;
}
