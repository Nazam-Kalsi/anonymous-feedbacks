import ApiRes from "@/lib/apiRes";
import dbConnect from "@/lib/db";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession, User as NextAuthUser } from "next-auth";
import Message from "@/models/message.model";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
    dbConnect();
    try {
        // const session = await getServerSession(authOptions);
        // const sender: NextAuthUser = session?.user as NextAuthUser;
        // if (!sender || !session) return ApiRes(404, "not Authenticated");
        

        const { userName, messageContent } = await req.json();

        const reciever: NextAuthUser = await User.findOne({ userName }) as NextAuthUser;
        if (!reciever) return ApiRes(404, "user not found");

        if (!reciever.isAcceptingMessages) return ApiRes(400, "reciever isn't recieving messages at this movement,");

        const message = await Message.create({
            // sender: sender._id,
            reciever: reciever._id,
            message: messageContent,
        });

        if (!message) return ApiRes(400, "message not sent, try again later");

        await User.findByIdAndUpdate(reciever._id,{$push:{messages:message._id}});
    
        return ApiRes(200, "message sent succesfully");
    } catch (error) {
        console.log(error);
        return ApiRes(500, "Internal server error");
    }
}