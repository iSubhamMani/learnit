import { connectDB } from "@/lib/db";
import { DiscussionModel } from "@/models/discussion.model";
import { UserModel } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { discussionSchema, tagSchema } from "@/schemas/DiscussionSchema";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadToCloudinary";

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

export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const session = await getServerSession(authOptions);

    if (!id) {
      return NextResponse.json(new ApiError(400, "Discussion ID is required"), {
        status: 400,
      });
    }

    if (!session?.user) {
      return NextResponse.json(new ApiError(401, "Unauthorized"), {
        status: 401,
      });
    }

    const discussion = await DiscussionModel.findById(id);

    if (!discussion) {
      return NextResponse.json(new ApiError(404, "Discussion not found"), {
        status: 404,
      });
    }

    if (discussion.askedBy.toString() !== session.user._id!.toString()) {
      return NextResponse.json(new ApiError(401, "Unauthorized"), {
        status: 401,
      });
    }

    await DiscussionModel.findByIdAndDelete(id);

    return NextResponse.json(
      new ApiSuccess(200, "Discussion deleted successfully", discussion),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(new ApiError(500, error.message), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const session = await getServerSession(authOptions);

    if (!id) {
      return NextResponse.json(new ApiError(400, "Discussion ID is required"), {
        status: 400,
      });
    }
    if (!session?.user) {
      return NextResponse.json(new ApiError(401, "Unauthorized"), {
        status: 401,
      });
    }

    const discussion = await DiscussionModel.findById(id);

    if (!discussion) {
      return NextResponse.json(new ApiError(404, "Discussion not found"), {
        status: 404,
      });
    }

    if (discussion.askedBy.toString() !== session.user._id!.toString()) {
      return NextResponse.json(new ApiError(401, "Unauthorized"), {
        status: 401,
      });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const tags = JSON.parse(formData.get("tags") as string);
    const attachment = formData.get("attachment") as File | null;

    const { success } = discussionSchema.safeParse({
      title,
      description,
    });

    const { success: tagSuccess } = tagSchema.safeParse(tags);

    if (!success || !tagSuccess) {
      return NextResponse.json(new ApiError(400, "Invalid request body"), {
        status: 400,
      });
    }

    let attachmentUrl = null;

    if (attachment) {
      const fileBuffer = await attachment.arrayBuffer();

      const mimeType = attachment.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");

      // this will be used to upload the file
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

      const res = await uploadToCloudinary(
        fileUri,
        attachment.name,
        "attachments"
      );

      if (!res) {
        return NextResponse.json(
          new ApiError(500, "Failed to upload attachment"),
          {
            status: 500,
          }
        );
      }

      attachmentUrl = res.secure_url;
    }

    const updatedDiscussion = await DiscussionModel.findByIdAndUpdate(id, {
      title,
      description,
      tags,
      attachment: attachmentUrl,
    });

    if (!updatedDiscussion) {
      return NextResponse.json(
        new ApiError(500, "Failed to update discussion"),
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      new ApiSuccess(200, "Discussion updated successfully", updatedDiscussion),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(new ApiError(500, error.message), {
      status: 500,
    });
  }
}
