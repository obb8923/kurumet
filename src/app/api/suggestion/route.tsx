import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const index = url.searchParams.get("index");
  try {
    // JWT 인증 설정
    const authorize = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      "",
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    // Google Sheets API 가져오기
    const googleSheet = google.sheets({ version: "v4", auth: authorize });
    // Google Sheets에서 데이터 읽기
    const response = await googleSheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A:F",
    });

    const rows = response.data.values;
    rows?.shift(); // 헤더 행 제거

    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    // 스프레드시트의 데이터를 JSON 형식으로 변환
    const jsonData = rows.map((row) => ({
      id: row[0],
      password: row[1],
      header: row[2],
      text: row[3],
      answer: row[4],
      secret: row[5],
    }));

    // 요청에 index가 있을 경우 해당 항목만 반환, 없으면 전체 리스트 반환
    if (index !== null) {
      const indexNumber = parseInt(index, 10);
      if (indexNumber >= 0 && indexNumber < jsonData.length) {
        return NextResponse.json([jsonData[indexNumber]], { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Index out of range" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(jsonData, { status: 200 });
    }
  } catch (err) {
    // 에러 발생 시 500 상태 반환
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
