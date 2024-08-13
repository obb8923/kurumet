"use client";
import { useRouter } from "next/navigation";
export default function SuggestionButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="w-full h-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      onClick={() => {
        router.push("/suggestion");
      }}
    >
      건의사항
    </button>
  );
}
