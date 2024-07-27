"use client";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Job } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosPrivate.get("/job");
        setJobs(response.data);
      } catch (error: any) {
        console.error("Error fetching jobs:", error);
        setError(error);
      }
    };

    fetchJobs();
  }, [axiosPrivate]);

  const navToJob = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map((job: any) => (
          <div>
            <li key={job._id} onClick={() => navToJob(job._id)}>
              <h2>{job.companyName}</h2>
              <p>{job.jobTitle}</p>
              <p>{job.dateApplied}</p>
              <p>{job.interest}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default page;
