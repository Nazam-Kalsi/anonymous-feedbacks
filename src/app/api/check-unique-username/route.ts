import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import dbConnect from "@/lib/db";
import ApiRes from "@/lib/apiRes";
import { userNameValidation } from "@/schema/signIn.schema";
import { z } from "zod";

const userNameVerificationSchema = z.object({
  userName: userNameValidation,
});

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const queryParameter = {
      userName: searchParams.get("userName"),
    };
    // { params }: { params: { un: string } } in params
    // const { un }= params;//when api/user/[un]
    const res = userNameVerificationSchema.safeParse(queryParameter);
    console.log("result : ", res);
    // console.log("searchParams : ",queryParameter);

    if (!res.success) {
      const errors = res.error.format().userName?._errors;
      return ApiRes(400, `Invalid userName,${errors}`);
    }

    const {userName}=res.data;

    const existingVerifiedUser = await User.findOne({
        userName,isVerified:true
    })

    if(existingVerifiedUser) return ApiRes(400,'user with this username already exist.');
    return ApiRes(200, "Username avaliable");

  } catch (error) {
    console.log("unique username error", error);
    return ApiRes(500, "internal server error");
  }
}
