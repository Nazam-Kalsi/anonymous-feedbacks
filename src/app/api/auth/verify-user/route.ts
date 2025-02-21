import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import ApiRes from "@/lib/apiRes";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { id, verificationCode } = await req.json();
    // const user = await User.findOne({ userName });
    const user = await User.findById(id);
    if (!user) return ApiRes(400, "User not found.");
    
    if ((user.verificationTokenExpiry as Date) < new Date()) {
        return ApiRes(400,"Expired verification code");
    }
    if (user.verificationToken !== verificationCode) {
        return ApiRes(400,"Incorrect verification code");
    }
    console.log(user);


    
    // user.verificationToken=null;
    // user.verificationTokenExpiry=null;
    // user.isVerified=true;
    await user.save();

    if(user.updatePassword){
      return ApiRes(200,"Account verification successfully for password change.",{setNewPassword:true})
    }

    return ApiRes(200,"Account verified successfully");
    
  } catch (error) {
    console.error(error);
    return ApiRes(500,"Internal server error");
  }
}
