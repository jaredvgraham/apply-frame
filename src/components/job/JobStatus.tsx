// i know this is a terrible way to handle this data i am currently fixing it
// i know this is a terrible way to handle this data i am currently fixing it
// i know this is a terrible way to handle this data i am currently fixing it
//i just needed a quick fix before i handle the state management properly
"use client";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import "../../styles/job.css";
import { Job } from "@/types";
import React, { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faCalendarAlt,
  faSave,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/navigation";
config.autoAddCss = false;

type JobStatusProps = {
  job: Job | null;
  isEditing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
};

const JobStatus = ({
  job,
  isEditing,
  handleChange,
  handleSave,
}: JobStatusProps) => {
  const [dateApplied, setDateApplied] = useState<string>("");
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [offerAmount, setOfferAmount] = useState<number | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  useEffect(() => {
    if (job?.dateApplied) {
      try {
        const parsedDate = new Date(job.dateApplied);
        setDateApplied(parsedDate.toISOString().substring(0, 10));
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
    if (job?.interviewDate) {
      try {
        const parsedDate = new Date(job.interviewDate);
        setInterviewDate(parsedDate.toISOString().substring(0, 10));
      } catch (error) {
        console.error("Error parsing date:", error);
      }
    }
    if (job?.offerAmount !== undefined) {
      setOfferAmount(job.offerAmount);
    }
  }, [job]);

  const sendDateToBack = async () => {
    console.log("sendDateToBack");

    try {
      console.log(dateApplied, interviewDate, offerAmount);

      if (job?._id) {
        await axiosPrivate.put(`/job/${job._id}`, {
          dateApplied,
          interviewDate,
          offerAmount,
        });
        console.log("Date updated successfully");
      }
    } catch (error: any) {
      console.error("Error updating job:", error);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateApplied(e.target.value);
  };

  const handleInterviewDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInterviewDate(e.target.value);
  };

  useEffect(() => {
    sendDateToBack();
  }, [handleSave]);

  const handleAlterResume = () => {
    router.push(`/jobs/${job?._id}/alterResume`);
  };

  return (
    <div className="border-2 border-border p-4 rounded-lg bg-backgroundAlt shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Application Status</h3>
      <ul className="list-none space-y-4">
        <li className="flex items-center">
          <strong className="mr-2">Applied:</strong>
          {isEditing ? (
            <>
              <input
                type="checkbox"
                name="applied"
                checked={job?.applied || false}
                onChange={handleChange}
                className="ml-2 bg-transparent"
              />
              {job?.applied && (
                <input
                  type="date"
                  value={dateApplied}
                  onChange={handleDateChange}
                  className="ml-2 bg-transparent border-2 border-border p-2 rounded"
                />
              )}
              <button className="ml-2 bg-primary text-white py-1 px-3 rounded flex items-center">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save
              </button>
            </>
          ) : (
            <>
              <span className="ml-2 flex items-center">
                {job?.applied ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-success mr-1"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-warning mr-1"
                  />
                )}
                {job?.applied ? "Yes" : "No"}
              </span>
              <br />
              {job?.applied && dateApplied && (
                <span className="ml-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-neutral mr-1"
                  />
                  Applied Date:{" "}
                  {`${dateApplied.substring(5, 7)}/${dateApplied.substring(
                    8,
                    10
                  )}/${dateApplied.substring(0, 4)}`}
                </span>
              )}
            </>
          )}
        </li>
        <li className="flex items-center">
          <strong className="mr-2">Interview:</strong>
          {isEditing ? (
            <>
              <input
                type="checkbox"
                name="interview"
                checked={job?.interview || false}
                onChange={handleChange}
                className="ml-2 bg-transparent"
              />
              {job?.interview && (
                <input
                  type="date"
                  value={interviewDate}
                  onChange={handleInterviewDateChange}
                  className="ml-2 bg-transparent border-2 border-border p-2 rounded"
                />
              )}
            </>
          ) : (
            <>
              <span className="ml-2 flex items-center">
                {job?.interview ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-success mr-1"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-warning mr-1"
                  />
                )}
                {job?.interview ? "Scheduled" : "Not Scheduled"}
              </span>
              {job?.interview && interviewDate && (
                <span className="ml-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-neutral mr-1"
                  />
                  Interview Date:{" "}
                  {`${interviewDate.substring(5, 7)}/${interviewDate.substring(
                    8,
                    10
                  )}/${interviewDate.substring(0, 4)}`}
                </span>
              )}
            </>
          )}
        </li>
        <li className="flex items-center">
          <strong className="mr-2">Offer:</strong>
          {isEditing ? (
            <>
              <input
                type="checkbox"
                name="offer"
                checked={job?.offer || false}
                onChange={handleChange}
                className="ml-2 bg-transparent"
              />

              {job?.offer && (
                <input
                  type="number"
                  name="offerAmount"
                  value={offerAmount || ""}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  className="ml-2 bg-transparent border-2 border-border p-2 rounded"
                />
              )}
            </>
          ) : (
            <span className="ml-2 flex items-center">
              {job?.offer ? (
                <>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-success mr-1"
                  />
                  {job?.offer && offerAmount && (
                    <span className="ml-2 flex items-center">
                      Offer Amount: ${offerAmount}
                    </span>
                  )}
                </>
              ) : (
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="text-warning mr-1"
                />
              )}
            </span>
          )}
        </li>
        <li>
          {!job?.applied && (
            <div className="border-2 border-secondary p-4 rounded-lg bg-transparent text-text mt-4 shadow-2xl">
              <p className="text-center mb-2">
                Tailor your resume and cover letter to the job description
                before applying.
              </p>
              <button onClick={handleAlterResume} className="cta-button">
                <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                Apply Now
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default JobStatus;
