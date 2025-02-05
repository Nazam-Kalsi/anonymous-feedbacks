import ApiRes from "@/lib/apiRes";
import { handler } from "@/lib/handler";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { User as NextAuthUser } from "next-auth";

async function sendMessage(req:NextRequest){
    const session=await getServerSession(authOptions);
    const sessionUser:NextAuthUser = session?.user as NextAuthUser;

    if(!session || !sessionUser) return ApiRes(401,'Not Authenticated!');

    const {message,recieverId} = await req.json();
    


    return ApiRes(200,"hello");
}

export const POST = handler(sendMessage);
