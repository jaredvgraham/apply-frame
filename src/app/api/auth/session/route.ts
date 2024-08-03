import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

import { verifyRefreshToken, createAccessToken } from "@/utils/jwt";
import { findSessionByToken } from "@/models/sessionModel";
import User from "@/models/userModel";
import { connect } from "@/utils/mongoose";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided" },
        { status: 401 }
      );
    }

    const decoded = verifyRefreshToken(refreshToken);

    const session = await findSessionByToken(refreshToken);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 401 }
      );
    }

    const user = await User.findById(session.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const userPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    const accessToken = createAccessToken(userPayload);

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
      },
      accessToken,
    });
  } catch (error: any) {
    console.log("Error", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status || 500 }
    );
  }
}
