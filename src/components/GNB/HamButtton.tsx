import { useState, useRef, useEffect } from "react";
import AddConButton from "./AddConButton";

const HamButton = () => {
    const [ham, setHam] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setTimeout(() => setHam(false), 0);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  return (
    <div className="relative lg:hidden" ref={menuRef}>
    {/* 햄버거 버튼 */}
    <button
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      onClick={() => {
        setHam((prev) => !prev);
      }}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
    {/* <!-- 내비게이션 메뉴 --> */}
    {ham && (
      <div className="w-[95vw] md:w-[55vw] border border-gray-300 bg-white px-8 py-4 absolute top-full right-0 z-20 lg:hidden">
        <div 
        className="flex flex-col gap-5 items-center max-w-full max-h-full min-w-full min-h-full" 
        >
          <AddConButton />
        </div>
      </div>
    )}
  </div>
  )
}

export default HamButton;