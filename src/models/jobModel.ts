import mongoose, { Document, Model, Schema } from "mongoose";

interface IContactPerson {
  name: string;
  email?: string;
  phone?: string;
}

interface IJob extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  companyName: string;
  jobDescription?: string;
  jobTitle: string;
  applied: boolean;
  interview: boolean;
  interviewDate?: Date;
  contactPerson?: IContactPerson;
  salary?: number;
  dateApplied?: Date;
  interest: number;
  offer: boolean;
  jobLocation?: string;
  createdAt: Date;
  notes?: string[];
}

const jobSchema: Schema<IJob> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  jobDescription: { type: String, required: false },
  jobTitle: { type: String, required: true },
  applied: { type: Boolean, default: false },
  interview: { type: Boolean, default: false },
  interviewDate: { type: Date, required: false },
  contactPerson: {
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
  },
  salary: { type: Number, required: false },
  dateApplied: { type: Date, required: false },
  interest: { type: Number, required: true },
  offer: { type: Boolean, default: false },
  jobLocation: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  notes: { type: [String], required: false },
});

const Job: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);

export default Job;
