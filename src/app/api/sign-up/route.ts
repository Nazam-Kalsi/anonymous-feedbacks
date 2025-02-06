import { NextResponse, NextRequest } from "next/server";
import { sendVerificatioEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import ApiRes from "@/lib/apiRes";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { userName, email, password } = await req.json();

    const verifiedExistingUser = await User.findOne({
      userName,
      isVerified: true,
    });
    if (verifiedExistingUser) {
      return NextResponse.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    const existingUserViaEmail = await User.findOne({
      email,
    });    
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    
    if (existingUserViaEmail) {
      if(existingUserViaEmail.isVerified) return ApiRes(400,"user with this email already exists");
      else{
        const hashedPassword = await bcrypt.hash(password,10);
        existingUserViaEmail.password=hashedPassword;
        existingUserViaEmail.verificationToken=verificationCode;
        existingUserViaEmail.verificationTokenExpiry=new Date(Date.now()+60*60*1000);
        await existingUserViaEmail.save();
        }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
        isVerified: false,
        isAcceptingMessages: true,
        verificationTokenExpiry: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        verificationToken: verificationCode,
      });

      if(!newUser)ApiRes(400,"error while creating user.");   
    }

    //mail
    //   const emailResponse = await sendVerificatioEmail({
    //     email,
    //     userName,
    //     verificationCode,
    //   });
    //   if (!emailResponse.success) {
    //     return ApiRes(400,"error while sending mail for verification",emailResponse.message);        
    // }
    return ApiRes(200,"User registered successfully and mail sent for verification.");
    
  } catch (error) {
    console.log(`Error while sending verification mail ${error}`);
    return  ApiRes(500,"error while sending mail for verification")
  }
}
