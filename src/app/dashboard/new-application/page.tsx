"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";

interface JobFormProps {
  applyWithUs?: boolean;
}

const JobForm: React.FC<JobFormProps> = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    applied: "",
    interest: 0,
    jobDescription: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("formData", formData);

      await axiosPrivate.post("/job", formData);

      setFormData({
        companyName: "",
        jobTitle: "",
        applied: "",
        interest: 0,
        jobDescription: "",
      });
      setError(null);
      router.push("/dashboard");
    } catch (error) {
      setError("Error adding new application");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block mb-1">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Applied already?</label>
          <input
            type="text"
            name="applied"
            value={formData.applied}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Interest Level</label>
          <input
            type="number"
            name="interest"
            value={formData.interest}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-primary-color text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobForm;
