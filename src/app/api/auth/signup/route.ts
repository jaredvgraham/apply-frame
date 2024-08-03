import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import User from "@/models/userModel";
import { connect } from "@/utils/mongoose";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { email, password, name } = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await newUser.save();

    // Log after saving to ensure it was successful
    console.log("User saved successfully:", newUser);

    return NextResponse.json(
      { success: true, message: "User created" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during user creation:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
