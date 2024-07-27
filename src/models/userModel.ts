import mongoose, { Document, Model, Schema } from "mongoose";

// Define the IUser interface extending Document for TypeScript type-checking
interface IUser extends Document {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  resume?: string;
}

// Create the user schema with Mongoose, ensuring it matches the IUser interface
const userSchema: Schema<IUser> = new Schema({
  id: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  resume: { type: String, required: false },
});

// Define the User model using the schema and IUser interface
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const addUser = async (user: IUser): Promise<void> => {
  await user.save();
};

export const findUserById = async (id: number): Promise<IUser | null> => {
  return User.findOne({ id });
};
