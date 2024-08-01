import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { newUser } from "@/types/UserRequestBody";
import { ApiError } from "@/utils/ApiError";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import secretKey from "@/utils/encodeJWT";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { _id, displayName, email, photoURL } = (await req.json()) as newUser;

    if (!_id || !displayName || !email || !photoURL) {
      return NextResponse.json(new ApiError(400, "Missing required fields"), {
        status: 400,
      });
    }

    const existingUser = await UserModel.findOne({ _id });

    if (existingUser) {
      const token = await new SignJWT({ _id: existingUser._id })
        .setProtectedHeader({ alg: "HS256" })
        .sign(secretKey);

      return NextResponse.json(
        new ApiSuccess(200, "User already exists", {
          user: existingUser,
          token,
        }),
        {
          status: 200,
        }
      );
    }

    // Save the user to the database
    const createdUser = await UserModel.create({
      _id,
      displayName,
      email,
      photoURL,
    });

    if (!createdUser) {
      return NextResponse.json(new ApiError(500, "Failed to create user"), {
        status: 500,
      });
    }

    const token = await new SignJWT({ _id: createdUser._id })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secretKey);

    return NextResponse.json(
      new ApiSuccess(201, "User created successfully", {
        user: createdUser,
        token,
      }),
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(new ApiError(500, "Internal Server Error"), {
      status: 500,
    });
  }
}
