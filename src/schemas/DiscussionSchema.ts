import { z } from "zod";

export const discussionSchema = z.object({
  title: z
    .string()
    .max(150, { message: "Title should be less than 150 characters" })
    .min(10, { message: "Title should be at least 10 characters" }),
  description: z
    .string()
    .min(10, { message: "Description should be at least 10 characters" }),
});

export const tagSchema = z
  .array(z.string())
  .max(3, { message: "You can only add up to 3 tags" })
  .min(1, { message: "You need to add at least 1 tag" });
