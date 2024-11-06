import { Model, model, models, Schema } from "mongoose";
import { Announcement } from "../types/announcement.type";
import { ObjectId } from "mongodb";

const announcementSchema = new Schema<Announcement>(
  {
    employeeId: {
      type: ObjectId,
    },
    departmentName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Announcement: Model<Announcement> =
  models?.Announcement || model("Announcement", announcementSchema);
export default Announcement;
