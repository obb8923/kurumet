"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type listIndexType = {
  id: string;
  password: string;
  header: string;
  text: string;
  answer: string;
};

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState<listIndexType>({
    id: "",
    password: "",
    header: "",
    text: "",
    answer: "",
  });

  const postData = async () => {
    try {
      console.log("Data: ", data);
      await axios.post("/api/suggestion/post", { data });
      router.push("/suggestion");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof listIndexType
  ) => {
    setData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <div
      className="w-full flex flex-col items-center pt-10 gap-5"
      style={{ height: "90vh" }}
    >
      <div className="w-10/12 flex flex-col bg-gray-100 rounded-xl">
        <div className="w-full h-16 text-3xl flex items-center">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full h-full rounded-xl px-6 py-4 bg-gray-100"
            onChange={(e) => handleChange(e, "header")}
          />
        </div>
        <hr />
        <div className="w-full text-xl">
          <textarea
            placeholder="내용을 입력하세요"
            className="w-full h-full rounded-xl px-6 py-4 bg-gray-100 min-h-80"
            onChange={(e) => handleChange(e, "text")}
          />
        </div>
      </div>
      <small className="w-10/12">
        각 글을 구별하고 나중에 열람하기 위해서 작성자 별명과 비밀번호를
        입력해주세요
      </small>
      <div className="flex w-10/12 gap-5 rounded-xl text-xl">
        <input
          type="text"
          placeholder="별명을 입력하세요"
          className="w-1/2 h-full bg-gray-100 px-6 py-4 rounded-xl"
          onChange={(e) => handleChange(e, "id")}
        />
        <input
          type="text"
          placeholder="비밀번호를 입력하세요"
          className="w-1/2 h-full bg-gray-100 px-6 py-4 rounded-xl"
          onChange={(e) => handleChange(e, "password")}
        />
      </div>
      <div className="w-10/12 flex justify-end">
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={postData}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default Page;
