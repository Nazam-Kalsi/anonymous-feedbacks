import ApiRes from "@/lib/apiRes";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        dbConnect();
        const session = await getServerSession();
        console.log("session : ",session);




        return ApiRes(200,"Yeat",session);
    } catch (error) {
        console.log(error);
        return ApiRes(500, "Internal server error");
    }
}