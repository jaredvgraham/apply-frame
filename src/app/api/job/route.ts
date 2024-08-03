import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/utils/mongoose";
import Job from "@/models/jobModel";
import authMiddleware from "@/middleware/auth";
import User from "@/models/userModel";

const handlerGet = async (req: NextRequest, res: NextResponse) => {
  await connect();

  const user = (req as any).user;
  console.log("user", user);

  const userRecord = await User.findOne({ email: user.email });

  if (!userRecord) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const jobs = await Job.find({ userId: userRecord._id });

  return NextResponse.json(jobs);
};

const handlerPost = async (req: NextRequest, res: NextResponse) => {
  await connect();
  console.log("handlerPost hit");

  const user = (req as any).user;
  console.log("user", user);

  const userRecord = await User.findOne({ email: user.email });

  if (!userRecord) {
    console.log("User not found");

    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const { companyName, jobTitle, dateApplied, interest, jobDescription } =
    await req.json();

  const newJob = new Job({
    userId: userRecord._id,
    companyName,
    jobTitle,
    dateApplied,
    interest,
    jobDescription,
    createdAt: new Date(),
  });

  await newJob.save();

  return NextResponse.json({ job: newJob });
};

export const GET = authMiddleware(handlerGet);

export const POST = authMiddleware(handlerPost);
