"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";

const JobForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    applied: "No",
    interest: 1,
    jobDescription: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.companyName ||
      !formData.jobTitle ||
      !formData.jobDescription
    ) {
      setError("Please fill out all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axiosPrivate.post("/job", formData);

      setFormData({
        companyName: "",
        jobTitle: "",
        applied: "No",
        interest: 1,
        jobDescription: "",
      });
      setError(null);
      router.push("/dashboard");
    } catch (error) {
      setError("Error adding new application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6  max-w-lg mx-auto bg-backgroundAlt rounded-lg shadow-custom mt-32">
      <h1 className="text-2xl font-bold mb-4 text-text">Add New Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-text">
            Company Name <span className="text-warning">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded border-border text-text bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-text">
            Job Title <span className="text-warning">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded border-border text-text bg-transparent"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-text">Applied already?</label>
          <select
            name="applied"
            value={formData.applied}
            onChange={handleInputChange}
            className="w-full p-2 border rounded border-border text-text bg-transparent"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-text">
            Interest Level (1-10) <span className="text-warning">*</span>
          </label>
          <input
            type="range"
            name="interest"
            value={formData.interest}
            onChange={handleInputChange}
            min="1"
            max="10"
            className="w-full"
            required
          />
          <div className="text-center text-text">{formData.interest}</div>
        </div>
        <div>
          <label className="block mb-1 text-text">
            Job Description <span className="text-warning">*</span>
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded border-border text-text bg-transparent h-32"
            required
          />
        </div>

        {error && <p className="text-warning">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
