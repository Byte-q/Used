"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("❌ Please enter username and password!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const allData = await res.json();
      const data = await allData.user;
      if (!res.ok) {
        setError(allData.error || "❌ Invalid login");
        return;
      }

      // Store user email in localStorage
      localStorage.setItem("userId", data._id);
      // sessionStorage.setItem("user", data);
      alert("✅ Login successful!");
      router.push("/profile"); // Redirect to profile page
    } catch (error) {
      console.error("Error", error)
      setError("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 rounded-lg shadow-md w-96 border-1">
        <h2 className="text-2xl font-bold text-center mb-4">🔑 Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
