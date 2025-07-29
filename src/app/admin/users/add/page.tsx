'use client'

import React, { useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { UploadButton } from '@/utils/uploadthing'

const page = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password || !fullName) {
      setError("❌ Please fill all fields!");
      return;
    }

    try {
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

      setSuccess("✅ User added successfully!");
    } catch (error) {
      console.error("Error:",error)
      setError("❌ Something went wrong!");
    }
  };

  return (
    <AdminLayout title="إضافة مستخدم جديد" description='إضافة مستخدم جديد إلى النظام'>
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">إضافة مستخدم جديد</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form className="w-full max-w-md">
            <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">اسم المستخدم</label>
            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" placeholder="أدخل اسم المستخدم" />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">الاسم الكامل </label>
            <input type="text" id="fullName" onChange={(e) => setFullName(e.target.value)} className="w-full p-2 border rounded" placeholder="ادخل إسم المستخدم الكامل" />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">البريد الإلكتروني</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="أدخل البريد الإلكتروني" />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">كلمة المرور</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="أدخل كلمة المرور" />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">حمل صورة الملف الشخصي</label>
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
            </div>
            <button type="submit" onClick={handleSignup} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">إضافة مستخدم</button>
        </form>
    </main>
    </AdminLayout>
  )
}

export default page