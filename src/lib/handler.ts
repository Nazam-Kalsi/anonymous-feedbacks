// utils/withErrorHandling.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "./db";
import ApiRes from "./apiRes";

export function handler(h: (req: NextRequest,params?:any) => Promise<NextResponse>) {
  return async function (req: NextRequest,params?:any) {
    try {
      await dbConnect();
      return await h(req,params);
    } catch (error) {
      console.error("API Error:", error);
      return ApiRes(500, "Server side error");
    }
  };
}

