"use client";
import Map from "../components/KakaoMap";
import Dropdown from "@/components/Dropdown";
import { useMapState } from "@/store/StateMap";
import List from "@/components/List";
import { useList } from "@/store/StateCon";
export default function Home() {
  const l = useList();
  const mapState = useMapState();
  return (
    <main className="flex flex-col items-center">
      <div className="m-2 flex justify-end" style={{ width: "90vw" }}>
        <Dropdown />
      </div>
      {mapState === "지도" && (
        <div
          className="relative w-96 h-96"
          style={{ width: "90vw", height: "90vh" }}
        >
          {l.size == 0 && (
            <div className="absolute w-full h-full z-10 bg-gray-200  flex justify-center items-center">
              <small>보고싶은 유튜버를 클릭해보세요</small>
            </div>
          )}
          <div className="absolute w-full h-full z-0">
            <Map />
          </div>
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
