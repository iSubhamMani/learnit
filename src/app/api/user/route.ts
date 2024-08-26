import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { newUser } from "@/types/UserRequestBody";
import { ApiError } from "@/utils/ApiError";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadToCloudinary";
import { signupSchema } from "@/schemas/signup.schema";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();

    const displayName = formData.get("displayName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const photo = formData.get("photo") as File | null;

    const { success } = signupSchema.safeParse({
      displayName,
      email,
      password,
      photo,
    });

    if (!success) {
      return NextResponse.json(new ApiError(400, "Invalid request body"), {
        status: 400,
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        new ApiSuccess(400, "User already exists", null),
        {
          status: 400,
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let photoURL = "";

    if (photo) {
      const fileBuffer = await photo.arrayBuffer();

      const mimeType = photo.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");

      // this will be used to upload the file
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

      const res = await uploadToCloudinary(
        fileUri,
        photo.name,
        "profile-photos"
      );

      if (!res) {
        return NextResponse.json(
          new ApiError(500, "Failed to upload attachment"),
          {
            status: 500,
          }
        );
      }

      photoURL = res.secure_url;
    }

    // Save the user to the database
    const createdUser = await UserModel.create({
      displayName,
      email,
      photoURL,
      password: hashedPassword,
    });

    if (!createdUser) {
      return NextResponse.json(new ApiError(500, "Failed to create user"), {
        status: 500,
      });
    }

    return NextResponse.json(
      new ApiSuccess(201, "User created successfully", createdUser),
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(new ApiError(500, error.message), {
      status: 500,
    });
  }
}
