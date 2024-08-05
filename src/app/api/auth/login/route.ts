import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import User from "@/models/userModel";
import Session, { addSession } from "@/models/sessionModel";
import {
  createAccessToken,
  createRefreshToken,
  UserTokenPayload,
} from "@/utils/jwt";
import { connect } from "@/utils/mongoose";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const userPayload: UserTokenPayload = {
      id: user._id.toString(),
      email: user.email,
    };
    const accessToken = createAccessToken(userPayload);
    const refreshToken = createRefreshToken(userPayload);

    const session = new Session({
      userId: user._id.toString(),
      refreshToken,
      createdAt: new Date(),
    });
    await addSession(session);

    const response = NextResponse.json({
      success: true,
      accessToken,
      userPayload,
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
      domain:
        process.env.NODE_ENV === "production"
          ? "apply-frame.vercel.app"
          : undefined,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.status || 500 }
    );
  }
}
