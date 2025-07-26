"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password || !fullName) {
      setError("❌ Please fill all fields!");
      return;
    }

    try {
      const API_BASE_URL = process.env.API_BASE_URL;
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, fullName, imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "❌ Signup failed");
        return;
      }

      setSuccess("✅ Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      console.error("Error:",error)
      setError("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <UploadButton
          className="my-2"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            if (res.length > 0) {
              setImageUrl(`https://bfk51v7csb.ufs.sh/f/${res[0].key}`);
              alert("Image Upload Completed");
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
