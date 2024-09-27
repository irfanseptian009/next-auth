"use client";

import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const handleLogout = () => {
    // Clear the token on logout
    localStorage.removeItem("token");
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome to the Dashboard!</p>
      <p className="mb-4">Your token: {token}</p>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => router.push("/users")}
        >
          View Users
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => router.push("/users/form")}
        >
          Add User
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
