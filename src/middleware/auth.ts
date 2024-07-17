// src/middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, UserTokenPayload } from "@/utils/jwt";

const authMiddleware = (handler: Function) => {
  console.log("Initializing authMiddleware");

  return async (req: NextRequest, res: NextResponse) => {
    console.log("Executing authMiddleware");
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      console.log("No token provided");
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const user = verifyAccessToken(token) as UserTokenPayload;
      (req as any).user = user; // Extend the request with the user object
      return handler(req, res);
    } catch (error) {
      console.log("Invalid token");
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  };
};

export default authMiddleware;
