import path from "path";
import fs from "fs/promises";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function isCoordinateInAddress(lat, lng) {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_RESTAPI_KEY;

  if (!KAKAO_API_KEY) {
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
      return regionAddress;
    } else {
      console.error("Coordinates에 대한 지역 정보를 찾을 수 없습니다.", lat, lng);
      return false;
    }
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다:", error);
    return false;
  }
}

async function addAddressesToFiles() {
  // 현재 작업 디렉토리
  const basePath = process.cwd();
  // public/list 폴더 경로
  const dirPath = path.join(basePath, "public", "list");

  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      if (path.extname(file) === ".json") {
        const filePath = path.join(dirPath, file);
        const data = await fs.readFile(filePath, "utf-8");

        try {
          const jsonData = JSON.parse(data);

          // list의 각 항목에 대해 주소를 업데이트
          for (const item of jsonData.list) {
            const lat = item.latlng?.lat;
            const lng = item.latlng?.lng;

            if (lat && lng) {
              // '서울시'로 주소를 확인. 이 부분은 원하는 주소로 변경 가능.
              const isInAddress = await isCoordinateInAddress(lat, lng);
              item.address = isInAddress;
            } else {
              item.address = "위도 또는 경도 정보 부족";
            }
          }

          // 수정된 데이터를 파일에 다시 저장
          await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
          console.log(`Modified ${file}`);
        } catch (err) {
          console.error(`Failed to parse JSON in ${file}:`, err);
        }
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

addAddressesToFiles();
