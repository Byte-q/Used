"use client";
import Image from "next/image";
import "./profile.css";
import Button from "../../components/Button";
import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useRouter } from "next/navigation";


const Page = () => {
  interface User {
    email: string;
    username: string;
    imageUrl: string;
    coverImage: string;
  }

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const API_BASE_URL = process.env.API_BASE_URL;
        const res = await fetch(`${API_BASE_URL}/users/${userId}`);
        const allData = await res.json();
        const data = allData.data;

        if (res.ok) {
          setUser(data);
        } else {
          console.error("Error fetching user:", allData.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear user session
    router.push("/signup"); // Redirect to login page
  };



if (loading) {
  return <LoadingSpinner />;
}

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>No user found. Please login.</p>
        <a href="/login" className="text-blue-500 underline">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="h-[150vb] lg:h-[100vb] w-full flex flex-col">
      <section
        id="cover"
        className="cover bg-rose-400 h-[30%] lg:h-[70%] w-full relative"
      >
        <header className="flex justify-between p-5 h-20 bg-transparent z-2 relative">
          <span className="flex gap-5">
            <Button name="Home" path="/" />
            <Button name="Dashboard" path="/Dashboard" />
          </span>
          <div className="info w-fit flex justify-center items-center gap-5">
              <Button icon="logOut" onClick={handleLogout} />
          </div>
        </header>
        <Image src={user.coverImage || "/profile.png"} alt="none" fill className="z-0" />
        <div className="des z-2 relative transform translate-y-15 p-10">
          <h3 className="text-sky-400 font-bold text-3xl text-center md:text-start">
            Welcome, {user.username}
          </h3>
          <p className="text-white text-center md:text-start text-lg">
            This is your profile page, you can view and edit you personal
            information here.
          </p>
        </div>
      </section>
      <section className="details h-[70%] lg:h-[20%] w-full flex flex-col lg:flex-row gap-5 relative">
        <div className="act bg-white w-full lg:w-[30%] h-[270px] lg:absolute bottom-0 right-5 shadow shadow-gray-500 rounded z-2">
          <div className="photo w-full h-[50%] flex flex-row gap-2 justify-center items-center pr-5 pl-5">
            <Button name="Connect" />
            <span className="pho w-[120px] h-[120px] flow relative">
              <Image src={user.imageUrl || "/profile.png"} alt="none" fill />
            </span>
            <Button name="Message" />
          </div>
          <div className="actions flex gap-15 h-[50%] w-full justify-center items-center">
            <span className="">
              <p>20</p>
              <h5>sells</h5>
            </span>
            <span className="">
              <p>13</p>
              <h5>Bought</h5>
            </span>
            <span className="">
              <p>33</p>
              <h5>Tansictions</h5>
            </span>
          </div>
        </div>
        <div className="info bg-white w-full lg:w-[65%] min-h-[270px] lg:absolute lg:bottom-0 lg:left-5 shadow shadow-gray-500 rounded z-2">
          <div className="cont h-[50px] bg-white p-5">
            <h2 className="font-bold">My Account</h2>
          </div>
          <section className="userInfo bg-gray-100 p-5">
            <div className="header">USER INFORMATION</div>
            <div className="content grid grid-flow-col grid-rows-2 gap-5">
              <UserInfo title="User Name" val={user.username} />
              <UserInfo title="email" val={user.email} />
              {/* <UserInfo title="First Name" val={items.firstName} />
              <UserInfo title="Last Name" val={items.lastName} /> */}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Page;
