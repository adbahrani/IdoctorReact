import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser {
  username?: string;
  email: string;
  token: string;
  password: string;
  loginAt: Date;
  isDeactivated: boolean;
  patients: mongoose.Types.ObjectId[] | Document[];
}

export const userSchema = new Schema<IUser>({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isDeactivated: {
    type: Boolean,
    default: false
  },
  loginAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  patients: [{ type: mongoose.Types.ObjectId, required: true, ref: "Patient" }]
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
