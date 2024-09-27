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
    <div className=" mx-auto p-6 h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-6 my-32 mx-32">
        <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
        <p className="mb-4 text-center">Welcome to the Dashboard!</p>
        <p className="mb-4 text-center text-gray-600">
          Your token: <span className="font-semibold">{token}</span>
        </p>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => router.push("/users")}
          >
            View Users
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => router.push("/users/form")}
          >
            Add User
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
