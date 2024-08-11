import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./utils/ApiError";
import secretKey from "./utils/encodeJWT";

export async function middleware(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1] || "";

    if (!token) {
      return NextResponse.json(new ApiError(401, "No token provided"), {
        status: 401,
      });
    }

    const verifiedToken = jwtVerify(token, secretKey);

    if (!verifiedToken) {
      return NextResponse.json(new ApiError(401, "Unauthorized"), {
        status: 401,
      });
    }

    const { _id } = (await verifiedToken).payload;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("user-id", _id as string);

    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error: any) {
    return Response.json(new ApiError(500, error.message), { status: 500 });
  }
}

export const config = {
  matcher: ["/api/discussion/:path*", "/api/reply/:path*"],
};
