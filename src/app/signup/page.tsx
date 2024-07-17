"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axiosPublic } from "@/utils/axios";
import { FiMail, FiLock } from "react-icons/fi";

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosPublic.post("/auth/signup", values);
        // Handle successful signup
        const { token } = res.data;

        // Store the token in local storage or cookies
        localStorage.setItem("token", token);

        router.push("/login"); // Redirect to dashboard or other page after successful signup
      } catch (err: any) {
        setError(err.message);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <div className="bg-background-alt shadow-custom rounded-lg p-8 max-w-md w-full border border-border">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-text">
          Welcome to Our Community!
        </h2>
        <p className="text-center text-neutral mb-6">
          Sign up to get started and enjoy our services.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-neutral" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm text-black"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="mt-2 text-sm text-warning">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-neutral" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="block w-full pl-10  pr-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm text-black"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="mt-2 text-sm text-warning">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          {error && <div className="mt-2 text-sm text-warning">{error}</div>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-custom text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary-dark"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
