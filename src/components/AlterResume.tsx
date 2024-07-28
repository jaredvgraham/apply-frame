"use client";

import { useAuth } from "@/context/AuthContext";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import UploadResume from "./UploadResume";

type AlterResumeProps = {
  jobId: string;
};

const AlterResume = ({ jobId }: AlterResumeProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [noResume, setNoResume] = useState<boolean>(false);
  const [changeResume, setChangeResume] = useState<boolean>(false);
  const [uploading, setUploading] = useState<string>("");
  const { userId } = useAuth();
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosPrivate.get(`/job/${jobId}`);
        setJobDescription(response.data.jobDescription);
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
      setSuccess("File uploaded successfully");
      setUploading("");
    } catch (error: any) {
      setUploading("");
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full md:w-2/3 mx-auto p-6 bg-background text-text shadow-md rounded-lg min-h-screen">
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="text-3xl font-semibold mb-6">Alter Resume</h1>
        <p className="text-lg mb-6 text-center w-full md:w-2/3">
          Use this form to tailor your resume based on the job description.
          Upload your resume if you haven't done so already.
        </p>
        <div className="w-full lg:w-2/3 shadow-md bg-backgroundAlt mb-4 rounded-lg p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={uploading !== ""}
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
            {pdfUrl && (
              <a
                href={pdfUrl}
                download="altered-resume.pdf"
                className="block mt-4 text-center text-neutral underline"
              >
                Download altered resume
              </a>
            )}
            {error && <p className="mt-4 text-center text-warning">{error}</p>}
            {success && (
              <p className="mt-4 text-center text-success">{success}</p>
            )}
          </form>
        </div>
        {noResume && <UploadResume />}
        {!noResume && (
          <button
            onClick={() => setChangeResume(!changeResume)}
            className="text-neutral underline"
          >
            {changeResume ? "Cancel" : "Change Resume"}
          </button>
        )}
        {changeResume && <UploadResume />}
      </div>
    </div>
  );
};

export default AlterResume;
