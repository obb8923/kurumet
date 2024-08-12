import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type listIndexType = {
  id: string;
  password: string;
  header: string;
  text: string;
  answer: string;
};

export async function POST(request: Request) {
  const { data } = await request.json();
  const dirPath = path.join(process.cwd(), "public", "suggestion");
  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      if (path.extname(file) === ".json") {
        const filePath = path.join(dirPath, file);
        try {
          const fileData = await fs.readFile(filePath, "utf-8");
          const jsonData = JSON.parse(fileData);

          if (Array.isArray(jsonData.list)) {
            // 새로운 데이터를 리스트의 앞에 추가합니다.
            jsonData.list.unshift(data as listIndexType);

            // 수정된 데이터를 다시 파일에 씁니다.
            await fs.writeFile(
              filePath,
              JSON.stringify(jsonData, null, 2),
              "utf-8"
            );
          }
        } catch (err) {
          console.error(`파일 처리 중 오류가 발생했습니다 (${file}):`, err);
        }
      }
    }
  } catch (err) {
    console.error("디렉토리 읽기 중 오류가 발생했습니다:", err);
  }
  return NextResponse.json({ message: "good" }, { status: 200 });
}
