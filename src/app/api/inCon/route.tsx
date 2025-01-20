import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// 유튜브 영상과 관련된 정보를 담는 타입
type listType = {
  name: string; // 가게 이름
  food: string; // 음식 종류
  address: string; // 주소
  latlng: { lat: number; lng: number }; // 위도, 경도 좌표
  youtubeEmbed: string; // 임베드용 유튜브 링크
};

export async function POST(request: Request) {
  const { list } = await request.json();
  let listArray: listType[] = [];
  // 현재 작업 디렉토리 경로
  const basePath = process.cwd();
  // public/list 폴더의 절대 경로
  const dirPath = path.join(basePath, "public", "list");
  // console.log("basePath", basePath, "dirPath: ", dirPath);

  try {
    // list 디렉토리의 모든 파일 읽기
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      // JSON 파일만 처리
      if (path.extname(file) === ".json") {
        const filePath = path.join(dirPath, file);
        const data = await fs.readFile(filePath, "utf-8");
        try {
          // JSON 파일 파싱
          const jsonData = JSON.parse(data);
          // 요청된 프로그램과 일치하는 데이터만 배열에 추가
          list.forEach((v: string) => {
            if (jsonData.program === v) {
              Array.prototype.push.apply(listArray, jsonData.list);
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  // 수집된 데이터 반환
  return NextResponse.json(
    { message: "good", listArray: listArray },
    { status: 200 }
  );
}
