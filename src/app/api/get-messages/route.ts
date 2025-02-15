import { NextRequest } from "next/server";
import { handler } from "@/lib/handler";
import ApiRes from "@/lib/apiRes";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User as NextAuthUser } from "next-auth";
import mongoose from "mongoose";
import User from "@/models/user.model";

async function getAllMessages(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
  const session = await getServerSession(authOptions);
  const sessionUser: NextAuthUser = session?.user as NextAuthUser;

  if (!session || !sessionUser) return ApiRes(401, "user not found");
  //id is in string

  const userId = new mongoose.Types.ObjectId(sessionUser._id); //for aggrigation we need mongoose object id

  const user = await User.aggregate([
    { 
        $match: { _id: new mongoose.Types.ObjectId(userId) } // Ensure _id is an ObjectId
      },
      {
        $lookup: {
          from: "messages",
          let: { userMessages: "$messages" }, // Pass user's messages array
          pipeline: [
            {
              $match: { $expr: { $in: ["$_id", "$$userMessages"] } } // Match messages from user's list
            },
            {
              $project: {
                message: 1,
                _id: 1,
                createdAt:1,
              }
            }
          ],
          as: "messages"
        }
      },
    {$unwind:'$messages'},
    {$sort:{'message.createdAt':-1}},
    {$group:{_id:'$_id', messages: { 
        $push: {
          messageId: "$messages._id",
          message: "$messages.message",
          createdAt: "$messages.createdAt"
        }
      }}},
    {$skip:(page-1)*limit},
    {$limit:limit},
  ]);

  // console.log("user from get messages :", user);

  if (!user) return ApiRes(400, "User not found");
  return ApiRes(200, "Messages retrieved successfully",user[0]?.messages); //TODO :read another method to return
}

export const GET = handler(getAllMessages);
