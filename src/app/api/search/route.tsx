// Next.js 서버 응답을 위한 NextResponse import
import { NextResponse } from "next/server";
// 프로그램 목록이 담긴 programs 배열 import
import { programs } from "@/constants/programs";
// 각 프로그램의 맛집 리스트 데이터 import
import gonghyeokjun from "@/../public/list/gonghyeokjun.json";
import seongsikyeong from "@/../public/list/seongsikyeong.json";

// 문자열에서 모든 공백을 제거하는 유틸리티 함수
const removeSpaces = (v: string): string => {
  return v.replace(/\s+/g, "");
};

// POST 요청을 처리하는 핸들러 함수
export async function POST(request: Request) {
  // 요청 body에서 검색어(search)와 검색 타입(type)을 추출
  const { search, type } = await request.json();

  // 프로그램 이름으로 검색하는 경우
  if (type === "프로그램 이름") {
    // programs 배열에서 검색어와 일치하는 프로그램을 찾음 (공백 무시)
    const foundProgram = programs.find((v) => {
      return removeSpaces(v.programKor) === removeSpaces(search);
    });

    // 프로그램을 찾은 경우 200 상태코드와 함께 결과 반환
    if (foundProgram) {
      return NextResponse.json({ program: [{ name: foundProgram }] }, { status: 200 });
    } else {
      // 프로그램을 찾지 못한 경우 404 상태코드 반환
      return NextResponse.json({ program: null }, { status: 404 });
    }
  } else if (type === "지역명") {
    // gonghyeokjun과 seongsikyeong의 list를 합칩니다.
    const allLists = [...gonghyeokjun.list, ...seongsikyeong.list];

    // 주소에 검색어가 포함된 모든 맛집을 필터링
    const programs = allLists.filter((item) => {
      return item.address.includes(search);
    });
    // 검색 결과와 함께 200 상태코드 반환
    return NextResponse.json({ program: programs }, { status: 200 });
  } else {
    // 잘못된 검색 타입인 경우 400 상태코드 반환
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
}
