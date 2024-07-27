"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import React, { useState } from "react";

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please provide a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosPrivate.post("/uploadResume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response);
      setMessage("File uploaded successfully");
    } catch (error: any) {
      console.error("Error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Upload Resume</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Resume:
            <input type="file" onChange={handleFileChange} />
          </label>
        </div>
        <button type="submit">Submit</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UploadResume;
