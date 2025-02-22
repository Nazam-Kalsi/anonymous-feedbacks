import { handler } from "@/lib/handler";
import ApiRes from "@/lib/apiRes";
import { NextRequest } from "next/server";

async function changePassword(req:NextRequest){
    const {password} = await req.json();
    console.log(password);
    return ApiRes(200,"yeat");
}

export const PATCH = handler(changePassword);