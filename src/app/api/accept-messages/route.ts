import ApiRes from "@/lib/apiRes";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { User as NextAuthUser } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import User from "@/models/user.model";
import { handler } from "@/lib/handler";

async function toggleUserMessageStatus(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user: NextAuthUser = session?.user as NextAuthUser;
  if (!session || !user) return ApiRes(400, "Unauthenticated");

  const { acceptingMessagesStatus } = await req.json();
  console.log(acceptingMessagesStatus);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { isAcceptingMessages: acceptingMessagesStatus },
    { new: true }
  );
  if (!updatedUser) return ApiRes(400, "User not found");
console.log("updatedUser : ",updatedUser);
  return ApiRes(
    200,
    "user accepting messages status changed successfully",
    {acceptingMessagesStatus:updatedUser.isAcceptingMessages}
  );
}
export const POST = handler(toggleUserMessageStatus);

async function getUserMessageStatus(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user: NextAuthUser = session?.user as NextAuthUser;
  if (!session || !user) return ApiRes(400, "Unauthorized");

  const userFromDb = await User.findById(user._id);
  if (!userFromDb) return ApiRes(404, "User not found!");
  // console.log('user DB :', userFromDb);

  return ApiRes(200, "User message acceptance status fetched successfully.", {
    isAcceptingMessages: userFromDb.isAcceptingMessages,
  });
}

export const GET = handler(getUserMessageStatus);
