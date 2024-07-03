import Image from "next/image";
import Map from "../components/KakaoMap";

export default function Home() {
  return (
    // <main className="absolute w-full h-full left-0 top-0">
    <main className="flex justify-center">
      {/* <div className="w-96 h-96 bg-black"></div>
      <div className="w-96 h-96 bg-white"></div> */}
      <div className="w-96 h-96 m-10" style={{ width: "90vw", height: "90vh" }}>
        <Map />
      </div>
    </main>
  );
}
