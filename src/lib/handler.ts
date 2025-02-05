// utils/withErrorHandling.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "./db";
import ApiRes from "./apiRes";

export function handler(h: (req: NextRequest) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    await dbConnect();
    try {
      return await h(req);
    } catch (error) {
      console.error("API Error:", error);
      return ApiRes(500, "Server side error");
    }
  };
}

