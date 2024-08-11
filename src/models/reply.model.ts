import { Reply } from "@/interfaces/reply.interface";
import mongoose, { Model, Schema } from "mongoose";

const replySchema: Schema<Reply> = new Schema<Reply>(
  {
    discussionId: {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
    },
    repliedBy: {
      type: Schema.Types.String,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: [Schema.Types.String],
      ref: "User",
      default: [],
    },
    dislikes: {
      type: [Schema.Types.String],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

export const ReplyModel =
  (mongoose.models.Reply as Model<Reply>) ||
  mongoose.model<Reply>("Reply", replySchema);
