//fetch job by id
import { Job } from "@/types";
import { connect } from "@/utils/mongoose";
import { NextRequest, NextResponse } from "next/server";
import JobModel from "@/models/jobModel";
import authMiddleware from "@/middleware/auth";
import User from "@/models/userModel";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const handlerGet = async (req: NextRequest, res: NextResponse) => {
  await connect();
  try {
    const user = (req as any).user;

    const userRecord = await User.findOne({ email: user.email });

    if (!userRecord) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const id = req.url.split(`${baseUrl}/job/`)[1];
    console.log("id", id);

    const job = await JobModel.findById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching jobs" },
      { status: 500 }
    );
  }
};

const handlerPut = async (req: NextRequest) => {
  console.log("handlerPut hit");

  await connect();
  try {
    const user = (req as any).user;
    const userRecord = await User.findOne({ email: user.email });

    if (!userRecord) {
      console.log("User not found");

      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const id = req.url.split(`${baseUrl}/job/`)[1];
    console.log("id", id);

    const data = await req.json();

    console.log("data", data);

    const job = await JobModel.findByIdAndUpdate(id, data, { new: true });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { success: false, message: "Error updating job" },
      { status: 500 }
    );
  }
};

const handlerDelete = async (req: NextRequest) => {
  await connect();
  try {
    const user = (req as any).user;
    const userRecord = await User.findOne({ email: user.email });

    if (!userRecord) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const id = req.url.split(`${baseUrl}/job/`)[1];

    const job = await JobModel.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting job" },
      { status: 500 }
    );
  }
};
export const GET = authMiddleware(handlerGet);

export const DELETE = authMiddleware(handlerDelete);

export const PUT = authMiddleware(handlerPut);
