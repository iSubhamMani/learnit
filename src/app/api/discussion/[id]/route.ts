import { connectDB } from "@/lib/db";
import { DiscussionModel } from "@/models/discussion.model";
import { UserModel } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiSuccess } from "@/utils/ApiSuccess";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/")[3];
    const userId = req.headers.get("user-id");

    if (!userId) {
      return NextResponse.json(new ApiError(401, "Unauthorized"), {
        status: 401,
      });
    }

    const discussion = await DiscussionModel.findById(id).populate({
      path: "askedBy",
      model: UserModel,
      select: "displayName profilePhoto _id reputation email",
    });

    if (!discussion) {
      return NextResponse.json(new ApiError(404, "Discussion not found"), {
        status: 404,
      });
    }

    let userReaction = null;

    if (discussion) {
      if (discussion.likes.some((id) => id.toString() === userId)) {
        userReaction = "like";
      } else if (discussion.dislikes.some((id) => id.toString() === userId)) {
        userReaction = "dislike";
      }
    }

    return NextResponse.json(
      new ApiSuccess(200, "Discussion fetched successfully", {
        discussion,
        userReaction,
        reactionCount: discussion.likes.length - discussion.dislikes.length,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(new ApiError(500, error.message), {
      status: 500,
    });
  }
}
