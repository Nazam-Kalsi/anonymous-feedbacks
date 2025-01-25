import mongoose, { model, Schema, Document } from "mongoose";

export interface MessageInterface extends Document {
  message: string;
  reciever: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
}

const MessageSchema: Schema<MessageInterface> = new Schema(
  {
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Message = (mongoose.models.Message as mongoose.Model<MessageInterface>) ||
                        model<MessageInterface>("Message", MessageSchema);

export default Message;
