import mongoose, { Document, Model, Schema } from "mongoose";

interface ISession extends Document {
  userId: number;
  refreshToken: string;
  createdAt: Date;
}

const sessionSchema: Schema<ISession> = new Schema({
  userId: { type: Number, required: true, ref: "User" },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Session: Model<ISession> =
  mongoose.models.Session || mongoose.model<ISession>("Session", sessionSchema);

export default Session;

export const addSession = async (
  userId: number,
  refreshToken: string
): Promise<void> => {
  const session = new Session({ userId, refreshToken });
  await session.save();
};

export const findSessionByToken = async (
  refreshToken: string
): Promise<ISession | null> => {
  return Session.findOne({ refreshToken });
};

export const deleteSessionByToken = async (
  refreshToken: string
): Promise<void> => {
  await Session.deleteOne({ refreshToken });
};
