"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Job } from "@/types";

interface JobContextProps {
  job: Job | undefined;
  editedJob: Job | undefined;
  setEditedJob: (job: Job) => void;
  error: string | null;
  fetchJob: (jobId: string) => Promise<void>;
  updateJob: (jobId: string, updatedJob: Job) => Promise<void>;
}

const JobContext = createContext<JobContextProps | undefined>(undefined);

export const useJob = (): JobContextProps => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider = ({ children }: JobProviderProps) => {
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [editedJob, setEditedJob] = useState<Job | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const fetchJob = async (jobId: string) => {
    try {
      const response = await axiosPrivate.get(`/job/${jobId}`);
      setJob(response.data);
      setEditedJob(response.data);
    } catch (error) {
      console.error("Error fetching job:", error);
      setError("Failed to load job details.");
    }
  };

  const updateJob = async (jobId: string, updatedJob: Job) => {
    try {
      await axiosPrivate.put(`/job/${jobId}`, updatedJob);
      setJob(updatedJob);
    } catch (error) {
      console.error("Error updating job:", error);
      setError("Failed to update job.");
    }
  };

  return (
    <JobContext.Provider
      value={{ job, editedJob, setEditedJob, error, fetchJob, updateJob }}
    >
      {children}
    </JobContext.Provider>
  );
};
