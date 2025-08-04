import { model, Schema } from "mongoose";

interface ISubmission extends Document {
  name?: string;
  audio: string;
  rate: number;
  comments?: string;
}

const SubmissionSchema = new Schema<ISubmission>({
  name: { type: String },
  audio: { type: String, required: true },
  rate: { type: Number, required: true },
  comments: { type: String },
});

export const Submission = model<ISubmission>("Submission", SubmissionSchema);
