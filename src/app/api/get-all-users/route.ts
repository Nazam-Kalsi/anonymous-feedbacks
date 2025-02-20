import ApiRes from "@/lib/apiRes";
import { handler } from "@/lib/handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import User from "@/models/user.model";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

async function getAllUsers(req: NextRequest, { params }: { params: { page?: number; limit?: number } }) {
    console.log(req.nextUrl.searchParams);
    console.log(params);
    const page = Number(req.nextUrl.searchParams.get('page')) || 1;
    const limit = Number(req.nextUrl.searchParams.get('limit')) || 10;
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) return ApiRes(403, "You are not authenticated.")
console.log(session.user);
    const users = await User.aggregate([
        { $match: {
            _id: { $ne: new mongoose.Types.ObjectId(session.user._id) }
        }},
        { $skip: Number((page - 1) * limit) },
        { $limit: Number(limit) },
        {
            $project:{
                userName:1,
                _id:1
            }
        }
    ])
    if (!users) return ApiRes(400, "No users Found");

    return ApiRes(200, 'Users fetched successfully', users);
    return ApiRes(200, 'Users fetched successfully');
}

export const GET = handler(getAllUsers);