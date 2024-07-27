"use client";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Job } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faArrowLeft,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const JobDetailPage = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState<Job | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { jobId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      console.log("jobId", jobId);

      try {
        const response = await axiosPrivate.get(`/job/${jobId}`);
        setJob(response.data);
        setEditedJob(response.data);
        console.log("Job:", response.data);
      } catch (error: any) {
        console.error("Error fetching job:", error);
        setError("Failed to load job details.");
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [axiosPrivate, jobId]);

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`/job/${jobId}`);
      router.push("/jobs");
    } catch (error: any) {
      console.error("Error deleting job:", error);
    }
  };

  const handleSave = async () => {
    console.log("editedJob", editedJob);

    try {
      if (editedJob) {
        await axiosPrivate.put(`/job/${jobId}`, editedJob);
        setJob(editedJob);
        setIsEditing(false);
      }
    } catch (error: any) {
      console.error("Error updating job:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (editedJob) {
      if (type === "checkbox") {
        setEditedJob({
          ...editedJob,
          [name]: (e.target as HTMLInputElement).checked,
        });
      } else {
        setEditedJob({
          ...editedJob,
          [name]: value,
        });
      }
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editedJob) {
      setEditedJob({
        ...editedJob,
        notes: e.target.value.split("\n"),
      });
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-background text-text min-h-screen">{error}</div>
    );
  }

  return (
    <div className="p-6 bg-background text-text min-h-screen">
      {job ? (
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">{job.companyName}</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push("/jobs")}
                className="bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark transition"
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Jobs
              </button>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition"
                  >
                    <FontAwesomeIcon icon={faSave} /> Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700 transition"
                  >
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-secondary text-white py-2 px-4 rounded-md shadow hover:bg-secondary-dark transition"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 transition"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="bg-background-alt p-6 rounded-xl shadow-lg space-y-6">
            <div className="flex justify-between">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="jobTitle"
                    value={editedJob?.jobTitle || ""}
                    onChange={handleChange}
                    className="text-xl font-semibold p-2 border-2 border-border rounded-md w-full"
                  />
                  <input
                    type="number"
                    name="interest"
                    value={editedJob?.interest || ""}
                    onChange={handleChange}
                    className="text-xl font-semibold p-2 border-2 border-border rounded-md w-24 ml-4"
                  />
                </>
              ) : (
                <>
                  <p className="text-xl font-semibold">{job.jobTitle}</p>
                  <p className="text-xl font-semibold">
                    Interest: {job.interest}
                  </p>
                </>
              )}
            </div>
            <div>
              <p
                className={`text-lg ${
                  showFullDescription ? "" : "line-clamp-3"
                }`}
              >
                {job.jobDescription}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary mt-2 underline"
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-border p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Notes</h3>
                {isEditing ? (
                  <textarea
                    name="notes"
                    value={editedJob?.notes?.join("\n") || ""}
                    onChange={handleNotesChange}
                    className="text-base p-2 border-2 border-border rounded-md w-full h-32"
                  />
                ) : job.notes && job.notes.length > 0 ? (
                  <ul className="list-disc pl-6 space-y-2">
                    {job.notes.map((note, index) => (
                      <li key={index} className="text-base">
                        {note}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base">No notes available</p>
                )}
              </div>
              <div className="border-2 border-border p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Application Status</h3>
                <ul className="list-none space-y-2">
                  <li className="flex items-center">
                    <strong>Applied:</strong>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        name="applied"
                        checked={editedJob?.applied || false}
                        onChange={handleChange}
                        className="ml-2"
                      />
                    ) : (
                      <span className="ml-2">{job.applied ? "Yes" : "No"}</span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <strong>Interview:</strong>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        name="interview"
                        checked={editedJob?.interview || false}
                        onChange={handleChange}
                        className="ml-2"
                      />
                    ) : (
                      <span className="ml-2">
                        {job.interview ? "Scheduled" : "Not Scheduled"}
                      </span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <strong>Offer:</strong>
                    {isEditing ? (
                      <input
                        type="checkbox"
                        name="offer"
                        checked={editedJob?.offer || false}
                        onChange={handleChange}
                        className="ml-2"
                      />
                    ) : (
                      <span className="ml-2">
                        {job.offer ? "Received" : "Not Received"}
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl">Loading...</div>
      )}
    </div>
  );
};

export default JobDetailPage;
