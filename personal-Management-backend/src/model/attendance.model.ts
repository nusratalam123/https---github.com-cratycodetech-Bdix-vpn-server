// models/attendance.model.ts
import { Schema, model, models, Model } from "mongoose";
import { Attendance } from "../types/attendance.type"; // Assuming you have defined types for Attendance
import { ObjectId } from "mongodb";


const attendanceSchema = new Schema<Attendance>(
  {
    employeeId: {
      type: ObjectId,
      req: "employee",
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "OnLeave", "LateArrival"], 
      default: "Absent",
    },
    officeHour: {
      type: String,
      default: "09:00",
    },
    arrivalTime: {
      type: String,
      required: false,
    },
    totalPresent: {
      type: Number,
      default: 0,
    },
    totalLateArrival: {
      type: Number,
      default: 0,
    },
    totalAttendence: {
      type: Number,
      default: 0, 
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Attendance: Model<Attendance> =
  models?.Attendance || model("Attendance", attendanceSchema);



export default Attendance;
