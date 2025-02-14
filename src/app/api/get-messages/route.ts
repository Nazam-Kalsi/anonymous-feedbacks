import { NextRequest } from "next/server";
import { handler } from "@/lib/handler";
import ApiRes from "@/lib/apiRes";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User as NextAuthUser } from "next-auth";
import mongoose from "mongoose";
import User from "@/models/user.model";

async function getAllMessages(req:NextRequest,{params}:{params:{page:number;limit:number}}){
    const { page = 1,limit = 10 } = params;
    const session=await getServerSession(authOptions);
    const sessionUser:NextAuthUser=session?.user as NextAuthUser; 
    const skipDoc = page-1*limit;
    if(!session || !sessionUser) return ApiRes(401,"user not found"); 
    //id is in string

    const userId = new mongoose.Types.ObjectId(sessionUser._id); //for aggrigation we need mongoose object id

    const user = await User.aggregate([
        {$match:{_id:userId}},
        {$unwind:'$messages'},
        {$sort:{'messages.createdAt':-1}},
        {$group:{_id:'$_id','messages':{$push:'$messages'}}},
        {$skip:Number((page-1)*limit)},
        {$limit:Number(limit)}
    ])

    if(!user) return ApiRes(400,'User not found');

    return ApiRes(200,'Messages retrieved successfully',user[0].messages);//TODO :read another method to return
}

export const GET =handler(getAllMessages);