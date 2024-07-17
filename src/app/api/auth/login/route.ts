import { NextRequest, NextResponse } from "next/server";
import {
  createAccessToken,
  createRefreshToken,
  UserTokenPayload,
} from "@/utils/jwt";
import bcrypt from "bcrypt";
import { connect } from "@/utils/mongoose";
import User from "@/models/userModel";
import { addSession } from "@/models/sessionModel";

export async function POST(req: NextRequest) {
  await connect();

  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const userTokenPayload: UserTokenPayload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = createAccessToken(userTokenPayload);
    const refreshToken = createRefreshToken(userTokenPayload);

    // Store the session in the database
    await addSession(user.id, refreshToken);

    const response = NextResponse.json({ accessToken });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
