import { handler } from "@/lib/handler";
import { NextRequest } from "next/server";
import ApiRes from "@/lib/apiRes";
import Message from "@/models/message.model";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


// session :  {
//     user: {
//       name: undefined,
//       email: 'test@gmail.com',
//       image: undefined,
//       _id: '679f01286bbc006457443354',
//       isVerified: true,
//       userName: 'nzm',
//       isAcceptingMessages: true
//     }
//   }
async function deleteMessage(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) return ApiRes(400, "Not Authenticated");
    // console.log(req.nextUrl.searchParams)
    const msgId =  req.nextUrl.searchParams.get('msgId');
    console.log("message ID : ",msgId);
    const user = User.findByIdAndUpdate(session.user._id, {
        $pull: { messages: msgId }
    })
    const message = await Message.findByIdAndDelete(msgId);
    if (!message || !user) return ApiRes(403, "Unable to delete messageTry again later.")

    return ApiRes(200, "Message deleted successfully.")
}

export const DELETE = handler(deleteMessage);