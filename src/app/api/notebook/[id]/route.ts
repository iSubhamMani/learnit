import { connectDB } from "@/lib/db";
import { NoteBookModel } from "@/models/notebook.model";
import { ApiError } from "@/utils/ApiError";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const userId = req.headers.get("user-id");
    const url = new URL(req.url);
    const notebookId = url.pathname.split("/")[3];

    if (!userId) {
      return NextResponse.json(new ApiError(400, "Unauthorized"), {
        status: 400,
      });
    }

    const notebook = await NoteBookModel.findOne({
      _id: notebookId,
      createdBy: userId,
    });

    if (!notebook) {
      return NextResponse.redirect(new URL("/u/notebooks", req.url));
    }

    return NextResponse.json(new ApiSuccess(200, "Notebook found", notebook), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(new ApiError(500, error.message), { status: 500 });
  }
}
