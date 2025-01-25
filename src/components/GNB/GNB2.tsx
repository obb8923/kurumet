"use client";
import AddConButton from "./AddConButton";
import SelectedConList from "../SelectedConList";
import Logo from "./Logo";
import HamButton from "./HamButtton";
const GNB = () => {
  return (
    <nav className="flex shadow items-center">
      {/* logo Section */}
      <Logo />
      {/* youtuberCon Section */}
      <div className="flex gap-4 flex-1 my-2 px-4 lg:px-8">
        <SelectedConList />
      </div>
      {/* add Con Section */}
      <div className="hidden lg:block flex justify-center items-center mx-4">
        <AddConButton />
      </div>
      <div className="h-full w-14 flex"/>
      {/* 모바일에서만 보이는 햄버거 Section */}
      <HamButton />  
    </nav>
  );
}
export default GNB;