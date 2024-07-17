// app/protected/page.tsx
"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useState } from "react";

const ProtectedPage = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const fetchProtectedData = async () => {
    try {
      const res = await axiosPrivate.get("/protected");
      console.log(res.data);

      setMessage(res.data.message);
      setUser(res.data.user);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <div>
      <h1 className="text-white">Protected Page</h1>
      <button className="w-20 bg-white" onClick={fetchProtectedData}>
        Fetch Protected Data
      </button>
      {message && <p className="text-white">{message}</p>}
      {user && (
        <pre className="text-white">{JSON.stringify(user, null, 2)}</pre>
      )}
    </div>
  );
};

export default ProtectedPage;
