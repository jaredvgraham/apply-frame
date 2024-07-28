"use client";
import AlterResume from "@/components/AlterResume";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { jobId } = useParams();

  return <AlterResume jobId={jobId as string} />;
};

export default Page;
