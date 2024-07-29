import { writeFile, unlink } from "fs/promises";

import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import puppeteer from "puppeteer";
import { alterResume } from "@/services/chatGPTService";
import User from "@/models/userModel";
import fs from "fs";

import authMiddleware from "@/middleware/auth";

export const maxDuration = 300; // 300 seconds or 5 minutes
export const dynamic = "force-dynamic";
//
const handler = async (req: NextRequest, res: NextResponse) => {
  console.log("alter resume handler hit");

  try {
    const jobDescription = await req.json();
    const user = (req as any).user;

    if (!jobDescription) {
      return NextResponse.json(
        { success: false, message: "Job description missing" },
        { status: 400 }
      );
    }

    const userRecord = await User.findOne({ email: user.email });

    if (!userRecord) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { resume } = userRecord;

    if (!resume) {
      console.log("Resume not found");

      return NextResponse.json(
        { success: false, message: "Resume not found" },
        { status: 404 }
      );
    }

    const alteredResumeHtml = await alterResume(resume, jobDescription);

    if (!alteredResumeHtml) {
      console.error("No HTML content was returned from the rewriting service.");
      return NextResponse.json(
        { error: "No HTML content was returned from the rewriting service." },
        { status: 500 }
      );
    }

    const uploadDir = join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const htmlPath = join(uploadDir, "resume.html");

    await writeFile(htmlPath, alteredResumeHtml);
    console.log("HTML content written to:", htmlPath);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.on("console", (consoleObj) => console.log(consoleObj.text()));

    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    await unlink(htmlPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=modified.pdf",
      },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = authMiddleware(handler);

// i dont have it
