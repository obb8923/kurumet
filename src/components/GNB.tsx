"use client";
import Link from "next/link";
import Image from "next/image";
import userProfile from "../../public/userProfile.svg";
import YoutuberCon from "./youtuberCon";
import Search from "./Search";
import { useList } from "@/store/StateCon";
import { useEffect } from "react";
export default function GNB() {
  const l = useList();
  useEffect(() => {
    console.log("l: ", l);
  }, [l]);
  return (
    <nav className="flex shadow">
      {/* logo Section */}
      <div className="my-1 py-1 px-8 border-r border-black border-solid">
        <Link href="/">logo</Link>
      </div>
      {/* youtuberCon Section */}
      <div className="flex gap-10 flex-1 my-1 py-1 px-8">
        <YoutuberCon name="공슐랭 가이드"></YoutuberCon>
        <YoutuberCon name="먹을텐데"></YoutuberCon>
      </div>
      {/* search Section */}
      <div className=" py-1 px-8">
        <Search />
      </div>
      {/* login Section */}
      <div className="bg-red-600 my-1 py-1 px-8 flex justify-end">
        <Image src={userProfile} alt="userProfile"></Image>
      </div>
    </nav>
  );
}
