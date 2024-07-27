"use client";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Job } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const DashboardOverview = () => {
  const axiosPrivate = useAxiosPrivate();
  const [pastApplications, setPastApplications] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPastApplications = async () => {
      try {
        const response = await axiosPrivate.get("/job");
        setPastApplications(response.data);
        console.log("Past applications:", response.data);
      } catch (error: any) {
        console.error("Error fetching past applications:", error);
        setError("Failed to load past applications");
      }
    };

    fetchPastApplications();
  }, [axiosPrivate]);

  if (error) {
    return (
      <div className="p-6 bg-background text-text min-h-screen">{error}</div>
    );
  }

  return (
    <div className="p-6 bg-background text-text min-h-screen">
      <h1 className="text-5xl font-bold mb-8 text-center">
        Job Tracker Dashboard
      </h1>

      {/* Overview Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Application Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="border-2 border-border p-6 rounded-xl bg-background-alt shadow-xl text-center"
          >
            <h3 className="text-xl font-semibold mb-4">Total Applications</h3>
            <p className="text-6xl font-bold text-primary">
              {pastApplications.length}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="border-2 border-border p-6 rounded-xl bg-background-alt shadow-xl text-center"
          >
            <h3 className="text-xl font-semibold mb-4">Interviews Scheduled</h3>
            <p className="text-6xl font-bold text-success">
              {pastApplications.filter((app) => app.interview).length}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="border-2 border-border p-6 rounded-xl bg-background-alt shadow-xl text-center"
          >
            <h3 className="text-xl font-semibold mb-4">Offers Received</h3>
            <p className="text-6xl font-bold text-secondary">
              {pastApplications.filter((app) => app.offer).length}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Recent Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastApplications.length > 0 ? (
            pastApplications.slice(-5).map((application: Job) => (
              <motion.div
                key={application._id}
                whileHover={{ scale: 1.03 }}
                className="border-2 border-border p-6 rounded-xl bg-background-alt shadow-lg cursor-pointer hover:shadow-2xl transition"
                onClick={() => router.push(`/jobs/${application._id}`)}
              >
                <div className="flex flex-col h-full">
                  <p className="font-medium text-lg mb-2">
                    <strong>Company:</strong> {application.companyName}
                  </p>
                  <p className="font-medium text-lg mb-2">
                    <strong>Job Title:</strong> {application.jobTitle}
                  </p>
                  <p className="font-medium text-lg mb-2">
                    <strong>Date Applied:</strong>{" "}
                    {application.dateApplied
                      ? new Date(application.dateApplied).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="font-medium text-lg">
                    <strong>Interest Level:</strong> {application.interest}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full">No recent activity</p>
          )}
        </div>
      </section>

      {/* Navigation Section */}
      <section className="flex justify-center mt-12">
        <Link href="/dashboard/new-application">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-white py-4 px-8 rounded-xl shadow-md hover:bg-primary-dark transition cursor-pointer text-center"
          >
            Add New Application
          </motion.div>
        </Link>
      </section>
    </div>
  );
};

export default DashboardOverview;
