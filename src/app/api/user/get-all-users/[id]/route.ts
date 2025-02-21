import ApiRes from "@/lib/apiRes";
import mongoose from "mongoose";
import { handler } from "@/lib/handler";
import { NextRequest } from "next/server";
import User from "@/models/user.model";

async function getUser(req:NextRequest,{params}:{params:{id:string}}){
const id=params.id;
if(!mongoose.isValidObjectId(id)) return ApiRes(400,'Invalid id');

const user=User.findById(id);
if(!user) return ApiRes(404,'User not found');
return ApiRes(200,'user found successfully',user);
}

export const GET = handler(getUser);
