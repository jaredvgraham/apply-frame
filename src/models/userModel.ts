import mongoose, { Document, Model, Schema } from "mongoose";

// Define the IUser interface extending Document for TypeScript type-checking
interface IUser extends Document {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
}

// Create the user schema with Mongoose, ensuring it matches the IUser interface
const userSchema: Schema<IUser> = new Schema({
  id: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
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
