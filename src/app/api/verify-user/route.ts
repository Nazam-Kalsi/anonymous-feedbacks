import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import ApiRes from "@/lib/apiRes";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { userName, otp } = await req.json();
    const user = await User.findOne({ userName });
    if (!user) return ApiRes(400, "User not found.");

    if ((user.verificationTokenExpiry as Date) < new Date()) {
        return ApiRes(400,"Expired verification code");
    }
    if (user.verificationToken !== otp) {
        return ApiRes(400,"Incorrect verification code");
    }
    user.isVerified=true;
    user.verificationToken=null;
    user.verificationTokenExpiry=null;
    await user.save();

    return ApiRes(200,"Account verified successfully");
    
  } catch (error) {
    console.error(error);
    return ApiRes(500,"Internal server error");
  }
}
