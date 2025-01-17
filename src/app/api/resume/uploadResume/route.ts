import { NextRequest, NextResponse } from "next/server";
import { uploadFileToFirebase } from "@/lib/uploadFileFirebase";
import { uploadImageToFirebase } from "@/lib/uploadImageFirebase";
import User from "@/models/userModel";
import authMiddleware from "@/middleware/auth";
import { connect } from "@/utils/mongoose";
import { Buffer } from "buffer";
import axios from "axios";

//sheesh

export const maxDuration = 300; // 300 seconds or 5 minutes
export const dynamic = "force-dynamic";

const handler = async (req: NextRequest, res: NextResponse) => {
  console.log("upload resume handler hit");
  await connect();

  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    const user = (req as any).user;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "File missing",
        },
        { status: 400 }
      );
    }

    const userRecord = await User.findOne({ email: user.email });
    if (!userRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the PDF file to Firebase Storage
    const pdfFileName = `resumes/${Date.now()}_${file.name}`;
    const pdfUrl = await uploadFileToFirebase(buffer, pdfFileName);
    console.log("PDF URL:", pdfUrl);

    // Call the screenshot service
    const screenshotResponse = await axios.post(
      `${process.env.PUP_URL}/screenshot`, // Replace with your deployed server URL
      { url: pdfUrl },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY, // Your API key for the screenshot service
        },
        responseType: "arraybuffer", // to handle image response
      }
    );

    const screenshotBuffer = Buffer.from(screenshotResponse.data);
    console.log("Screenshot taken");

    // Upload screenshot to Firebase Storage
    const imageName = `${file.name.split(".")[0]}.png`;
    const imageUrl = await uploadImageToFirebase(screenshotBuffer, imageName);
    console.log("Image URL:", imageUrl);

    console.log("User record before update:", userRecord);

    // Update the resume field and save the document
    userRecord.resume = imageUrl;
    await userRecord.save();

    // Log the user record after update
    const updatedRecord = await User.findOne({ email: user.email });
    console.log("User record after update:", updatedRecord);

    return NextResponse.json(
      {
        success: true,
        message: "Resume uploaded successfully",
        resumeUrl: imageUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = authMiddleware(handler);
