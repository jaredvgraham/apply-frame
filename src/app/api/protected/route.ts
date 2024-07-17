// src/app/api/protected/route.ts
import { NextRequest, NextResponse } from "next/server";
import authMiddleware from "@/middleware/auth";

const handler = async (req: NextRequest, res: NextResponse) => {
  console.log("Protected route handler executed");
  return NextResponse.json({
    message: "This is a protected route",
    user: (req as any).user,
  });
};

export const GET = authMiddleware(handler);
