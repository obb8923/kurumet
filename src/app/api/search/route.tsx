import { NextResponse } from "next/server";
import programs from "@/../public/list/programs.json";
import gonghyeokjun from "@/../public/list/gonghyeokjun.json";
import seongsikyeong from "@/../public/list/seongsikyeong.json";

const removeSpaces = (v: string): string => {
  return v.replace(/\s+/g, "");
};

export async function POST(request: Request) {
  const { search, type } = await request.json();

  if (type === "프로그램 이름") {
    const foundProgram = programs.programs.find((v) => {
      return removeSpaces(v) === removeSpaces(search);
    });

    if (foundProgram) {
      return NextResponse.json({ program: [{ name: foundProgram }] }, { status: 200 });
    } else {
      return NextResponse.json({ program: null }, { status: 404 });
    }
  } else if (type === "지역명") {
    // gonghyeokjun과 seongsikyeong의 list를 합칩니다.
    const allLists = [...gonghyeokjun.list, ...seongsikyeong.list];

    const programs = allLists.filter((item) => {
      return item.address.includes(search);
    });
    return NextResponse.json({ program: programs }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
}
