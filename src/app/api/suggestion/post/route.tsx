import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

type listIndexType = {
  id: string;
  password: string;
  header: string;
  text: string;
  answer: string;
};

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    // JWT 인증 설정
    const authorize = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      "",
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    // Google Sheets API 가져오기
    const googleSheet = google.sheets({ version: "v4", auth: authorize });

    // 새로운 데이터를 추가할 스프레드시트와 시트 지정
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "A:F"; // 데이터를 추가할 범위 설정

    // 추가할 데이터 준비
    const newData = [
      [
        (data as listIndexType).id,
        (data as listIndexType).password,
        (data as listIndexType).header,
        (data as listIndexType).text,
        (data as listIndexType).answer,
        "0", // 여기에 비어 있는 'secret' 열을 추가합니다.
      ],
    ];

    // 데이터 추가 요청
    await googleSheet.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: newData,
      },
    });

    return NextResponse.json(
      { message: "Data added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("오류 발생:", err);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
