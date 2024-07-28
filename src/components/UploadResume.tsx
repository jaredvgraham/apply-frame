"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { set } from "mongoose";
import React, { useState } from "react";

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [uploading, setUploading] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploading("Uploading...");
    e.preventDefault();
    if (!file) {
      setError("Please provide a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosPrivate.post(
        "/resume/uploadResume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);
      setUploading("");
      setSuccess("File uploaded successfully");
    } catch (error: any) {
      setUploading("");
      console.error("Error:", error);
      setError("Failed to upload file was it a PDF?");
    }
  };

  return (
    <div className="w-full lg:w-2/3 mx-auto p-6 bg-backgroundAlt text-text shadow-md mt-32 rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Upload Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">
            Resume:
            <div className="relative mt-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="w-full bg-secondary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark transition duration-300"
              >
                Choose File
              </button>
            </div>
            {file && <p className="mt-2">{file.name}</p>}
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark transition duration-300"
        >
          Submit
        </button>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {success && (
          <p className="mt-4 text-center text-green-500">{success}</p>
        )}
        {uploading && (
          <p className="mt-4 text-center text-primary">{uploading}</p>
        )}
      </form>
    </div>
  );
};

export default UploadResume;
