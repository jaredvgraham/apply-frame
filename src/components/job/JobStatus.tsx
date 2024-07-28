"use client";
import React from "react";
import { Job } from "@/types";
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
import "../../styles/job.css";

type JobStatusProps = {
  job: Job | null;
  isEditing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  dateApplied: string;
  setDateApplied: React.Dispatch<React.SetStateAction<string>>;
  interviewDate: string;
  setInterviewDate: React.Dispatch<React.SetStateAction<string>>;
  offerAmount: number | null;
  setOfferAmount: React.Dispatch<React.SetStateAction<number | null>>;
};

const JobStatus = ({
  job,
  isEditing,
  handleChange,

  dateApplied,
  setDateApplied,
  interviewDate,
  setInterviewDate,
  offerAmount,
  setOfferAmount,
}: JobStatusProps) => {
  const router = useRouter();

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
                  name="dateApplied"
                  value={dateApplied}
                  onChange={(e) => setDateApplied(e.target.value)}
                  className="ml-2 bg-transparent border-2 border-border p-2 rounded"
                />
              )}
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
                  name="interviewDate"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
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
