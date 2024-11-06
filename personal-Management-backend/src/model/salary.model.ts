
import { Model, model, models, Schema } from "mongoose";
import { Salary } from "../types/salary.type";
import { ObjectId } from "mongodb";

const salarySchema = new Schema<Salary>(
  {
    employeeId: {
      type: ObjectId,
      required: true,
    },
    salaryStatus: {
      type: String,
      enum: ["Distribution", "Pending"],
      default: "Distribution",
    },
    baseSalary: {
      type: Number,
      required: true,
    },
    salaryDeduction: {
      type: Number,
    },
    bonus: {
      type: Number,
    },
    totalSalary: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

salarySchema.pre("save", function (next) {
  const doc = this as unknown as Salary; // Type assertion for TypeScript

  doc.totalSalary =
    doc.baseSalary + (doc.bonus || 0) - (doc.salaryDeduction || 0);
  next();
});


const Salary: Model<Salary> =
  models?.Salary || model("Salary", salarySchema);
export default Salary;
