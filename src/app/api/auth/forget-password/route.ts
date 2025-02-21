import { NextRequest } from "next/server";
import ApiRes from "@/lib/apiRes";
import { handler } from "@/lib/handler";
import User from "@/models/user.model";
import { sendVerificatioEmail } from "@/helpers/sendVerificationEmail";

const forgetPassword = async (req: NextRequest) => {
    const {email}  = await req.json();
    console.log(email)
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const verificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
    const user = await User.findOne({
        email
    });
    if (!user) return ApiRes(400, 'User not found.');

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;
    user.updatePassword=true;
    await user.save();
    console.log("user from forget password : ",user)

    // const emailResponse = await sendVerificatioEmail({
    //     email,
    //     userName: user.userName,
    //     verificationToken,
    // });
    // if (!emailResponse.success) {
    //     return ApiRes(400, "error while sending mail for verification", emailResponse.message);
    // }
    
    return ApiRes(200, 'A verification mail has been sent to your registered mail.',user._id);
}

export const POST = handler(forgetPassword);