import { Schema } from "mongoose";

export interface Reply {
  discussionId?: Schema.Types.ObjectId;
  replyId?: Schema.Types.ObjectId;
  repliedBy: Schema.Types.String;
  content: string;
  likes: string[];
  dislikes: string[];
}

export type ReplyData = Pick<Reply, "content" | "likes" | "dislikes"> & {
  _id: string;
  repliedBy: {
    displayName: string;
    photoURL: string;
    reputation: number;
  };
  replyCount: number;
  createdAt: Date;
  updatedAt: Date;
};
