"use client";
import React, { useState } from "react";

const Suggestion = () => {
  return (
    <div className="w-full " style={{ height: "90vh" }}>
      <div className="max-w-full w-full flex justify-center mt-12">
        <table className="table-fixed max-w-full w-11/12 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-9/12">
                제목
              </th>
              <th scope="col" className="px-6 py-3 w-2/12">
                작성자
              </th>
              <th scope="col" className="px-6 py-3 w-1/12">
                답변 여부
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-pointer dark:hover:bg-gray-600">
              <td className="max-h-2 leading-tight px-6 py-4 font-medium text-gray-900 truncate dark:text-white">
                Apple MacBook Pro 17 Apple MacBook Pro 17 Apple MacBook Pro 17
                Apple MacBook Pro 17 Apple MacBook Pro 17 Apple MacBook Pro 17
                Apple MacBook Pro 17 Apple MacBook Pro 17 Apple MacBook Pro 17
                Apple MacBook Pro 17
              </td>
              <td className="h-2 px-6 py-4 truncate">Silver</td>
              <td className="max-h-2 px-6 py-4 truncate">Laptop</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suggestion;
