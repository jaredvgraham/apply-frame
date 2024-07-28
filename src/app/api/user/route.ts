//return user resume if it exists

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/mongoose";
import User from "@/models/userModel";
import authMiddleware from "@/middleware/auth";

const handlerGet = async (req: NextRequest, res: NextResponse) => {
  try {
    await connect();

    const user = (req as any).user;

    const userRecord = await User.findOne({ email: user.email });

    if (!userRecord) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!userRecord.resume || userRecord.resume === "") {
      return NextResponse.json(
        { success: false, message: "User has no resume" },
        { status: 400 }
      );
    }

    return NextResponse.json(userRecord.resume);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching jobs" },
      { status: 500 }
    );
  }
};

export const GET = authMiddleware(handlerGet);
