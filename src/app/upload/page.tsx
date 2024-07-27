"use client";
import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      alert("Please provide both a file and job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDescription);

    const response = await fetch("/api/uploadResume", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } else {
      alert("Failed to upload resume");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Resume:
          <input type="file" onChange={handleFileChange} />
        </label>
      </div>
      <div>
        <label>
          Job Description:
          <textarea
            value={jobDescription}
            onChange={handleJobDescriptionChange}
          ></textarea>
        </label>
      </div>
      <button type="submit">Submit</button>
      {downloadUrl && (
        <div>
          <a href={downloadUrl} download="modified.pdf">
            Download Modified Resume
          </a>
        </div>
      )}
    </form>
  );
};

export default UploadForm;
