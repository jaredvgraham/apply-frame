import React from "react";

type JobDescriptionProps = {
  jobDescription: string | undefined;
  showFullDescription: boolean;
  setShowFullDescription: (showFullDescription: boolean) => void;
};

const JobDescription = ({
  jobDescription,
  showFullDescription,
  setShowFullDescription,
}: JobDescriptionProps) => {
  return (
    <div>
      <p className={`text-lg ${showFullDescription ? "" : "line-clamp-3"}`}>
        {jobDescription}
      </p>
      <button
        onClick={() => setShowFullDescription(!showFullDescription)}
        className="text-primary mt-2 underline"
      >
        {showFullDescription ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default JobDescription;
