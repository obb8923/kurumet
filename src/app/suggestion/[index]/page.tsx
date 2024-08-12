"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
type listIndexType = {
  id: string;
  password: string;
  header: string;
  text: string;
  answer: string;
};
const Page = () => {
  const { index } = useParams();
  const [data, setData] = useState<listIndexType>();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/suggestion", {
        params: { index: index },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="w-full flex flex-col items-center pt-10 gap-5"
      style={{ minHeight: "90vh" }}
    >
      <div className="w-10/12 flex flex-col gap-5 bg-gray-100 rounded-xl px-6 py-4">
        <div className="w-full min-h-16 text-3xl flex items-center">
          <span>{data?.header}</span>
        </div>
        <hr></hr>
        <div className="w-full min-h-10 text-xl">{data?.text}</div>
      </div>
      <div className="w-10/12 text-xl">
        <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
          <p>{data?.answer === "" ? "아직 답변이 없습니다." : data?.answer}</p>
        </blockquote>
      </div>
    </div>
  );
};

export default Page;
