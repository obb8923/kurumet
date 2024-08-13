import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { listIndexType } from "@/app/type/listIndexType";

type listType = {
  list: listIndexType[];
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const index = url.searchParams.get("index");
  const dirPath = path.join(process.cwd(), "public", "suggestion");

  try {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      if (path.extname(file) === ".json") {
        const filePath = path.join(dirPath, file);
        const data = await fs.readFile(filePath, "utf-8");
        try {
          const jsonData = JSON.parse(data);
          //get요청에 index가 있을때, suggestion.json 의 리스트[index]를 보낸다
          //get요청에 index가 없을때, suggestion.json 의 리스트를 보낸다
          if (index)
            return NextResponse.json(jsonData.list[index], { status: 200 });
          else return NextResponse.json(jsonData.list, { status: 200 });
        } catch (err) {
          console.error("JSON 파싱 에러:", err);
          return NextResponse.json({ status: 500 });
        }
      }
    }
  } catch (err) {
    console.error("오류 발생:", err);
    return NextResponse.json({ status: 500 });
  }
}
