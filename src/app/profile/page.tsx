"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState<any>("");

  const getUserDetails = async () => {
    try {
      const res = await fetch("/api/users/me", { method: "POST" });
      const data = await res.json();
      console.log(data.user);
      setData(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex justify-around mt-10">
        <h1 className="text-4xl">User Profile</h1>
        <button
          onClick={logout}
          className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div>
          <h2 className="text-2xl">User name: {data.username}</h2>
          <h2 className="text-2xl">Email id:{data.email}</h2>
          <h2 className="text-2xl">Admin: {data.isAdmin ? "✔️" : "❌"}</h2>
          <h2 className="text-2xl">
            Verified: {data.isVerified ? "✔️" : "❌"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
