import { NextRequest, NextResponse } from "next/server";

import {
  verifyAccessToken,
  UserTokenPayload,
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt";
import {
  findSessionByToken,
  deleteSessionByToken,
  addSession,
} from "@/models/sessionModel";
import { connect } from "@/utils/mongoose";
import cookie from "cookie";

export async function POST(req: NextRequest) {
  await connect();

  const cookies = cookie.parse(req.headers.get("cookie") || "");

  if (!cookies.refreshToken) {
    return NextResponse.json(
      { message: "No refresh token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyRefreshToken(
      cookies.refreshToken
    ) as UserTokenPayload;
    const session = await findSessionByToken(cookies.refreshToken);

    if (!session) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    await deleteSessionByToken(cookies.refreshToken);

    const newRefreshToken = createRefreshToken(decoded);
    await addSession(decoded.id, newRefreshToken);

    const accessToken = createAccessToken(decoded);
    const response = NextResponse.json({ accessToken });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
