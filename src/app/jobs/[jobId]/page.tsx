"use client";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Job } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import JobHeader from "@/components/job/JobHeader";
import JobDescription from "@/components/job/JobDescription";
import JobNotes from "@/components/job/JobNotes";
import JobStatus from "@/components/job/JobStatus";

const JobDetailPage = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contactPerson, setContactPerson] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState<Job | null>(null);
  const [dateApplied, setDateApplied] = useState<string>("");
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [offerAmount, setOfferAmount] = useState<number | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { jobId } = useParams<{ jobId: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosPrivate.get(`/job/${jobId}`);
        setJob(response.data);
        setEditedJob(response.data);
        if (response.data.dateApplied) {
          setDateApplied(
            new Date(response.data.dateApplied).toISOString().substring(0, 10)
          );
        }
        if (response.data.interviewDate) {
          setInterviewDate(
            new Date(response.data.interviewDate).toISOString().substring(0, 10)
          );
        }
        setOfferAmount(response.data.offerAmount || null);
        setContactPerson(
          response.data.contactPerson || {
            name: "",
            email: "",
            phone: "",
          }
        );
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
    if (!editedJob) return;
    if (editedJob.interest > 10) {
      setError("Interest must be between 0 and 10");
      return;
    }

    try {
      await axiosPrivate.put(`/job/${jobId}`, {
        ...editedJob,
        dateApplied: dateApplied ? new Date(dateApplied) : null,
        interviewDate: interviewDate ? new Date(interviewDate) : null,
        offerAmount,
        contactPerson,
      });

      setJob({ ...editedJob, contactPerson });
      setIsEditing(false);
      setError(null);
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
      } else if (type === "date") {
        if (name === "dateApplied") {
          setDateApplied(value);
        } else if (name === "interviewDate") {
          setInterviewDate(value);
        }
      } else if (type === "number" && name === "offerAmount") {
        setOfferAmount(Number(value));
      } else if (name.startsWith("contactPerson")) {
        const key = name.split(".")[1];
        setContactPerson({ ...contactPerson, [key]: value });
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

  return (
    <div className="p-0 md:p-6 bg-background text-text min-h-screen">
      {job ? (
        <div className="w-full mx-auto space-y-8">
          <JobHeader
            companyName={job.companyName}
            isEditing={isEditing}
            handleSave={handleSave}
            handleEdit={() => setIsEditing(true)}
            handleDelete={handleDelete}
            handleCancel={() => setIsEditing(false)}
            router={router}
          />
          {error && <div className="text-red-500">{error}</div>}
          <div className="bg-backgroundAlt p-6 rounded-xl shadow-lg space-y-6">
            <div className="flex justify-between">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="jobTitle"
                    value={editedJob?.jobTitle || ""}
                    onChange={handleChange}
                    className="text-xl font-semibold p-2 border-2 border-border rounded-md w-full bg-transparent text-text"
                  />
                  <input
                    type="number"
                    name="interest"
                    value={editedJob?.interest || ""}
                    onChange={handleChange}
                    className="text-xl font-semibold p-2 border-2 border-border rounded-md w-24 ml-4 bg-transparent text-text"
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
            <JobDescription
              jobDescription={job.jobDescription}
              showFullDescription={showFullDescription}
              setShowFullDescription={setShowFullDescription}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <JobNotes
                notes={editedJob?.notes || []}
                isEditing={isEditing}
                handleNotesChange={handleNotesChange}
              />
              <JobStatus
                job={editedJob}
                isEditing={isEditing}
                handleChange={handleChange}
                dateApplied={dateApplied}
                setDateApplied={setDateApplied}
                interviewDate={interviewDate}
                setInterviewDate={setInterviewDate}
                offerAmount={offerAmount}
                setOfferAmount={setOfferAmount}
              />
            </div>
            <h2 className="text-xl font-semibold">Contact Person:</h2>
            <ul className="list-none space-y-4">
              <li>
                <strong>Name:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="contactPerson.name"
                    value={contactPerson.name}
                    onChange={handleChange}
                    className="p-2 border-2 border-border rounded-md bg-transparent text-text"
                  />
                ) : (
                  job.contactPerson?.name
                )}
              </li>
              <li>
                <strong>Email:</strong>{" "}
                {isEditing ? (
                  <input
                    type="email"
                    name="contactPerson.email"
                    value={contactPerson.email}
                    onChange={handleChange}
                    className="p-2 border-2 border-border rounded-md bg-transparent text-text"
                  />
                ) : (
                  job.contactPerson?.email
                )}
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                {isEditing ? (
                  <input
                    type="tel"
                    name="contactPerson.phone"
                    value={contactPerson.phone}
                    onChange={handleChange}
                    className="p-2 border-2 border-border rounded-md bg-transparent text-text"
                  />
                ) : (
                  job.contactPerson?.phone
                )}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl">Loading...</div>
      )}
    </div>
  );
};

export default JobDetailPage;
