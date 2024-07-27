import mongoose, { Document, Model, Schema } from "mongoose";

interface IStatistics extends Document {
  userId: mongoose.Types.ObjectId;
  totalApplications: number;
  interviewsScheduled: number;
  offersReceived: number;
}

const statisticsSchema: Schema<IStatistics> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalApplications: { type: Number, default: 0 },
  interviewsScheduled: { type: Number, default: 0 },
  offersReceived: { type: Number, default: 0 },
});

const Statistics: Model<IStatistics> = mongoose.model(
  "Statistics",
  statisticsSchema
);

export default Statistics;
