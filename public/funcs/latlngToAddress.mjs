import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

async function isCoordinateInAddress(lat, lng, address) {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_RESTAPI_KEY;

  if (!KAKAO_API_KEY) {
    console.log(KAKAO_API_KEY);
    console.error("Kakao API 키가 설정되지 않았습니다.");
    return false;
  }

  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`;

  console.log("API 요청 URL:", url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error(`HTTP 에러! 상태 코드: ${response.status}`);
      return false;
    }

    const data = await response.json();

    console.log("API 응답 데이터:", data);

    if (data.documents && data.documents.length > 0) {
      // 행정구역 정보를 가져옴
      const region = data.documents[0];
      const regionAddress =
        region.region_1depth_name +
        " " +
        (region.region_2depth_name || "") +
        " " +
        (region.region_3depth_name || "");

      console.log("행정구역 주소:", regionAddress);

      // 해당 주소가 주어진 주소에 포함되는지 확인
      return regionAddress.includes(address);
    } else {
      console.error("Coordinates에 대한 지역 정보를 찾을 수 없습니다.", lat, lng);
      return false;
    }
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다:", error);
    return false;
  }
}

// 사용 예시
const lat = 37.53584;
const lng = 126.8953699;
const address = "영등포";

isCoordinateInAddress(lat, lng, address).then((isInAddress) => {
  if (isInAddress) {
    console.log(`위도 ${lat}, 경도 ${lng}는 ${address}에 포함됩니다.`);
  } else {
    console.log(`위도 ${lat}, 경도 ${lng}는 ${address}에 포함되지 않습니다.`);
  }
});
