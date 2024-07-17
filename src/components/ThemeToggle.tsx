"use client";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-700 dark:text-gray-300">Light</span>
      <div
        onClick={toggleTheme}
        className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition duration-300 ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
      </div>
      <span className="ml-2 text-gray-700 dark:text-gray-300">Dark</span>
    </div>
  );
};

export default ThemeToggle;
