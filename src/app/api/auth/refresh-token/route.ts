import { NextRequest, NextResponse } from "next/server";
import {
  verifyRefreshToken,
  createAccessToken,
  UserTokenPayload,
} from "@/utils/jwt";
import cookie from "cookie";
import { connect } from "@/utils/mongoose";
import { findSessionByToken } from "@/models/sessionModel";

export async function POST(req: NextRequest) {
  await connect();

  const cookies = cookie.parse(req.headers.get("cookie") || "");
  console.log("at refresh-token/route.ts, cookies:", cookies);

  if (!cookies.refreshToken) {
    console.log("No refresh token provided");
    return NextResponse.json(
      { message: "No refresh token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyRefreshToken(
      cookies.refreshToken
    ) as UserTokenPayload;
    console.log("Decoded refresh token:", decoded);
    const session = await findSessionByToken(cookies.refreshToken);

    if (!session) {
      console.log("Invalid session");
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const accessToken = createAccessToken({
      id: decoded.id,
      email: decoded.email,
    });
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.log("Invalid refresh token:", error);
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
