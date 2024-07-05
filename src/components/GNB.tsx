"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import userProfile from "../../public/userProfile.svg";
export default function GNB() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("id");
    console.log();
    if (loginStatus?.length != undefined) {
      setIsLogin(true);
    }
  }, []);

  return (
    <nav className="flex shadow">
      {/* logo Section */}
      <div className="my-1 py-1 px-8 border-r border-black border-solid">
        <Link href="/">logo</Link>
      </div>
      {/* youtuberCon Section */}
      <div className="bg-blue-600 flex-1 my-1 py-1 px-8"></div>
      {/* login Section */}
      <div className="bg-red-600 my-1 py-1 px-8 flex justify-end">
        <Image src={userProfile} alt="userProfile"></Image>
      </div>
    </nav>
  );
}
