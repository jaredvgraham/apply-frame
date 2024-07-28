import UploadResume from "@/components/UploadResume";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl font-bold  text-center p-2">
        Upload Resume for future resume tailoring{" "}
      </p>
      <UploadResume />
    </div>
  );
};

export default page;
