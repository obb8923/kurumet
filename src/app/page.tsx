"use client";
import Map from "../components/KakaoMap";
import Dropdown from "@/components/Dropdown";
import { useMapState } from "@/store/StateMap";
import List from "@/components/List";
export default function Home() {
  const mapState = useMapState();
  return (
    <main className="flex flex-col items-center">
      <div className="m-2 flex justify-end" style={{ width: "90vw" }}>
        <Dropdown />
      </div>
      {mapState === "지도" && (
        <div className="w-96 h-96 " style={{ width: "90vw", height: "90vh" }}>
          <Map />
        </div>
      )}
      {mapState === "리스트" && (
        <div style={{ maxWidth: "90vw" }}>
          <List />
        </div>
      )}
    </main>
  );
}
