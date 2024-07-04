"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { Map, ZoomControl, MapMarker } from "react-kakao-maps-sdk";
import list from "@/../public/hj.json";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

export default function KaKaoMap() {
  const positions = list.list;
  const [infoWindowState, setInfoWindowState] = useState(
    positions.map(() => ({ isOpen: false }))
  );
  const handleMarkerClick = (index: number) => {
    setInfoWindowState((prev) =>
      prev.map((state, i) => ({
        ...state,
        isOpen: i === index ? !state.isOpen : false,
      }))
    );
  };
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 37.574187, lng: 126.976882 }} //위도(latitude), 경도(longitude)
        style={{ width: "100%", height: "100%" }}
        level={10}
      >
        <ZoomControl position={"RIGHT"} />
        {positions.map((position, index) => (
          <MapMarker
            key={`${position.name} - ${position.latlng}`}
            position={position.latlng}
            title={position.name}
            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            onClick={() => handleMarkerClick(index)}
          >
            {infoWindowState[index].isOpen && (
              <div className="p-3 h-auto">
                <p>이름: {position.name}</p>
                <p>음식: {position.food}</p>
                <iframe
                  width="auto"
                  height="auto"
                  src={position.youtubeEmbed}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </>
  );
}
