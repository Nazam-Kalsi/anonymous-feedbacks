import { AccountVerificationEmailTemplate } from '../../emails/ResendVerificationEmailTemplate';
import { Resend } from 'resend';
import {ApiResponse} from '../types/apiResponse';
const resend = new Resend(process.env.RESEND_API_KEY);
interface Props{
    email:string;
    userName:string;
    verificationToken:number | string;
}
export const sendVerificatioEmail=async({email,userName,verificationToken}:Props):Promise<ApiResponse>=>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Account verification',
            react: AccountVerificationEmailTemplate({ otp: verificationToken, recipientName: userName }),
          });
        return {
            success:true,
            message:`Verification email sent successfully,${data}`
        }
    } catch (error) {
        console.log('Error while sending verification email',error);
        return {
            success:false,
            message:'error while sending verification email'
        }

    }
}
