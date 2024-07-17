import { NextRequest, NextResponse } from "next/server";
import {
  createAccessToken,
  createRefreshToken,
  UserTokenPayload,
} from "@/utils/jwt";

import bcrypt from "bcrypt";
import cookie from "cookie";
import User, { findUserByEmail, addUser } from "@/models/userModel";
import { connect } from "@/utils/mongoose";

export async function POST(req: NextRequest) {
  await connect();
  const { email, password } = await req.json();

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    id: Math.floor(Math.random() * 1000000),
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  await addUser(newUser);

  const userTokenPayload: UserTokenPayload = {
    id: newUser.id,
    email: newUser.email,
  };

  const accessToken = createAccessToken(userTokenPayload);
  const refreshToken = createRefreshToken(userTokenPayload);

  const response = NextResponse.json({ accessToken });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "strict",
    path: "/",
  });
  return response;
}
