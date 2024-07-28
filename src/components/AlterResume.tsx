"use client";

import { useAuth } from "@/context/AuthContext";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useParams } from "next/navigation";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import UploadResume from "./UploadResume";
import { set } from "mongoose";

type AlterResumeProps = {
  jobId: string;
};

const AlterResume = ({ jobId }: AlterResumeProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [noResume, setNoResume] = useState<boolean>(false);
  const [uploading, setUploading] = useState<string>("");
  const { userId } = useAuth();
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  console.log("userId", userId);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosPrivate.get(`/job/${jobId}`);
        setJobDescription(response.data.jobDescription);

        console.log("Job:", response.data);

        console.log("userId is", userId);
      } catch (error: any) {
        console.error("Error fetching job:", error);
        setError("Failed to load job details.");
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [axiosPrivate, jobId]);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosPrivate.get(`/user`);
      } catch (error: any) {
        if (error.response.status === 400) {
          setError("Resume not found.");
          setNoResume(true);
        }
        console.error("Error fetching resume:", error);
      }
    };

    if (userId) {
      fetchResume();
    }
  }, [userId]);

  const handleJobDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploading("Uploading...");
    e.preventDefault();
    if (!jobDescription) {
      setError("Please provide a job description");
      return;
    }

    try {
      const response = await axiosPrivate.post(
        "/resume/alterResume",
        { jobDescription },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(url);
      console.log("Response:", response);
      setSuccess("File uploaded successfully");
      setUploading("");
    } catch (error: any) {
      setUploading("");
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full md:w-2/3 mx-auto  p-6 bg-background text-text shadow-md rounded-lg min-h-screen  ">
      <div className="flex flex-col min-h-screen  justify-center items-center">
        <h1 className="text-3xl font-semibold mb-6">Alter Resume</h1>
        <div className="w-full lg:w-2/3  shadow-md bg-backgroundAlt mb-4 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 p-4">
            <div>
              <label className="block text-lg font-medium mb-2">
                Job Description:
                <textarea
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  placeholder="Job description..."
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                ></textarea>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark transition duration-300"
            >
              Submit
            </button>
            {pdfUrl && (
              <a
                href={pdfUrl}
                download="altered-resume.pdf"
                className="block mt-4 text-center text-primary underline"
              >
                Download altered resume
              </a>
            )}
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            {success && (
              <p className="mt-4 text-center text-green-500">{success}</p>
            )}
            {uploading && (
              <p className="mt-4 text-center text-primary">{uploading}</p>
            )}
          </form>
        </div>
        {noResume && <UploadResume />}
      </div>
    </div>
  );
};

export default AlterResume;
