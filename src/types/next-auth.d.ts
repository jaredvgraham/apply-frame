// types/next-auth.d.ts
import { NextRequest } from "next/server";
import { UserPayload } from "@/utils/jwt";

declare module "next/server" {
  interface NextRequest {
    user?: UserPayload;
  }
}
