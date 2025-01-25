import mongoose, { Schema, model, Document } from "mongoose";
import { AutoIncrementID } from "@typegoose/auto-increment";

export interface UserInterface extends Document {
  userName: string;
  password: string;
  email: string;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiry: Date;
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
    },
    verificationTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(AutoIncrementID, {});
const User = (mongoose.models.User as mongoose.Model<UserInterface>) ||
  model<UserInterface>("User", UserSchema);

export default User;
