"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import Button from "../../components/Button";
import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useRouter } from "next/navigation";


const Page = () => {
  interface User {
    email: string;
    name: string;
  }

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/user?email=${userEmail}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.error("Error fetching user:", data.error);
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
    localStorage.removeItem("userEmail"); // Clear user session
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
            <span className="flex gap-4 hidden md:flex items-center">
              <Image
                className="rounded-full"
                src={"/profile.png"}
                alt="none"
                width={40}
                height={40}
              />
              <span className="name text-sky-500 font-bold">{user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="w-fit  bg-rose-400 text-white p-2 rounded hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faSignOut} />{" "}
              <span className="hidden md:inline-block">Log Out</span>
            </button>
          </div>
        </header>
        <Image src={"/profile.png"} alt="none" fill className="z-0" />
        <div className="des z-2 relative transform translate-y-15 p-10">
          <h3 className="text-sky-400 font-bold text-3xl text-center md:text-start">
            Welcome, {user.name}
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
              <Image src={"/profile.png"} alt="none" fill />
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
              <UserInfo title="User Name" val={user.name} />
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
