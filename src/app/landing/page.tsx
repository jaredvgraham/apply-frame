"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Head from "next/head";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

const LandingPage = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleSignin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const text = {
    appName: "MyApp",
    header: "Welcome to MyApp",
    description: "The ultimate solution for all your needs.",
    features: [
      {
        title: "Feature One",
        description: "Description of feature one.",
      },
      {
        title: "Feature Two",
        description: "Description of feature two.",
      },
      {
        title: "Feature Three",
        description: "Description of feature three.",
      },
    ],
    testimonials: [
      {
        name: "Jane Doe",
        feedback: "MyApp has transformed the way I work. Highly recommended!",
      },
      {
        name: "John Smith",
        feedback: "An indispensable tool for my daily tasks. A game changer!",
      },
    ],
  };

  return (
    <>
      {/* SEO */}
      <Head>
        <title>{text.appName}</title>
        <meta name="description" content={text.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={text.appName} />
        <meta property="og:description" content={text.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={text.appName} />
        <meta name="twitter:description" content={text.description} />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/twitter-image.jpg"
        />
        <link rel="canonical" href="https://yourwebsite.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              name: text.appName,
              url: "https://yourwebsite.com",
            }),
          }}
        />
      </Head>
      <div className="min-h-screen flex flex-col bg-background text-text">
        {/* Header */}
        <header className="bg-background-alt shadow-custom">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">{text.appName}</h1>
            <nav className="flex gap-4">
              <button
                onClick={handleSignin}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark mr-4"
              >
                Sign In
              </button>
              <button
                onClick={handleSignup}
                className="bg-secondary text-white py-2 px-4 rounded hover:bg-secondary-dark"
              >
                Sign Up
              </button>

              <ThemeToggle />
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="relative flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center text-center h-[calc(100vh-160px)]">
            <h2 className="text-5xl font-extrabold text-primary sm:text-6xl">
              {text.header}
            </h2>
            <p className="mt-4 text-xl text-neutral">{text.description}</p>
            <div className="mt-8">
              <button
                onClick={handleSignup}
                className="bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary-dark"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 w-full flex justify-center mb-4">
            <svg
              onClick={() => scrollToSection("features")}
              className="w-8 h-8 text-primary animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </main>

        {/* Features Section */}
        <section id="features" className="bg-background-alt py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-primary mb-8">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {text.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-background rounded-lg shadow-custom border border-border"
                >
                  <h4 className="text-2xl font-semibold text-secondary mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-neutral">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-background py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-primary mb-8">
              Testimonials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {text.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 bg-background-alt rounded-lg shadow-custom border border-border"
                >
                  <p className="text-neutral italic mb-4">
                    "{testimonial.feedback}"
                  </p>
                  <h4 className="text-xl font-semibold text-secondary">
                    - {testimonial.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-background-alt py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-primary mb-8">
              Ready to get started?
            </h3>
            <button
              onClick={handleSignup}
              className="bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary-dark"
            >
              Sign Up Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background-alt shadow-custom mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-neutral">
              &copy; 2024 MyApp. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
