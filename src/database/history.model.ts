import { ECourseLevel, ECourseStatus } from "@/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface IHistory extends Document {
  _id: string;
  created_at: Date;
  course: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}
const historySchema = new Schema<IHistory>({
  created_at: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const History = models.History || model<IHistory>("History", historySchema);
export default History;