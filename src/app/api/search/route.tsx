import { NextResponse } from "next/server";
import programs from "@/../public/list/programs.json";

const removeSpaces = (v: string): string => {
  return v.replace(/\s+/g, "");
};

export async function POST(request: Request) {
  const { search } = await request.json();

  const foundProgram = programs.programs.find((v) => {
    return removeSpaces(v) === removeSpaces(search);
  });

  if (foundProgram) {
    return NextResponse.json({ program: foundProgram }, { status: 200 });
  } else {
    return NextResponse.json({ program: null }, { status: 404 });
  }
}
