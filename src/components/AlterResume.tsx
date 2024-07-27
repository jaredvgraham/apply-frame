"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import React, { ChangeEvent, useState } from "react";

const AlterResume = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  const handleJobDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jobDescription) {
      setMessage("Please provide a job description");
      return;
    }

    try {
      const response = await axiosPrivate.post(
        "/alterResume",
        { jobDescription },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(url);
      console.log("Response:", response);
      setMessage("File uploaded successfully");
    } catch (error: any) {
      console.error("Error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Alter Resume</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Job Description:
            <textarea
              placeholder="job description..."
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            ></textarea>
          </label>
        </div>
        <button type="submit">Submit</button>
        {pdfUrl && (
          <a href={pdfUrl} download="altered-resume.pdf">
            Download altered resume
          </a>
        )}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AlterResume;
