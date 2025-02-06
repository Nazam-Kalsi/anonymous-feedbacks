import ApiRes from "@/lib/apiRes";
import dbConnect from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    dbConnect();
    try {
        
        return ApiRes(200,"Yeat");
    } catch (error) {
        console.log(error);
        return ApiRes(500, "Internal server error");
    }
}