"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { listIndexType } from "../type/listIndexType";

const Suggestion = () => {
  const router = useRouter();
  const [listdata, setListData] = useState<listIndexType[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/suggestion");
      // console.log(response.data);
      setListData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full " style={{ height: "90vh" }}>
      <div className=" max-w-full max-h-full min-w-full min-h-full flex flex-col items-center mt-5 gap-5">
        {/* buttons */}
        <div className="w-11/12 flex justify-end">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => {
              router.push("/suggestion/post");
            }}
          >
            글쓰기
          </button>
        </div>
        {/* table */}
        <table className="block table-fixed max-w-full w-11/12 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="block w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="block w-full">
              <th
                scope="col"
                className="inline-block px-1 py-1 md:px-3 lg:px-6 md:py-3  w-1/12 truncate"
              >
                순서
              </th>
              <th
                scope="col"
                className="inline-block px-1 md:px-6 py-3 w-8/12 truncate"
              >
                제목
              </th>
              <th
                scope="col"
                className="inline-block px-1 md:px-6 py-3 w-2/12 truncate"
              >
                작성자
              </th>
              <th
                scope="col"
                className="inline-block px-1 md:px-6 py-3 w-1/12 truncate"
              >
                답변 여부
              </th>
            </tr>
          </thead>
          <tbody className="w-full overflow-y-auto block">
            {listdata
              .slice()
              .reverse()
              .map((v: listIndexType, index: number) => (
                <tr
                  key={`${index}-${v.id}-${v.header}`}
                  className="block border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-pointer dark:hover:bg-gray-600"
                  onClick={() => {
                    router.push(`/suggestion/${listdata.length - index - 1}`);
                  }}
                >
                  <td className="inline-block w-1/12 px-1 md:px-6 py-3 truncate">
                    {listdata.length - index - 1}
                  </td>

                  <td className="inline-block w-8/12 px-1 md:px-6 py-3 font-medium text-gray-900 truncate dark:text-white">
                    {v.header}
                  </td>
                  <td className="inline-block w-2/12 px-1 md:px-6 py-3 truncate">
                    {v.id}
                  </td>
                  <td className="inline-block w-1/12 px-1 md:px-6 py-3 truncate">
                    {v.answer === "" ? "N" : "Y"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suggestion;
