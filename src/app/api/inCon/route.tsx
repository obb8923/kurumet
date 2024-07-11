import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type listType = {
  name: string;
  food: string;
  stars: number;
  address: string;
  latlng: { lat: number; lng: number };
  youtube: string;
  youtubeEmbed: string;
};

export async function POST(request: Request) {
  const { list } = await request.json();
  let listArray: listType[] = [];
  // 현재 작업 디렉토리
  const basePath = process.cwd();
  // public/list 폴더 경로
  const dirPath = path.join(basePath, "public", "list");
  console.log("basePath", basePath, "dirPath: ", dirPath);

  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      if (path.extname(file) === ".json") {
        const filePath = path.join(dirPath, file);
        const data = await fs.readFile(filePath, "utf-8");
        try {
          const jsonData = JSON.parse(data);
          list.forEach((v: string) => {
            console.log(1, jsonData.program, v);
            if (jsonData.program === v) {
              console.log(2, jsonData.program, v);
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
  return NextResponse.json(
    { message: "good", listArray: listArray },
    { status: 200 }
  );
}
