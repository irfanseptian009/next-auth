"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const setAuthToken = useAuthStore(
    (state: { setAuthToken: (token: string) => void }) => state.setAuthToken
  );

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: data.username,
        password: data.password,
      });
      setAuthToken(response.data.token);
      router.push("/dashboard");
    } catch (error: unknown) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-black p-6 shadow-lg rounded-xl"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="mb-4">
          <label>Username</label>
          <input
            {...register("username")}
            className="border rounded p-2 w-full"
            placeholder="Enter your username"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            {...register("password")}
            type="password"
            className="border rounded p-2 w-full"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-700 shadow-lg text-white py-1 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
