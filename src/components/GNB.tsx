"use client";
import YoutuberCon from "./youtuberCon";
import Search from "./Search";
import { useRouter } from "next/navigation";

export default function GNB() {
  const router = useRouter();

  return (
    <nav className="flex shadow">
      {/* logo Section */}
      <div className="flex justify-center items-center my-1 py-1 px-8 border-r border-black border-solid hover:cursor-pointer">
        <div
          className="logo text-xl"
          onClick={() => {
            router.push("/");
          }}
        >
          kurumet
        </div>
      </div>
      {/* youtuberCon Section */}
      <div className="flex gap-4 flex-1 my-2 px-8">
        <YoutuberCon name="공슐랭 가이드"></YoutuberCon>
        <YoutuberCon name="먹을텐데"></YoutuberCon>
      </div>
      {/* search Section */}
      <div className="flex justify-center items-center mx-4">
        <Search />
      </div>
      {/* login Section */}
      <div className=" flex justify-center items-center mx-4">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => {
            router.push("/suggestion");
          }}
        >
          건의사항
        </button>
      </div>
    </nav>
  );
}
