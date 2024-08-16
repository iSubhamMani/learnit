import { User } from "./user.interface";

export interface Discussion {
  title: string;
  description: string;
  tags: string[];
  askedBy: string;
  likes: string[];
  dislikes: string[];
}

export type DiscussionData = Pick<
  Discussion,
  "title" | "description" | "tags"
> & {
  askedBy: User;
  createdAt: Date;
  updatedAt: Date;
};

export type DiscussionCardData = Pick<
  Discussion,
  "title" | "description" | "tags"
> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  askedBy: {
    _id: string;
    displayName: string;
    photoURL: string;
  };
};
