import { connectDB } from "@/lib/db";
import { DiscussionModel } from "@/models/discussion.model";
import { UserModel } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/")[3];

    const discussion = await DiscussionModel.findById(id).populate({
      path: "askedBy",
      model: UserModel,
      select: "displayName photoURL _id reputation",
    });

    return NextResponse.json(
      new ApiSuccess(200, "Discussion fetched successfully", discussion),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(new ApiError(500, "Internal Server Error"), {
      status: 500,
    });
  }
}
