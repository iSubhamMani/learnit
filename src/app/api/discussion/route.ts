import { connectDB } from "@/lib/db";
import { DiscussionModel } from "@/models/discussion.model";
import { discussionSchema } from "@/schemas/DiscussionSchema";
import { newDiscussion } from "@/types/DiscussionRequestBody";
import { ApiError } from "@/utils/ApiError";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { title, description, tags } = (await req.json()) as newDiscussion;
    const userId = req.headers.get("user-id");

    const { success } = discussionSchema.safeParse({
      title,
      description,
      tags,
    });

    if (!success) {
      return NextResponse.json(new ApiError(400, "Invalid request body"), {
        status: 400,
      });
    }

    const newDiscussion = await DiscussionModel.create({
      title,
      description,
      tags,
      askedBy: userId,
    });

    if (!newDiscussion) {
      return NextResponse.json(
        new ApiError(500, "Failed to create discussion"),
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      new ApiSuccess(201, "Discussion created successfully", newDiscussion),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(new ApiError(500, "Internal Server Error"), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const discussions = await DiscussionModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "askedBy",
          foreignField: "_id",
          as: "askedBy",
        },
      },
      {
        $unwind: "$askedBy",
      },
      {
        $project: {
          title: 1,
          description: 1,
          tags: 1,
          askedBy: {
            _id: 1,
            displayName: 1,
            photoURL: 1,
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return NextResponse.json(
      new ApiSuccess(200, "Discussions fetched successfully", discussions),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(new ApiError(500, "Internal Server Error"), {
      status: 500,
    });
  }
}
