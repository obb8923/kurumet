"use client";
import Image from "next/image";
import Map from "../components/KakaoMap";
import Dropdown from "@/components/Dropdown";
import { useMapState } from "@/store/StateMap";
import List from "@/components/List";
export default function Home() {
  const mapState = useMapState();
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="m-2 flex justify-end" style={{ width: "90vw" }}>
        <Dropdown />
      </div>

      <div className="w-96 h-96 " style={{ width: "90vw", height: "90vh" }}>
        {mapState === "지도" && <Map />}
        {mapState === "리스트" && <List />}
      </div>
    </main>
  );
}
