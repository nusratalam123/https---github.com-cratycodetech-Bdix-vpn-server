import { Model, model, models, Schema } from "mongoose";
import { Leave } from "../types/leave.type";
import { ObjectId } from "mongodb";

const leaveSchema = new Schema<Leave>(
  {
    employeeId: {
      type: ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["Absent", "Present"],
      default: "Present",
    },
    leaveStatus: {
      type: String,
      enum: ["Approved", "Denied","Pending"],
      default: "Pending",
    },
    leaveType: {
      type: String,
      enum: ["Non-Leave", "Paid-Leave","Sick-Leave"],
      default: "Non-Leave",
    },
  },
  {
    timestamps: true,
  },
);
  

const Leave: Model<Leave> = models?.Leave || model("Leave", leaveSchema);
export default Leave;
