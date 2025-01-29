import mongoose, { Schema, model, Document } from "mongoose";
import { AutoIncrementID } from "@typegoose/auto-increment";
import { MessageInterface } from "./message.model";

export interface UserInterface extends Document {
  userName: string;
  password: string;
  email: string;
  isVerified: boolean;
  verificationToken: string | null;
  verificationTokenExpiry: Date | null;
  messages: MessageInterface[];
}

const UserSchema: Schema<UserInterface> = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "email.required"],
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      required: false,
    },
    verificationTokenExpiry: {
      type: Date,
      default: null,
      required: false,
    },
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }]
  },
  { timestamps: true }
);

// UserSchema.plugin(AutoIncrementID, {});
const User = (mongoose.models.User as mongoose.Model<UserInterface>) ||
  model<UserInterface>("User", UserSchema);

export default User;
